import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage utility functions using AsyncStorage
export const StorageUtils = {
  setString: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting string:', error);
    }
  },

  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting string:', error);
      return null;
    }
  },

  setNumber: async (key: string, value: number): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error('Error setting number:', error);
    }
  },

  getNumber: async (key: string): Promise<number | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? parseFloat(value) : null;
    } catch (error) {
      console.error('Error getting number:', error);
      return null;
    }
  },

  setBoolean: async (key: string, value: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting boolean:', error);
    }
  },

  getBoolean: async (key: string): Promise<boolean | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting boolean:', error);
      return null;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
