// IndexedDB persistence service for workshop progress
class PersistenceService {
  private dbName = 'AILiteracyWorkshop';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.warn('IndexedDB not available, falling back to localStorage');
        resolve();
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('progress')) {
          const progressStore = db.createObjectStore('progress', { keyPath: 'id' });
          progressStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('notes')) {
          const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
          notesStore.createIndex('slideId', 'slideId', { unique: false });
        }

        if (!db.objectStoreNames.contains('workshopData')) {
          const workshopStore = db.createObjectStore('workshopData', { keyPath: 'id' });
          workshopStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async saveProgress(data: any): Promise<void> {
    if (!this.db) {
      // Fallback to localStorage
      localStorage.setItem('presentation-progress', JSON.stringify(data));
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['progress'], 'readwrite');
      const store = transaction.objectStore('progress');

      const progressData = {
        id: 'main',
        ...data,
        timestamp: Date.now()
      };

      const request = store.put(progressData);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async loadProgress(): Promise<any | null> {
    if (!this.db) {
      // Fallback to localStorage
      const data = localStorage.getItem('presentation-progress');
      return data ? JSON.parse(data) : null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['progress'], 'readonly');
      const store = transaction.objectStore('progress');
      const request = store.get('main');

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveNotes(slideId: number, notes: string): Promise<void> {
    if (!this.db) {
      // Fallback to localStorage
      const existingNotes = JSON.parse(localStorage.getItem('presentation-notes') || '{}');
      existingNotes[slideId] = notes;
      localStorage.setItem('presentation-notes', JSON.stringify(existingNotes));
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['notes'], 'readwrite');
      const store = transaction.objectStore('notes');

      const noteData = {
        id: `note-${slideId}`,
        slideId,
        content: notes,
        timestamp: Date.now()
      };

      const request = store.put(noteData);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async loadNotes(slideId: number): Promise<string | null> {
    if (!this.db) {
      // Fallback to localStorage
      const existingNotes = JSON.parse(localStorage.getItem('presentation-notes') || '{}');
      return existingNotes[slideId] || null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['notes'], 'readonly');
      const store = transaction.objectStore('notes');
      const request = store.get(`note-${slideId}`);

      request.onsuccess = () => {
        resolve(request.result?.content || null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveWorkshopData(workshopId: string, data: any): Promise<void> {
    if (!this.db) {
      // Fallback to localStorage
      const existingData = JSON.parse(localStorage.getItem('workshop-data') || '{}');
      existingData[workshopId] = data;
      localStorage.setItem('workshop-data', JSON.stringify(existingData));
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['workshopData'], 'readwrite');
      const store = transaction.objectStore('workshopData');

      const workshopData = {
        id: workshopId,
        data,
        timestamp: Date.now()
      };

      const request = store.put(workshopData);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async loadWorkshopData(workshopId: string): Promise<any | null> {
    if (!this.db) {
      // Fallback to localStorage
      const existingData = JSON.parse(localStorage.getItem('workshop-data') || '{}');
      return existingData[workshopId] || null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['workshopData'], 'readonly');
      const store = transaction.objectStore('workshopData');
      const request = store.get(workshopId);

      request.onsuccess = () => {
        resolve(request.result?.data || null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) {
      localStorage.removeItem('presentation-progress');
      localStorage.removeItem('presentation-notes');
      localStorage.removeItem('workshop-data');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['progress', 'notes', 'workshopData'], 'readwrite');

      const promises = [
        new Promise<void>((res, rej) => {
          const request = transaction.objectStore('progress').clear();
          request.onsuccess = () => res();
          request.onerror = () => rej(request.error);
        }),
        new Promise<void>((res, rej) => {
          const request = transaction.objectStore('notes').clear();
          request.onsuccess = () => res();
          request.onerror = () => rej(request.error);
        }),
        new Promise<void>((res, rej) => {
          const request = transaction.objectStore('workshopData').clear();
          request.onsuccess = () => res();
          request.onerror = () => rej(request.error);
        })
      ];

      Promise.all(promises).then(() => resolve()).catch(reject);
    });
  }

  async exportData(): Promise<string> {
    const progress = await this.loadProgress();
    const allNotes: Record<number, string> = {};
    const allWorkshopData: Record<string, any> = {};

    // Load all notes (simplified - in real app, you'd query all)
    for (let i = 0; i < 40; i++) { // Assuming max 40 slides
      const notes = await this.loadNotes(i);
      if (notes) allNotes[i] = notes;
    }

    // Load workshop data (simplified)
    const workshopIds = ['experiment-planner', 'five-line-builder']; // Known workshop IDs
    for (const id of workshopIds) {
      const data = await this.loadWorkshopData(id);
      if (data) allWorkshopData[id] = data;
    }

    return JSON.stringify({
      progress,
      notes: allNotes,
      workshopData: allWorkshopData,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      if (data.progress) {
        await this.saveProgress(data.progress);
      }

      if (data.notes) {
        for (const [slideId, notes] of Object.entries(data.notes)) {
          await this.saveNotes(parseInt(slideId), notes as string);
        }
      }

      if (data.workshopData) {
        for (const [workshopId, workshopData] of Object.entries(data.workshopData)) {
          await this.saveWorkshopData(workshopId, workshopData);
        }
      }
    } catch (error) {
      throw new Error('Invalid import data format');
    }
  }
}

// Export singleton instance
export const persistenceService = new PersistenceService();
export default persistenceService;
