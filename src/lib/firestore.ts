import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Constants
export const MASTER_ADMIN = 'hugoscode@gmail.com';
export const ADMIN_EMAILS = [MASTER_ADMIN];

// Types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin: Date;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  date: Date;
  createdAt: Date;
  updatedAt?: Date;
}

// User Functions
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  const userRef = doc(db, 'users', uid);
  const userData = {
    ...data,
    createdAt: Timestamp.now(),
    lastLogin: Timestamp.now(),
    role: 'user',
    preferences: {
      notifications: true,
      newsletter: true,
    }
  };
  
  await setDoc(userRef, userData, { merge: true });
  return userData;
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as UserProfile;
  }
  return null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
}

// News Functions
export async function getNews(limit = 3) {
  const newsRef = collection(db, 'news');
  const q = query(
    newsRef,
    orderBy('date', 'desc'),
    limit(limit)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as NewsItem[];
}

export async function getNewsById(id: string) {
  const newsRef = doc(db, 'news', id);
  const newsSnap = await getDoc(newsRef);
  
  if (newsSnap.exists()) {
    return { id: newsSnap.id, ...newsSnap.data() } as NewsItem;
  }
  return null;
}