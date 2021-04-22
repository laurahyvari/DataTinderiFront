import Firebase from 'firebase'
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID
} from '@env'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: '',
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID
}

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig)

export const db = firebase.database()
export default firebase
