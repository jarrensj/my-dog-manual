
import { DogCommand } from '@/types/dogCommand';

export const STORAGE_KEY = 'dogCareGuide';

export interface StorageData {
  commands: DogCommand[];
  dogName: string;
  ownerName: string;
}

export const loadStorageData = (): StorageData => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      return {
        commands: parsed.commands || [],
        dogName: parsed.dogName || '',
        ownerName: parsed.ownerName || ''
      };
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }
  return { commands: [], dogName: '', ownerName: '' };
};

export const saveStorageData = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
