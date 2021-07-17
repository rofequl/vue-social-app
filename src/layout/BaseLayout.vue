<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title size="large" class="logo">
          Chutki
        </ion-title>
        <ion-buttons slot="end">
          <ion-icon slot="icon-only" :icon="heartOutline"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot/>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon} from "@ionic/vue";
import {heartOutline} from 'ionicons/icons';

export default {
  name: "BaseLayout",
  components: {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon},
  data() {
    return {heartOutline}
  },
}
</script>

<style scoped>

</style>