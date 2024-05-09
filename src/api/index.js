import {
  query,
  collection,
  doc,
  onSnapshot,
  orderBy,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { toast } from "react-toastify";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        // Log providerData
        const userData = userCred.providerData[0];
        console.log(userData);
        //DB INTERACTION
        const unsubscribe = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          }
        );
        return unsubscribe;
      } else {
        // no data
        reject(new Error("User is not authenticated"));
      }

      // Unsubscribe to prevent memory leak
      unsubscribe();
    });
  });
};
export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "templates"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });
    return unsubscribe;
  });
};

export const saveToCollections=async(user,data)=>{
  if(!user?.collections?.includes(data?._id)){
    const docRef=doc(db,'users',user?.uid);
    await updateDoc(docRef,{collections:arrayUnion(data?._id)})
    .then(()=>toast.success('Saved To Collection'))
    .catch((err)=>toast.error(`Error:${err.message}`))

  }
  else{
    const docRef=doc(db,'users',user?.uid);
    await updateDoc(docRef,{collections:arrayRemove(data?._id)})
    .then(()=>toast.success('Removed From Collection'))
    .catch((err)=>toast.error(`Error:${err.message}`))
  }
}

export const saveToFavourites=async(user,data)=>{
  if(!data?.favourites?.includes(user?.uid)){
    const docRef=doc(db,'templates',data?._id);
    await updateDoc(docRef,{favourites:arrayUnion(user?.uid)})
    .then(()=>toast.success('Saved To Favourites'))
    .catch((err)=>toast.error(`Error:${err.message}`))

  }
  else{
    const docRef=doc(db,'templates',data?._id);
    await updateDoc(docRef,{favourites:arrayRemove(user?.uid)})
    .then(()=>toast.success('Removed From Favourites'))
    .catch((err)=>toast.error(`Error:${err.message}`))
  }
}

export const getTemplateDetails=async(templateId)=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe=onSnapshot(doc(db,'templates',templateId),(doc)=>{
      resolve(doc.data());
    })
    return unsubscribe;
  })
}

export const getTemplateDetailEditByUser = (uid, id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      doc(db, "users", uid, "resumes", id),
      (doc) => {
        resolve(doc.data());
      }
    );

    return unsubscribe;
  });
};



export const getSavedResumes = (uid) => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "users", uid, "resumes"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });

    // Return the unsubscribe function
    return unsubscribe;
  });
};
