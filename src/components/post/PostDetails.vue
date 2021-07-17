<template>

  <ion-row v-for="(post, i) in status" :key="i" class="divider">
    <ion-col>
      <ion-toolbar>
        <ion-item>
          <ion-avatar>
            <ion-img :src="post.photoURL" :alt="post.displayName"></ion-img>
          </ion-avatar>
          <ion-label class="ion-padding-start">
            <h3>{{ post.displayName }}</h3>
            <p>{{ moment(post.time).fromNow() }}</p>
          </ion-label>
        </ion-item>
      </ion-toolbar>
      <p class="m-0">
        {{ post.description }}
      </p>
      <ion-img v-if="post.photoURL !== ''" :src="post.image"></ion-img>
    </ion-col>
  </ion-row>

</template>

<script>
import {
  IonRow,
  IonCol,
  IonToolbar,
  IonAvatar,
  IonImg,
  IonLabel,
  IonItem
} from '@ionic/vue'
import {auth, db} from "@/hooks/firebase-auth";
import moment from 'moment';

export default {
  name: "PostDetails",
  data() {
    return {
      status: [],
      moment
    };
  },
  components: {
    IonRow,
    IonCol,
    IonToolbar,
    IonAvatar,
    IonImg,
    IonLabel,
    IonItem,
  },
  methods: {
    loadPost() {
      db.collection('status').where("uid", "==", auth.currentUser.uid).onSnapshot((querySnapshot) => {
        this.status = []
        querySnapshot.forEach((doc) => {
          db.collection('users').doc(doc.data().uid).onSnapshot((querySnapshot) => {
            this.status.push({
              displayName: querySnapshot.data().displayName,
              photoURL: querySnapshot.data().photoURL,
              description: doc.data().description,
              image: doc.data().photoURL,
              time: doc.data().created_at
            });
          })
        });
      })
    }
  },
  created() {
    this.loadPost();
  },
  watcher() {
    db.collection('status').where("uid", "==", auth.currentUser.uid).onSnapshot((querySnapshot) => {
      this.status = []
      querySnapshot.forEach((doc) => {
        db.collection('users').doc(doc.data().uid).onSnapshot((querySnapshot) => {
          this.status.push({
            displayName: querySnapshot.data().displayName,
            photoURL: querySnapshot.data().photoURL,
            description: doc.data().description,
            image: doc.data().photoURL,
            time: doc.data().created_at
          });
        })
      });
    })
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

.divider {
  padding-bottom: 13px;
  border-bottom: 7px solid #eadede;
}
</style>