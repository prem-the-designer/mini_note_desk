import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTasks } from '@/hooks/useTasks';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

export default function CalendarScreen() {
  const { tasks } = useTasks();
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    const dayTasks = tasks.filter(task => 
      isSameDay(new Date(task.date), date)
    );
    
    return {
      date,
      tasks: dayTasks,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              isSameDay(day.date, today) && styles.todayContainer,
            ]}>
            <Text style={styles.dayName}>
              {format(day.date, 'EEE')}
            </Text>
            <Text style={[
              styles.dayNumber,
              isSameDay(day.date, today) && styles.todayText,
            ]}>
              {format(day.date, 'd')}
            </Text>
            <View style={styles.taskIndicator}>
              <Text style={styles.taskCount}>
                {day.tasks.length}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.taskList}>
        <Text style={styles.sectionTitle}>
          Today's Tasks
        </Text>
        {tasks
          .filter(task => isSameDay(new Date(task.date), today))
          .map(task => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskTime}>
                {format(new Date(task.date), 'h:mm a')}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  todayContainer: {
    backgroundColor: '#0891b2',
  },
  dayName: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter_400Regular',
  },
  dayNumber: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  todayText: {
    color: '#fff',
  },
  taskIndicator: {
    marginTop: 4,
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  taskCount: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter_400Regular',
  },
  taskList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1e293b',
    fontFamily: 'Inter_400Regular',
  },
  taskTime: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
});