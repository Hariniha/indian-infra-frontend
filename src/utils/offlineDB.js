// IndexedDB configuration and utilities for offline support
const DB_NAME = 'IndianBuildDB';
const DB_VERSION = 1;
const STORE_DRAFTS = 'drafts';
const STORE_PENDING = 'pending_uploads';
const STORE_PRODUCTS = 'products';

class OfflineDB {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Drafts store (for unsaved product registrations)
        if (!db.objectStoreNames.contains(STORE_DRAFTS)) {
          const draftsStore = db.createObjectStore(STORE_DRAFTS, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          draftsStore.createIndex('timestamp', 'timestamp', { unique: false });
          draftsStore.createIndex('projectId', 'projectId', { unique: false });
        }

        // Pending uploads store (for completed forms waiting for blockchain sync)
        if (!db.objectStoreNames.contains(STORE_PENDING)) {
          const pendingStore = db.createObjectStore(STORE_PENDING, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          pendingStore.createIndex('timestamp', 'timestamp', { unique: false });
          pendingStore.createIndex('status', 'status', { unique: false });
        }

        // Products cache store (for faster loading)
        if (!db.objectStoreNames.contains(STORE_PRODUCTS)) {
          const productsStore = db.createObjectStore(STORE_PRODUCTS, { 
            keyPath: 'id' 
          });
          productsStore.createIndex('category', 'category', { unique: false });
          productsStore.createIndex('status', 'status', { unique: false });
        }
      };
    });
  }

  // Draft operations
  async saveDraft(data) {
    const draft = {
      ...data,
      timestamp: Date.now(),
      type: 'draft'
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_DRAFTS], 'readwrite');
      const store = transaction.objectStore(STORE_DRAFTS);
      const request = store.add(draft);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getDrafts() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_DRAFTS], 'readonly');
      const store = transaction.objectStore(STORE_DRAFTS);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getDraft(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_DRAFTS], 'readonly');
      const store = transaction.objectStore(STORE_DRAFTS);
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateDraft(id, data) {
    const draft = {
      ...data,
      id,
      timestamp: Date.now(),
      type: 'draft'
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_DRAFTS], 'readwrite');
      const store = transaction.objectStore(STORE_DRAFTS);
      const request = store.put(draft);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteDraft(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_DRAFTS], 'readwrite');
      const store = transaction.objectStore(STORE_DRAFTS);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Pending uploads operations
  async addPendingUpload(data) {
    const pending = {
      ...data,
      timestamp: Date.now(),
      status: 'pending',
      retries: 0,
      type: 'pending_upload'
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PENDING], 'readwrite');
      const store = transaction.objectStore(STORE_PENDING);
      const request = store.add(pending);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPendingUploads() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PENDING], 'readonly');
      const store = transaction.objectStore(STORE_PENDING);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updatePendingUpload(id, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PENDING], 'readwrite');
      const store = transaction.objectStore(STORE_PENDING);
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const pending = getRequest.result;
        const updated = { ...pending, ...data };
        const putRequest = store.put(updated);
        
        putRequest.onsuccess = () => resolve(putRequest.result);
        putRequest.onerror = () => reject(putRequest.error);
      };
      
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deletePendingUpload(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PENDING], 'readwrite');
      const store = transaction.objectStore(STORE_PENDING);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Products cache operations
  async cacheProduct(product) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PRODUCTS], 'readwrite');
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.put(product);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedProducts() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PRODUCTS], 'readonly');
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedProduct(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PRODUCTS], 'readonly');
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async clearCache() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_PRODUCTS], 'readwrite');
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.clear();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
const offlineDB = new OfflineDB();

// Initialize DB on module load
offlineDB.init().catch(console.error);

export default offlineDB;

// Utility functions
export const checkOnlineStatus = () => {
  return navigator.onLine;
};

export const listenToOnlineStatus = (callback) => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
  
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

export const syncPendingUploads = async () => {
  const pending = await offlineDB.getPendingUploads();
  const results = [];
  
  for (const upload of pending) {
    try {
      // Simulate blockchain upload
      // In production, this would call actual API endpoints
      console.log('Syncing upload:', upload.id);
      
      // Mark as synced
      await offlineDB.updatePendingUpload(upload.id, { 
        status: 'synced',
        syncedAt: Date.now() 
      });
      
      results.push({ id: upload.id, success: true });
    } catch (error) {
      // Increment retry count
      await offlineDB.updatePendingUpload(upload.id, { 
        retries: upload.retries + 1,
        lastError: error.message
      });
      
      results.push({ id: upload.id, success: false, error });
    }
  }
  
  return results;
};

// Auto-sync when coming back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Back online - syncing pending uploads...');
    syncPendingUploads().then(results => {
      console.log('Sync results:', results);
    });
  });
}
