
import { useState, useEffect, useCallback } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      setError('')

      const response = await fetch('http://localhost:5000/api/tasks')

      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }

      const data = await response.json()
      setTasks(data)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load tasks when application starts
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <TaskForm onTaskAdded={fetchTasks} />

        <hr className="my-5" />

      <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onTaskUpdated={fetchTasks}
        />
      </div>
      <Footer />
    </>
  )
}

export default App

