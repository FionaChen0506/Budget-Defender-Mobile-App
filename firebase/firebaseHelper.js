import {collection, addDoc, deleteDoc, doc, setDoc} from 'firebase/firestore';
import {database} from './firebaseSetup';
import {auth} from './firebaseSetup';


export async function writeToDB(expense) {
    try {
      const docRef = await addDoc(collection(database, "Expenses"), expense= {...expense, user:auth.currentUser.uid});
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteFromDB(id) {
    try {
      await deleteDoc(doc(database, "Expenses", id));
      console.log("Document successfully deleted!");
    } catch (err) {
      console.log(err);
    }
  }
  
  // export async function editInDB(id, expense) {
  //   try {
  //     await setDoc(doc(database, "Expenses", id), expense, { merge: true });
  //     console.log("Document successfully updated!");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   }

export async function updateInDB(entryId, updateEntry) {
  try {
      const entryRef = doc(database, 'Expenses', entryId);
      await setDoc(entryRef, updateEntry,  { merge: true });
      console.log('Updated');
  } catch (err) {
      console.log(err);
  }
}