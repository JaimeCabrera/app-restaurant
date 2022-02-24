import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

import firebaseConfig from './config';

const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebase);

export {
  firebase,
  db,
  doc,
  getDocs,
  onSnapshot,
  storage,
  collection,
  query,
  where,
};
