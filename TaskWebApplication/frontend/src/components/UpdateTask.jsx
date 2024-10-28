// import React, { useState, useContext } from 'react';
// import { TaskContext } from './TaskContext';

// const UpdateTask = ({ taskId }) => {
//   const { updateTask } = useContext(TaskContext);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [completed, setCompleted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateTask(taskId, { title, description, completed });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Title:</label>
//       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <label>Description:</label>
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//       <label>Completed:</label>
//       <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
//       <button type="submit">Update Task</button>
//     </form>
//   );
// };

// export default UpdateTask;
