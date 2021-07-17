import firebase from "firebase/app";

import FIREBASE_CONFIG from "@/hooks/.env.firebase"
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

const state = ({
    user: null,
    initialized: false,
    error: null,
});

export default function() {
    const authCheck = () => {
        return new Promise((resolve) => {
            !state.initialized &&
            firebase.auth().onAuthStateChanged(async (_user) => {
                if (_user) {
                    state.user = _user;
                } else {
                    state.user = null;
                }
                state.initialized = true;
                resolve(true);
            });
        });
    };

    return {
        authCheck,
    };
}