import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "vendor-onboarding-db";
const DB_VERSION = 1;
const FILE_STORE = "files";

async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        db.createObjectStore(FILE_STORE);
      }
    },
  });
}
export async function saveFile(key: string, file: File): Promise<string> {
  const db = await getDB();
  await db.put(FILE_STORE, file, key);
  return key;
}

export async function getFile(key: string): Promise<File | undefined> {
  const db = await getDB();
  return db.get(FILE_STORE, key);
}

export async function deleteFile(key: string): Promise<void> {
  const db = await getDB();
  await db.delete(FILE_STORE, key);
}

export async function listFileKeys(): Promise<IDBValidKey[]> {
  const db = await getDB();
  return db.getAllKeys(FILE_STORE);
}

export function buildFileKey(field: string, file: File): string {
  return `${field}_${file.name}_${Date.now()}`;
}

export function fileToPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}