import React from 'react'

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <a className="navbar-brand fw-bold" href="#home">
          Task Manager
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <a
                href="#task-list"
                className={`nav-link ${
                  activePage === 'task-list' ? 'active' : ''
                }`}
                onClick={() => setActivePage('task-list')}
              >
                Task List
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#add-task"
                className={`nav-link ${
                  activePage === 'add-task' ? 'active' : ''
                }`}
                onClick={() => setActivePage('add-task')}
              >
                Add a Task
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar