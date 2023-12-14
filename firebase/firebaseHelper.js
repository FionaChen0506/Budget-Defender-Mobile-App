import {collection, addDoc, deleteDoc, doc, setDoc, getDoc} from 'firebase/firestore';
import {database} from './firebaseSetup';
import {auth} from './firebaseSetup';
import {ref, uploadBytesResumable, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from './firebaseSetup';


export async function writeToDB(expense) {
    try {
      const docRef = await addDoc(collection(database, "Expenses"), expense= {...expense, user:auth.currentUser.uid});
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log('Error in writeToDB: ', err);
    }
  }
  
  export async function deleteFromDB(id) {
    try {
      // also delete photo from storage
      const docRef = doc(database, "Expenses", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data.photo) {
        await deletePhotoFromStorage(data.photo);
      }

      await deleteDoc(docRef);
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
      console.log('error in updateInDB: ', err);
  }
}

export async function writeToBudgetsDB(budget) {
  try {
    const docRef = await addDoc(collection(database, "Budgets"), expense= {...budget, user:auth.currentUser.uid});
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateInBudgetsDB(entryId, updateEntry) {
  try {
      const entryRef = doc(database, 'Budgets', entryId);
      await setDoc(entryRef, updateEntry,  { merge: true });
      console.log('Updated');
  } catch (err) {
      console.log('error in updateInBudgetsDB: ', err);
  }
}
// delete photo from storage
export async function deletePhotoFromStorage(url) {
  try {
    const photoRef = ref(storage, url);
    await deleteObject(photoRef);
    console.log('Deleted in storage');
  } catch (err) {
    console.log('Error in deleting photo from storage: ', err);
  }
};


// delete photo from an expense
export async function deletePhotoFromExpense(url, entryId) {
  try {
    const photoRef = ref(storage, url);
    await deleteObject(photoRef);
    
    const entryRef = doc(database, 'Expenses', entryId);
    await setDoc(entryRef, {photo: null}, { merge: true });
    console.log('Deleted');
  }
  catch (err) {
    console.log('Error in deleting photo from expense: ', err);
  }
}

export async function writeToUsersDB(info) {
  try {
    const docRef = await addDoc(collection(database, "Users"), expense= {...info, user:auth.currentUser.uid});
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateInUsersDB(entryId, updateEntry) {
  try {
      const entryRef = doc(database, 'Users', entryId);
      await setDoc(entryRef, updateEntry,  { merge: true });
      console.log('Updated');
  } catch (err) {
      console.log('error in updateInUsersDB: ', err);
  }
}