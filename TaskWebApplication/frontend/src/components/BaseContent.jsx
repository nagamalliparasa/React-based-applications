import React from 'react'
import myImage from '../assets/images/task1.png'
import { useNavigate } from 'react-router-dom'


const BaseContent = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className='grid grid-cols-2 gap-4 mt-10'>
      <div className='p-6 rounded-lg shadow-lg text-white p-10'>
      <h1 className='text-3xl font-bold pb-10 '>Welcome to Task Manager!</h1>
      <p>Effortlessly manage your tasks with our intuitive and stylish platform. Organize, prioritize, and keep track of your to-dos with ease. Whether you're marking tasks as complete or adding new ones, our streamlined interface ensures productivity is just a click away.</p>
      </div>
      <div>
          <img src={myImage} alt="Image Not found" />
      </div>
      </div>
        
      <div className='grid grid-cols-9 gap-4'>
        <button onClick={() =>{ navigate('/register')}} className='w-full text-xl border bg-red-500 text-l mx-3 my-5 text-white hover:bg-red-700 hover:text-white px-3 py-2 rounded'>Start For free</button>
        <button onClick={()=>{navigate('/login')}} className='w-full text-xl border bg-dark-slate-gray text-l mx-3 my-5 text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded'>Login</button>
      </div>
    </div>

    
  )
}

export default BaseContent
