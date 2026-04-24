import { LucidePlus } from 'lucide-react'
import React from 'react'
const Dashboard = () => {
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
        <div className='flex gap-4'>
          <button>
            <LucidePlus size={16} className='inline mr-2' />

          </button>
        </div>
     
      </div>
      
    </div>
  )
}

export default Dashboard
