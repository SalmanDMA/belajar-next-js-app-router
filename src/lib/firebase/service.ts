import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';
import bycrpt from 'bcrypt';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
 const snapshot = await getDocs(collection(firestore, collectionName));
 const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));

 return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 const data = snapshot.data();
 return data;
}

export async function register(data: { fullname: string; email: string; password: string; role?: string }) {
 const q = query(collection(firestore, 'users'), where('email', '==', data.email));
 const snapshot = await getDocs(q);
 const users = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));

 if (users.length > 0) {
  return { status: false, statusCode: 400, message: 'Email already exists' };
 } else {
  data.role = 'member';
  data.password = await bycrpt.hash(data.password, 10);
  try {
   await addDoc(collection(firestore, 'users'), data);
   return { status: true, statusCode: 200, message: 'User created successfully' };
  } catch (error) {
   return { status: false, statusCode: 400, message: 'Failed to create user' };
  }
 }
}

export async function login(data: { email: string }) {
 const q = query(collection(firestore, 'users'), where('email', '==', data.email));
 const snapshot = await getDocs(q);
 const users = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));

 if (users.length > 0) {
  return users[0];
 } else {
  return null;
 }
}

export async function loginWithGoogle(data: any, callback: any) {
 const q = query(collection(firestore, 'users'), where('email', '==', data.email));
 const snapshot = await getDocs(q);
 const users: any = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));

 if (users.length > 0) {
  data.role = users[0].role;
  await updateDoc(doc(firestore, 'users', users[0].id), data).then(() => {
   callback({ status: true, data }, { status: 200 });
  });
 } else {
  data.role = 'member';
  await addDoc(collection(firestore, 'users'), data).then(() => {
   callback({ status: true, data }, { status: 200 });
  });
 }
}
