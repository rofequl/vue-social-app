<template>
  <ion-grid class="ion-margin-top">
    <ion-row class="ion-text-center">
      <ion-col>
        <ion-avatar>
          <ion-img :src="userInfo.photoURL" alt="title"></ion-img>
        </ion-avatar>
      </ion-col>
      <ion-col class="text-height-center">

      </ion-col>
      <ion-col class="text-height-center">

      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <p class="ion-no-margin">{{ userInfo.displayName }}</p>
        <a :href="userInfo.website" target="_blank" class="ion-no-margin text-primary">{{ userInfo.website }}</a>
        <p class="ion-no-margin">{{ userInfo.bio }}</p>
        <ion-toolbar>
          <ion-buttons>
            <ion-button style="width: 90%" fill="outline" router-link="/edit-profile">
              Edit Profile
            </ion-button>
            <ion-button fill="outline">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {IonImg, IonAvatar, IonCol, IonGrid, IonRow, IonToolbar, IonButtons, IonButton, IonIcon} from '@ionic/vue'
import {settingsOutline} from "ionicons/icons";
import {auth, db} from "@/hooks/firebase-auth";

export default {
  name: "ProfileDetails",
  components: {IonImg, IonAvatar, IonCol, IonGrid, IonRow, IonToolbar, IonButtons, IonButton, IonIcon},
  data() {
    return {settingsOutline, userInfo: []}
  },
  created() {
    db.collection('users').doc(auth.currentUser.uid).onSnapshot((querySnapshot) => {
      this.userInfo = querySnapshot.data()
    })
  }
}
</script>

<style scoped>
ion-avatar {
  width: 80px;
  height: 80px;
}
</style>