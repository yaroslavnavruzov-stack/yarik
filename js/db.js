import { db, auth } from './firebase-config.js';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const APPEALS_COL = 'appeals';
const DEPTS_COL = 'departments';

export async function getDepartments() {
  const snap = await getDocs(collection(db, DEPTS_COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addDepartment(data) {
  return await addDoc(collection(db, DEPTS_COL), data);
}

export async function updateDepartment(id, data) {
  return await updateDoc(doc(db, DEPTS_COL, id), data);
}

export async function deleteDepartment(id) {
  return await deleteDoc(doc(db, DEPTS_COL, id));
}

export async function getAppeals() {
  const q = query(collection(db, APPEALS_COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ 
    id: d.id, 
    ...d.data(),
    createdAt: d.data().createdAt?.toMillis() || Date.now(),
    updatedAt: d.data().updatedAt?.toMillis() || Date.now()
  }));
}

export async function addAppeal(data) {
  const user = auth.currentUser;
  if (!user) throw new Error("Нет авторизации");

  const payload = {
    ...data,
    status: 'new',
    userId: user.uid,
    userEmail: user.email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  return await addDoc(collection(db, APPEALS_COL), payload);
}

export async function updateAppealStatus(id, status) {
  return await updateDoc(doc(db, APPEALS_COL, id), {
    status: status,
    updatedAt: serverTimestamp()
  });
}

export async function deleteAppeal(id) {
  return await deleteDoc(doc(db, APPEALS_COL, id));
}