import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBHLuBgsvDhbUH_T_u_OjqPZRxxuw0mNmU",
  authDomain: "netflix-clone-f1c38.firebaseapp.com",
  projectId: "netflix-clone-f1c38",
  storageBucket: "netflix-clone-f1c38.firebasestorage.app",
  messagingSenderId: "503659581740",
  appId: "1:503659581740:web:4e7bf674b719140a909c89"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,name,
        authProvider: "local",email
       });
    } catch (error) {
       console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};