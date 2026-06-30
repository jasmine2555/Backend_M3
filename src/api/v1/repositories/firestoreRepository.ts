import { db } from "../../../../config/firebaseConfig";

export async function createDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> {
  const docRef = await db.collection(collectionName).add(data);
  return { id: docRef.id, ...data };
}

export async function getAllDocuments<T extends Record<string, unknown>>(
  collectionName: string
): Promise<(T & { id: string })[]> {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as T & { id: string };
  });
}

export async function getDocumentById<T extends Record<string, unknown>>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const doc = await db.collection(collectionName).doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() } as T & { id: string };
}

export async function updateDocument<T extends Record<string, unknown>>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<T & { id: string }> {
  await db.collection(collectionName).doc(id).update(data);
  const updated = await getDocumentById<T>(collectionName, id);
  return updated as T & { id: string };
}

export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  await db.collection(collectionName).doc(id).delete();
}
