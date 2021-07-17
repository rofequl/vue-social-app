<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="friend" href="/friend">
          <ion-icon :icon="searchOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="add-status" href="/add-status">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="personCircle"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage
} from "@ionic/vue";
import {home, personCircle, addCircleOutline, searchOutline} from 'ionicons/icons';

export default {
  name: "BottomTab",
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage
  },
  data() {
    return {home, personCircle, addCircleOutline, searchOutline}
  },
}
</script>

<style scoped>

</style>