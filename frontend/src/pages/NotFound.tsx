import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound 