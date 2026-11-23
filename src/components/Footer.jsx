
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">

        <h5 className="mb-2">Task Manager</h5>

        <p className="mb-2 text-white-50">
          Organize your tasks. Manage your time. Achieve your goals.
        </p>

        <p className="mb-0 text-white-50">
          &copy; {new Date().getFullYear()} Kushtrim Gashi
          - All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
