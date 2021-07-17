<template>
  <ion-header class="ion-no-border mini-border">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button v-if="cancelButton" :router-link="pageBackLinkUrl">
          <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ pageTitle }}</ion-title>
      <ion-buttons slot="end">
        <slot name="actions-end"></slot>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon} from '@ionic/vue'
import {closeOutline, checkmarkOutline} from 'ionicons/icons';

export default {
  name: "CustomLayout",
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    pageBackLinkUrl: {
      type: String,
      default: ''
    },
    cancelButton: {
      type: Boolean,
      default: false
    },
  },
  components: {IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon},
  data() {
    return {closeOutline, checkmarkOutline}
  },
}
</script>

<style scoped>
.mini-border {
  border-bottom: 0.001em solid #d4caca;
}
</style>