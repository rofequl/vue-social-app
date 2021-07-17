<template>
  <ion-page>
    <ion-content>
      <ion-img :src="require('@/theme/images/logo.png')" alt="Logo"></ion-img>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="11">
            <form
                @submit.prevent="login_mode? signIn(form.email, form.password) : signUp(form.name, form.email, form.password)">
              <ion-item v-if="!login_mode">
                <ion-label position="floating">Name</ion-label>
                <ion-input v-model="form.name"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Email address</ion-label>
                <ion-input type="email" v-model="form.email" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input v-model="form.password" type="password" required></ion-input>
              </ion-item>
              <ion-button
                  expand="block"
                  color="primary"
                  class="ion-margin-top"
                  type="submit"
              >
                {{ login_mode ? "Sign In" : "Sign Up" }}
              </ion-button>
              <div class="separator">Or</div>
              <ion-button
                  expand="block"
                  color="success"
                  class="ion-margin-top ion-margin-horizontal"
                  @click="login_mode = !login_mode"
              >
                {{ login_mode ? "Sign Up" : "Sign In" }}
              </ion-button>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  alertController
} from "@ionic/vue";
import {auth, db} from "@/hooks/firebase-auth";

export default {
  name: "Authentication",
  components: {IonPage, IonImg, IonContent, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton},
  data() {
    return {
      login_mode: true,
      form: {
        name: "",
        email: "",
        password: "",
      },
      errorMsg: "",
    }
  },
  methods: {
    async signUp(name, email, password) {
      try {
        await auth.createUserWithEmailAndPassword(
            email,
            password
        ).then(function () {
          db.collection("users")
              .doc(auth.currentUser.uid)
              .set({
                website: '',
                bio: '',
                displayName: name,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/chutki-c59a3.appspot.com/o/image%2Favatar.jpg?alt=media&token=6da5fdb6-4773-4fea-9369-1aa41892bed0'
              });
        })
        await this.$router.push("/");
      } catch (error) {
        await this.errorAlert(error)
      }
    },
    async signIn(email, password) {
      try {
        if (!email || !password) {
          const alert = await alertController
              .create({
                header: 'Warning',
                message: 'Email and password required!',
                buttons: ['OK'],
              });
          await alert.present();
          return;
        }
        await auth.signInWithEmailAndPassword(email, password);
        await this.$router.push("/");
      } catch (error) {
        await this.errorAlert(error)
      }
    }
  }
}
</script>

<style scoped>
ion-img {
  background-color: #eceaea;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  color: #d2c0c0;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d2c0c0;
}

.separator:not(:empty)::before {
  margin-right: .55em;
}

.separator:not(:empty)::after {
  margin-left: .55em;
}
</style>