import {getApp,getApps,initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB6ooS7wIKHMEOAQ7RVuN-jq-4upV4ff_s",
    authDomain: "resume-builder-92bc1.firebaseapp.com",
    projectId: "resume-builder-92bc1",
    storageBucket: "resume-builder-92bc1.appspot.com",
    messagingSenderId: "1017021492716",
    appId: "1:1017021492716:web:42895a53abbf6957afe4c9",
    measurementId: "G-Q6W4J3HFVB"
  };
  const app=getApps.length >0 ?getApp():initializeApp(firebaseConfig);

  const auth=getAuth(app);
  const db=getFirestore(app);
  const storage=getStorage(app);

  export{auth,db,storage,firebaseConfig};