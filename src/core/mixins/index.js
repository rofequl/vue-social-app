import {alertController} from "@ionic/vue";

export default {
    methods: {
        uuidv4() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                const r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },
        async errorAlert(e) {
            const alert = await alertController
                .create({
                    header: 'Warning',
                    message: e.message,
                    buttons: ['OK'],
                });
            await alert.present();
        },
    }
}