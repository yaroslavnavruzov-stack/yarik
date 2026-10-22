import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

export async function getDepartments() {
  const snap = await getDocs(collection(db, 'departments'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addDepartment(dept) {
  const ref = await addDoc(collection(db, 'departments'), {
    name: dept.name,
    head: dept.head || '',
    email: dept.email || '',
    phone: dept.phone || ''
  });
  return ref.id;
}

export async function updateDepartment(id, data) {
  await updateDoc(doc(db, 'departments', id), data);
}

export async function deleteDepartment(id) {
  await deleteDoc(doc(db, 'departments', id));
}

export async function getAppeals(filters = {}) {
  let q = query(collection(db, 'appeals'), orderBy('createdAt', 'desc'));

  if (filters.status) {
    q = query(
      collection(db, 'appeals'),
      where('status', '==', filters.status),
      orderBy('createdAt', 'desc')
    );
  }

  const snap = await getDocs(q);
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toMillis?.() || Date.now(),
    updatedAt: d.data().updatedAt?.toMillis?.() || Date.now()
  }));
}

export async function addAppeal(appeal, userId) {
  const ref = await addDoc(collection(db, 'appeals'), {
    ...appeal,
    status: 'new',
    userId: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return ref.id;
}

export async function updateAppealStatus(id, status) {
  await updateDoc(doc(db, 'appeals', id), {
    status: status,
    updatedAt: serverTimestamp()
  });
}