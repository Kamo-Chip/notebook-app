// utils/indexedDb.js
export async function initializeDb() {
  const request = indexedDB.open("myDatabase", 1);

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = () => {
      const db = request.result;
      // Create an object store with an auto-incrementing key if it doesn't exist
      if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result); // Resolves with the database instance
    request.onerror = () =>
      reject(new Error("IndexedDB initialization failed"));
  });
}

export async function addItem(db: IDBDatabase, item: any) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["items"], "readwrite");
    const store = transaction.objectStore("items");
    const request = store.add(item);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to add item");
  });
}

export async function getItems(db: IDBDatabase) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["items"], "readonly");
    const store = transaction.objectStore("items");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to get items");
  });
}
