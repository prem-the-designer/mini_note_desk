import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Check, X } from 'lucide-react-native';
import { useTasks } from '@/hooks/useTasks';
import { useTags } from '@/hooks/useTags';
import { format } from 'date-fns';

export default function TasksScreen() {
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const { tags } = useTags();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        completed: false,
        date: selectedDate.toISOString(),
        tags: [],
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const toggleTaskCompletion = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleTaskCompletion(item.id, !item.completed)}
              style={styles.checkbox}>
              {item.completed && <Check size={16} color="#0891b2" />}
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text style={[
                styles.taskTitle,
                item.completed && styles.completedTask
              ]}>
                {item.title}
              </Text>
              <Text style={styles.taskDate}>
                {format(new Date(item.date), 'MMM d, yyyy')}
              </Text>
              <View style={styles.tagContainer}>
                {item.tags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  return tag ? (
                    <View
                      key={tag.id}
                      style={[styles.tag, { backgroundColor: tag.color }]}>
                      <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                  ) : null;
                })}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteButton}>
              <X size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      {isAddingTask ? (
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            placeholder="Enter task title"
            autoFocus
          />
          <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
            <Check size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsAddingTask(true)}
          style={styles.floatingButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0891b2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  taskDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  deleteButton: {
    padding: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addTaskContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});