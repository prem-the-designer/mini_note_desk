import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tag } from '@/types/task';

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const storedTags = await AsyncStorage.getItem('tags');
      if (storedTags) {
        setTags(JSON.parse(storedTags));
      }
    } catch (error) {
      console.error('Error loading tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = async (name: string, color: string) => {
    try {
      const newTag: Tag = {
        id: Date.now().toString(),
        name,
        color,
      };
      const updatedTags = [...tags, newTag];
      await AsyncStorage.setItem('tags', JSON.stringify(updatedTags));
      setTags(updatedTags);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const deleteTag = async (tagId: string) => {
    try {
      const updatedTags = tags.filter((tag) => tag.id !== tagId);
      await AsyncStorage.setItem('tags', JSON.stringify(updatedTags));
      setTags(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return {
    tags,
    loading,
    addTag,
    deleteTag,
  };
}