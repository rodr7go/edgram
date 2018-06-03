import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAnm_ft449fkBBsM2Bhq1FvRkB_yYxKwT0",
    authDomain: "edgram-253ad.firebaseapp.com",
    databaseURL: "https://edgram-253ad.firebaseio.com",
    projectId: "edgram-253ad",
    storageBucket: "edgram-253ad.appspot.com",
    messagingSenderId: "722859921269"
}

export const init = () => firebase.initializeApp(config)