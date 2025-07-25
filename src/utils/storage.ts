
import { DogCommand } from '@/types/dogCommand';

export const STORAGE_KEY = 'dogCareGuide';

export interface StorageData {
  commands: DogCommand[];
  dogName: string;
  ownerName: string;
  dogPhoto?: string;
  careTips: string[];
  emergencyPhone?: string;
  emergencyEmail?: string;
}

export const loadStorageData = (): StorageData => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      return {
        commands: parsed.commands || [],
        dogName: parsed.dogName || '',
        ownerName: parsed.ownerName || '',
        dogPhoto: parsed.dogPhoto || undefined,
        careTips: parsed.careTips || [
          'Use a calm, confident voice when giving commands',
          'Always supervise interactions with the dog',
          'If the dog seems anxious or confused, give them space',
          'Contact the owner immediately if any problems arise',
          'Keep emergency contact information handy'
        ],
        emergencyPhone: parsed.emergencyPhone || undefined,
        emergencyEmail: parsed.emergencyEmail || undefined
      };
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }
  return { 
    commands: [], 
    dogName: '', 
    ownerName: '',
    dogPhoto: undefined,
    careTips: [
      'Use a calm, confident voice when giving commands',
      'Always supervise interactions with the dog',
      'If the dog seems anxious or confused, give them space',
      'Contact the owner immediately if any problems arise',
      'Keep emergency contact information handy'
    ]
  };
};

export const saveStorageData = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
