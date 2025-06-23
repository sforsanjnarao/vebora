import React from 'react'

type Props={
    children: React.ReactNode
} 

export default function AuthLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  )
}