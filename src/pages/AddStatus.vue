<template>
  <ion-page>
    <custom-layout page-title="Create Post" :cancel-button="true" page-back-link-url="/home">
      <template v-slot:actions-end>
        <ion-button color="primary" @click="savePost" :disabled="postButton">
          Post
        </ion-button>
      </template>
    </custom-layout>
    <ion-content>
      <ion-grid class="ion-margin-top">
        <ion-row>
          <ion-col>
            <ion-item class="ion-no-border">
              <ion-avatar slot="start">
                <ion-img :src="userInfo.photoURL"></ion-img>
              </ion-avatar>
              <ion-label>{{ userInfo.displayName }}</ion-label>
            </ion-item>
            <form>
              <ion-textarea placeholder="What's on your mind?" auto-grow="true" v-model="form.description"
                            max-length="150"
                            clear-on-edit="true" required/>
            </form>
            <ion-img v-if="takenImageUrl !== ''" :src="takenImageUrl"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-row class="ion-justify-content-between ion-text-center">
          <ion-col>
            <ion-button @click="takePicture" fill="clear" color="dark">
              <ion-icon slot="icon-only" :icon="camera"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonAvatar,
  IonLabel,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFooter,
  IonIcon,
  IonToolbar
} from '@ionic/vue'
import CustomLayout from "@/layout/CustomLayout";
import {camera} from 'ionicons/icons';
import {Camera, CameraResultType} from "@capacitor/camera";
import {auth, db, storage} from "@/hooks/firebase-auth";
import moment from 'moment';
import {loadingController} from '@ionic/vue';

export default {
  name: "AddStatus",
  components: {
    CustomLayout,
    IonPage,
    IonContent,
    IonButton,
    IonItem,
    IonAvatar,
    IonLabel,
    IonTextarea,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonFooter,
    IonIcon,
    IonToolbar
  },

  data() {
    return {
      form: {
        description: "",
        photoURL: "",
      },
      takenImageUrl: '',
      base64String: '',
      format: '',
      camera,
      userInfo: []
    };
  },
  methods: {
    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      if (image) {
        this.takenImageUrl = 'data: ' + image.format + ' ;base64,' + image.base64String;
        this.base64String = image.base64String;
        this.format = image.format;
      }
    },
    async savePost() {
      const loading = await loadingController
          .create({
            cssClass: 'my-custom-class',
            message: 'Upload your post',
            spinner: 'lines',
          });

      await loading.present()
      if (this.takenImageUrl !== "") {
        const filePath = `status/${this.uuidv4()}.${this.format}`;
        const storageRef = storage.ref();
        await storageRef
            .child(filePath)
            .putString(this.base64String, "base64");
        this.form.photoURL = await storageRef.child(filePath).getDownloadURL();
      }
      await db.collection("status").add({
        description: this.form.description,
        photoURL: this.form.photoURL,
        uid: auth.currentUser.uid,
        created_at: moment().format(),
      })
      await loading.dismiss()
      await this.$router.push("/home");
    }
  },
  created() {
    db.collection('users').doc(auth.currentUser.uid).onSnapshot((querySnapshot) => {
      this.userInfo = querySnapshot.data()
    })
  },
  computed: {
    postButton() {
      return !(this.form.description !== '' || this.takenImageUrl !== '');
    }
  }

}
</script>

<style scoped>
ion-avatar {
  width: 50px;
  height: 50px;
}

ion-item {
  --inner-border-width: 0px;
  --padding-start: 0px;
}
</style>