
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { MCPServer } from './types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Function to seed or update server data
export const seedServer = async (server: Omit<MCPServer, 'id'>, id?: string) => {
  try {
    if (id) {
      // Update existing server
      await setDoc(doc(db, 'servers', id), server);
      return id;
    } else {
      // Add new server
      const docRef = await addDoc(collection(db, 'servers'), server);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error adding/updating server:', error);
    throw error;
  }
};

// Function to seed multiple servers at once
export const seedServers = async (servers: Omit<MCPServer, 'id'>[]) => {
  const results = [];
  
  for (const server of servers) {
    try {
      const id = await seedServer(server);
      results.push(id);
    } catch (error) {
      console.error('Error seeding server:', server.name, error);
    }
  }
  
  return results;
};
