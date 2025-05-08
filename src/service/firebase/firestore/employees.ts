import dayjs from 'dayjs';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import { IEmployees } from '@/models/employees';
import { FIREBASE } from '@/paths';
import { dbFirestore } from '@/service/firebase/configs';

export const getEmployees = async (employeeId: string): Promise<IEmployees | null> => {
  const docRef = doc(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES, employeeId);
  const employeeDoc = await getDoc(docRef);

  if (employeeDoc.exists()) {
    const data = Object.assign(employeeDoc.data(), { id: employeeDoc.id }) as IEmployees;
    return data;
  }

  return null;
};

export const postEmployee = async (payload: IEmployees) => {
  const { id, ...rest } = payload;

  if (!id) {
    const collectionRef = collection(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES);
    await addDoc(collectionRef, {
      ...rest,
      createdAt: dayjs().toDate(),
    });
  } else {
    const docRef = doc(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES, id);
    await updateDoc(docRef, {
      ...rest,
      updatedAt: dayjs().toDate(),
    });
  }
};

export const deleteEmployee = async (employeeId: string) => {
  const docRef = doc(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES, employeeId);
  await deleteDoc(docRef);
};
