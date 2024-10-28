// TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const {email}=useContext(AuthContext);

  const navigate=useNavigate();
  const fetchTasks = async() => {

    try {
      const response = await fetch('http://127.0.0.1:8000/tasks-list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure JSON content type
        },
        body: JSON.stringify({ 
          email: email
        }),
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  useEffect(() =>{
    if (email) {
      fetchTasks();
    }
  }, [email]);

  const addTask = async ({ title, description, completed }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/add-task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure JSON content type
        },
        body: JSON.stringify({ 
          title:title,
          description:description,
          completed:completed,
          email:email
        }),
      });
      const data = await response.json();
      console.log(data);
      setTasks(data);
      navigate('/tasks');
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    
  };

  const updateTask = async ({ id,title, description, completed }) => {
    //fetching task with id 
    try {
      const response = await fetch('http://127.0.0.1:8000/update-task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure JSON content type
        },
        body: JSON.stringify({ 
          title:title,
          description:description,
          completed:completed,
          id:id,
          email:email
        }),
      });
      const data = await response.json();
      console.log(data);
      setTasks(data);
      navigate('/tasks');
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }

  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/delete/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refetch the tasks or update the state to reflect deletion
          fetchTasks();
          alert('Task deleted successfully!');
        } else {
          const data = await response.json();
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete the task.');
      }
    }
    navigate('/tasks');
  };

  return (
    <TaskContext.Provider value={{ tasks,fetchTasks, addTask, updateTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
