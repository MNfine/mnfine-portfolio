// src/components/ui/badge.jsx
import React from 'react'

export function Badge({ children, className = '', ...props }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
