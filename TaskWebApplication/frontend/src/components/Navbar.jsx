import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {user,logout}=useContext(AuthContext);
    const navigate=useNavigate();
    console.log(user);


    const handleLogout=()=>{
        logout();
    }
  return (
    <div>
      <div className="flex items-center justify-between p-10">
      <h1 className='text-6xl font-bold  text-violet-blue mb-4 mr-5 justify-content-center'>Task Manager Application</h1>
      
      <nav className='p-4'>
        <ul className=''>
        {
            user==null ?
            <div className='container mx-auto flex justify-between item-center'>
                {/* No User  */}
                <li className='text-pale-pink hover:bg-gray-700 hover:text-pale-gold px-3 py-2 rounded'>
                    <a href="/login">Login</a>
                </li>

                <li className='text-pale-pink hover:bg-gray-700 hover:text-pale-gold px-3 py-2 rounded'>
                    <a href="/register">Register</a>
                </li>
            </div>
            :
            <div className='container mx-auto flex justify-between item-center'>
                <li className='text-pale-gold text-xl font-bold item-bottom'>
                {/* <a href="#">{user}</a> */}
                </li>
                <li className='text-pale-pink hover:bg-gray-700 hover:text-pale-gold px-3 py-2 rounded'>
                <button onClick={()=>{navigate('/addtask')}}>Add Task</button>
                </li>
                
                <li className='text-pale-pink hover:bg-gray-700 hover:text-pale-gold px-3 py-2 rounded'>
                <button onClick={()=>{navigate('/tasks')}}>View Tasks</button>
                </li>
                <li className='text-pale-pink hover:bg-gray-700 hover:text-pale-gold px-3 py-2 rounded'>
                <a href="login/" onClick={handleLogout}>Logout</a>
                </li>

            </div>
        }
        </ul>
      </nav>
      </div>
    </div>
  )
}

export default Navbar
