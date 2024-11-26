'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
      redirect('admin/users')
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default page
