<template>
  <base-layout>
    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)"
                   pull-factor="0.5" pull-min="100" pull-max="200">
      <ion-refresher-content
          pulling-text="Pull to refresh" refreshing-text="Refreshing..."></ion-refresher-content>
    </ion-refresher>
    <profile-details></profile-details>
    <post-details ref="child"/>
  </base-layout>
</template>

<script>
import {IonRefresher, IonRefresherContent} from '@ionic/vue';
import BaseLayout from "@/layout/BaseLayout";
import ProfileDetails from "@/components/profile/ProfileDetails";
import PostDetails from "@/components/post/PostDetails";

export default {
  name: "Profile",
  components: {PostDetails, ProfileDetails, BaseLayout, IonRefresher, IonRefresherContent},
  methods: {
    doRefresh(event) {
      this.$refs.child.loadPost()
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  }
}
</script>

<style scoped>

</style>