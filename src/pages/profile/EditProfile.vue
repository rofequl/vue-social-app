<template>
  <ion-page>
    <custom-layout page-title="Edit Profile" :cancel-button="true" page-back-link-url="/profile">
      <template v-slot:actions-end>
        <ion-button @click="updateProfile">
          <ion-icon slot="icon-only" :icon="checkmarkOutline"></ion-icon>
        </ion-button>
      </template>
    </custom-layout>
    <ion-content>
      <div class="ion-margin-top">
        <ion-avatar class="mx-auto" @click="takePicture">
          <ion-img :src="takenImageUrl"></ion-img>
        </ion-avatar>
        <p @click="takePicture" class="text-center text-primary">Change Profile Photo</p>
      </div>
      <form class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input max-length="50" v-model="form.displayName" type="text" required/>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Website</ion-label>
            <ion-input max-length="50" v-model="form.website" type="url" required/>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Bio</ion-label>
            <ion-textarea auto-grow="true" v-model="form.bio" max-length="150" clear-on-edit="true" required/>
          </ion-item>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/vue'
import CustomLayout from "@/layout/CustomLayout";
import {Camera, CameraResultType} from "@capacitor/camera";
import {auth, storage, db} from "@/hooks/firebase-auth";
import {checkmarkOutline} from 'ionicons/icons';
import {loadingController} from '@ionic/vue';

export default {
  name: "EditProfile",
  components: {
    CustomLayout,
    IonPage,
    IonContent,
    IonAvatar,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon
  },

  data() {
    return {
      form: {
        displayName: "",
        website: "",
        bio: "",
        photoURL: "",
      },
      base64String: '',
      format: '',
      takenImageUrl: '',
      checkmarkOutline,
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
    async updateProfile() {
      const loading = await loadingController
          .create({
            cssClass: 'my-custom-class',
            message: 'Profile info update',
            spinner: 'lines',
          });

      await loading.present()
      if (this.takenImageUrl !== this.form.photoURL) {
        const filePath = `user/${this.uuidv4()}.${this.format}`;
        const storageRef = storage.ref();
        await storageRef
            .child(filePath)
            .putString(this.base64String, "base64");
        this.form.photoURL = await storageRef.child(filePath).getDownloadURL();
      }
      await db.collection("users")
          .doc(auth.currentUser.uid)
          .set({
            website: this.form.website,
            bio: this.form.bio,
            displayName: this.form.displayName,
            photoURL: this.form.photoURL
          });
      await loading.dismiss()
      await this.$router.push("/profile");
    }
  },
  created() {
    db.collection('users').doc(auth.currentUser.uid).onSnapshot((querySnapshot) => {
      this.form.bio = querySnapshot.data().bio
      this.form.website = querySnapshot.data().website
      this.form.displayName = querySnapshot.data().displayName
      this.takenImageUrl = querySnapshot.data().photoURL
      this.form.photoURL = querySnapshot.data().photoURL
    })
  }
}
</script>

<style scoped>

</style>