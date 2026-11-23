
import React, { useState } from 'react'

const TaskList = ({
  tasks,
  loading,
  error,
  onTaskUpdated
}) => {

  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // PUT - Mark task as completed
  const handleMarkAsDone = async (task) => {
    try {
      setUpdatingId(task.id)

      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: 1
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      await onTaskUpdated()

    } catch (err) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  // DELETE - Delete task
  const handleDelete = async (task) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    )

    if (!confirmDelete) {
      return
    }

    try {
      setDeletingId(task.id)

      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      // Refresh task list automatically
      await onTaskUpdated()

    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p>Loading tasks...</p>
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    )
  }

  return (
    <div>

      <h2 className="mb-4">Task List</h2>

      {tasks.length === 0 ? (

        <div className="card shadow-sm">
          <div className="card-body">
            <p className="text-muted mb-0">
              No tasks found. Add your first task!
            </p>
          </div>
        </div>

      ) : (

        <div className="row">

          {tasks.map((task) => (

            <div
              className="col-md-6 col-lg-4 mb-3"
              key={task.id}
            >

              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <h5 className="card-title">
                    {task.title}
                  </h5>

                  <p className="card-text text-muted">
                    {task.description}
                  </p>

                  <span
                    className={`badge mb-3 ${
                      Number(task.completed)
                        ? 'bg-success'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {Number(task.completed)
                      ? 'Completed'
                      : 'Pending'}
                  </span>

                  <div className="d-flex gap-2">

                    {!Number(task.completed) && (

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleMarkAsDone(task)}
                        disabled={
                          updatingId === task.id ||
                          deletingId === task.id
                        }
                      >
                        {updatingId === task.id
                          ? 'Updating...'
                          : '✓ Mark as Done'}
                      </button>

                    )}

                    {Number(task.completed) === 1 && (

                      <button
                        className="btn btn-outline-success btn-sm"
                        disabled
                      >
                        ✓ Completed
                      </button>

                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task)}
                      disabled={
                        deletingId === task.id ||
                        updatingId === task.id
                      }
                    >
                      {deletingId === task.id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default TaskList
