// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { DocumentData, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import generateRandomId from "../helpers/generateId";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBBXWRy4XzplcNzBL41ZT3LgnmTmbaD19c",
  authDomain: "screening-round.firebaseapp.com",
  projectId: "screening-round",
  storageBucket: "screening-round.appspot.com",
  messagingSenderId: "68558533844",
  appId: "1:68558533844:web:90c55862ede6af82473741",
  measurementId: "G-7Y37V1DPDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const getUsers = async() => {
    const userDetails: DocumentData[] = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        userDetails.push(doc.data());
    });
    return userDetails
}

const saveUser = async(data: {email: string, name: string}) => {
    await setDoc(doc(db, "users", generateRandomId()), {
        name: data.name,
        email: data.email
    });
}

export {
    db,
    initializeApp,
    getUsers,
    saveUser
}
// const analytics = getAnalytics(app);