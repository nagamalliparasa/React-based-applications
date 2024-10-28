import React, { useState,useContext } from 'react';
import { TaskContext } from './taskContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const ViewTask = () => {
//   const { updateTask } = useContext(TaskContext);
  // const [title, setTitle] = useState(item.title);
  // const [description, setDescription] = useState(item.description);
  // const [completed, setCompleted] = useState(item.completed);
  const item = JSON.parse(localStorage.getItem('item'));
  const title=item.title;
  const description=item.description;
  
  console.log(item);
  console.log(title);
  console.log(description);

  const navigate=useNavigate();

  const id=item.id;
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // await updateTask({ id,title, description, completed });
    // onClose();
    localStorage.removeItem('item');
    navigate('/tasks');
  };




  return (
    <div>
      <Navbar />
      <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg' id={id}>
      <h1 className='text-4xl font-bold mb-4 text-center'>View Task Here</h1>
      <form onSubmit={handleSubmit} className='space-y-10'>
        <label className=" block text-gray-700 mb-5 ">Title:</label>
        <label htmlFor="" className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{title}</label>
        
        <br />
        <label className=" block text-gray-700 pb-5 ">Description:</label>
        <label htmlFor="" className="w-full px-3 py-2 my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{description}</label>
          <br />
        
        <button onClick={handleSubmit}
            className="block w-1/2 text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Back</button>
      </form>
    </div>
    
    </div>
  );
};

export default ViewTask;


