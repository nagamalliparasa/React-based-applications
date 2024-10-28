import React, { useState,useContext } from 'react';
import { TaskContext } from './taskContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ title, description, completed });
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  const handleTasks =()=>{
    navigate('/tasks')
  }



  return (
    <div>
        <Navbar />
        <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
          <h1 className='text-4xl font-bold mb-4 text-center'>Add Task Here</h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <label className=" block text-gray-700 mb-2 ">Title</label>
            <input type="text" value={title} 
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label className=" block text-gray-700 mb-2 ">Description</label>
            <textarea value={description} 
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)} />
              <br />
            <label className=" text-gray-700 mb-2 pr-3">Completed:</label>
            <input type="checkbox" checked={completed} 
            onChange={() => setCompleted(!completed)} />
            <div className="grid grid-cols-2 gap-12">
            <button type="submit"
            className="block w-full text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >Add Task</button>
            <button onClick={handleTasks}
            className="block w-full text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >Back</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default AddTask;
