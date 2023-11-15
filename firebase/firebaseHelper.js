import {collection, addDoc, deleteDoc, doc, setDoc} from 'firebase/firestore';
import {database} from './firebaseSetup';
import {auth} from './firebaseSetup';


export async function writeToDB(goal) {
    try {
      const docRef = await addDoc(collection(database, "Goals"), goal= {...goal, user:auth.currentUser.uid});
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteFromDB(id) {
    try {
      await deleteDoc(doc(database, "Goals", id));
      console.log("Document successfully deleted!");
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function editInDB(id, goal) {
    try {
      await setDoc(doc(database, "Goals", id), goal, { merge: true });
      console.log("Document successfully updated!");
    } catch (err) {
      console.log(err);
    }
    }