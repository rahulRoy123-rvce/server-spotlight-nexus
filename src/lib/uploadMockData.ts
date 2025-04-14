import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { servers, categories } from '../data/mockData';


const uploadData = async () => {
  try {
    // Upload servers
    const serversCollection = collection(db, 'servers');
    for (const server of servers) {
      await setDoc(doc(serversCollection, server.id), server);
    }
    console.log('✅ Servers uploaded.');

    // Upload categories
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
