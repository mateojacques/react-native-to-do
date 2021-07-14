import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native'
import Task from './components/Task'

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => completeTask(index)}>
                <Task key={index} name={item} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTasksWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A535C',
  },
  items: { marginTop: 30, maxHeight: '60vh', overflow: 'scroll' },
  writeTasksWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    padding: 15,
    width: 250,
    backgroundColor: '#DFF6F5',
    borderRadius: 60,
    borderColor: '#BFEDEB',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#DFF6F5',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#BFEDEB',
    borderWidth: 1,
  },
  addText: {
    fontWeight: 500,
    fontSize: 30,
    color: '#1A535C',
    transform: 'translateY(-2px)',
  },
})
