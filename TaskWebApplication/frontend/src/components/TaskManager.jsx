import React, { useContext, useEffect, useState } from 'react'
import AddTask from './AddTask'

import { Link, useNavigate } from 'react-router-dom'
import { TaskContext } from './taskContext';
import { AuthContext } from './AuthContext';
import EditTask from './EditTask';
import Navbar from './Navbar';
import ViewTask from './ViewTask';

const TaskManager = () => {

    const [editingTask,setEdiitingTask]=useState(null);
    const [completed,setCompleted]=useState(false);
    const {tasks,fetchTasks,deleteTask}=useContext(TaskContext);
    const {user,email}=useContext(AuthContext);


    const navigate=useNavigate();

    // console.log("Email is ",email);
    useEffect(()=>{
        fetchTasks();
        // console.log("Fetch Method working")
    },[email]);
    
    console.log(tasks);

    const displayCompleted =(status)=>{
        setCompleted(status);
      }
    //   RenderTabList
        const renderTabList = () => {
            return (
            <div className="grid grid-cols-3 gap-30">
                <span
                onClick={() => displayCompleted(true)}
                className={`w-3/7 border text-l mx-3 my-5 text-dark-slate-gray hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${completed?'active':''}`}
                >
                Completed
                </span>
                <span
                onClick={() => displayCompleted(false)}
                className={`w-3/7 border text-l mx-3 my-5 text-dark-slate-gray hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${completed?'':'active'}`}

                >
                Incomplete
                </span>
            </div>
            );
        };

    
    const handleEdit= (item)=>{
      setEdiitingTask(item);

    }

    const handleDelete =(id)=>{
      deleteTask(id);
    }

    const handleView  =(item)=>{
        localStorage.setItem('item', JSON.stringify(item));
        navigate('/viewtask');
    }

    // Render items 
    const renderItems = () => {
        const filteredItems = tasks.filter(
          item => item.completed === completed
        );
        return filteredItems.map(item => (
          <li
            key={item.id}
            className="grid grid-cols-3 gap-4 p-1"
            onClick={()=>handleView(item)}
          >
            <span
              className='text-xl capitalize mx-3 my-3 item-center'
              title={item.description}
            >
              {item.title}
            </span>
            <span>
              <button
                
                className="w-3/7 border text-l mx-3 my-3 text-dark-slate-gray hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                
                className="w-3/7 border text-l mx-3 my-3 text-dark-slate-gray hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </span>
          </li>
        ));
      };



  return (
    <div>
      <Navbar />
      
      {editingTask ? 

      <EditTask item={editingTask} onClose={()=>setEdiitingTask(null)} />
      :
      
      <div className='grid grid-cols-2 gap-10 mt-10'>
        <div className=' rounded-lg shadow-lg text-white p-10'>
        <h1 className='pb-10 text-pale-gold text-3xl'>Hi, <b className='capitalize'>{user}</b></h1>
        <p className='text-lg pr-10'>Welcome to Task-manager application, in this application you can create your tasks by giving task name, description about the task 
          and a confirmation that whether the task is completed or not. 
        </p>
        <p className='text-lg pr-10'>This web application works based on React and Django as backend framework, and all your credentials, and tasks are stored in django database. 
        </p>
        </div>
      <div className='p-6 rounded-lg shadow-lg text-white p-10'>
        <h1 className='text-pale-gold text-3xl '>Tasks</h1>
        <div>
          
          {renderTabList()}
          
        </div>

        <ul className='mb-10'>
          {renderItems()}
        </ul>
        
        <div className='grid grid-cols-3 gap-4'>
          <div></div>
          <div className='text-center text-xl border hover:bg-gray-700 hover:text-white px-3 py-2 rounded '><Link to='/addtask' className=' text-center text-pale-gold'>Add Task</Link></div>
          <div></div>
        </div>
      </div>
      
    </div>
    
  } 
    </div>
  )
}

export default TaskManager
