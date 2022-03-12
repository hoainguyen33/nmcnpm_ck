import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAu1cf2EegyOVtvsVA2eKz4-TytW0wKFSI',
  authDomain: 'authentication-d65cc.firebaseapp.com',
  projectId: 'authentication-d65cc',
  storageBucket: 'authentication-d65cc.appspot.com',
  messagingSenderId: '85015264911',
  appId: '1:85015264911:web:5bb3ba1bae2e91f7507afa',
  measurementId: 'G-DJ9F1KGZ7C'
}

firebase.initializeApp(firebaseConfig)

export default firebase