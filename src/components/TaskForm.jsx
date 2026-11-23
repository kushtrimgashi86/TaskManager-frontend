
import React, { useState } from 'react'

const TaskForm = ({ onTaskAdded }) => {

  // Store form values
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Store messages
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Handle form submission
 
const handleSubmit = async (e) => {
  e.preventDefault()

  setMessage('')
  setError('')

  if (!title.trim()) {
    setError('Please enter a task title.')
    return
  }

  try {
    const response = await fetch(
      'http://localhost:5000/api/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create task')
    }

    // Clear form
    setTitle('')
    setDescription('')

    // Refresh task list automatically
    await onTaskAdded()

    setMessage('Task created successfully!')

  } catch (err) {
    setError(err.message)
  }
}


  return (
    <div>
      <h2 className="mb-4">Add a Task</h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Task Title</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Add Task
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default TaskForm
