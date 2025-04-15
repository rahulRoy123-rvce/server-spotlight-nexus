import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { servers, categories } from '../data/mockData';

const deleteCollection = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
  await Promise.all(deletePromises);
  console.log(`🗑️ Cleared ${collectionName} collection.`);
};

const uploadData = async () => {
  try {
    // Step 1: Delete existing data
    await deleteCollection('servers');
    await deleteCollection('categories');

    // Step 2: Upload servers
    const serversCollection = collection(db, 'servers');
    for (const server of servers) {
      await setDoc(doc(serversCollection, server.id), server);
    }
    console.log('✅ Servers uploaded.');

    // Step 3: Upload categories
    const categoriesCollection = collection(db, 'categories');
    for (const category of categories) {
      await setDoc(doc(categoriesCollection, category.id), category);
    }
    console.log('✅ Categories uploaded.');

    console.log('🔥 Upload completed successfully!');
  } catch (error) {
    console.error('❌ Error uploading data:', error);
  }
};

uploadData();
