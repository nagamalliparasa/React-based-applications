import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { TaskContext, TaskProvider } from './components/taskContext';
import TaskManager from './components/TaskManager';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';
import ViewTask from './components/ViewTask';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/updatetask" element={<EditTask />} />
          <Route path="/viewtask" element={<ViewTask />} />
          
        </Routes>

      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
