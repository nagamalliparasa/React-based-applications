import React, { useState,useContext } from 'react';
import { TaskContext } from './taskContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const EditTask = ({item,onClose}) => {
  const { updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [completed, setCompleted] = useState(item.completed);

  const navigate=useNavigate();

  const id=item.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask({ id,title, description, completed });
    onClose();
    navigate('/tasks')
  };




  return (
    <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h1 className='text-4xl font-bold mb-4 text-center'>Edit Task Here</h1>
      <form onSubmit={handleSubmit}>
        <label className=" block text-gray-700 mb-2 ">Title:</label>
        <input type="text" value={title} 
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label className=" block text-gray-700 mb-2 ">Description:</label>
        <textarea value={description} 
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)} />
          <br />
        <label className=" text-gray-700 mb-2 pr-3">Completed:</label>
        <input type="checkbox" checked={completed} 
        onChange={() => setCompleted(!completed)} />
        <button type="submit"
            className="block w-1/2 text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;


