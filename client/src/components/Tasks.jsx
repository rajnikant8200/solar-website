import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './TaskSection.css';

const TaskSection = () => {
  const [taskData, setTaskData] = useState({
    name: '',
    due: '',
    customer: '',
    assignee: '',
    label: '',
  });

  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Status modal states
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const statusOptions = ['Pending', 'In Progress', 'Completed'];
  const [newStatus, setNewStatus] = useState('Pending');

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { ...taskData, completed: false, status: 'Pending' };

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(res => res.json())
      .then((savedTask) => {
        setTasks(prev => [...prev, savedTask]);
        setTaskData({ name: '', due: '', customer: '', assignee: '', label: '' });
        setIsFormVisible(false);
      })
      .catch(err => console.error('Error saving task:', err));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Toggle completed status and update backend
  const toggleTaskCompleted = async (taskId, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await res.json();

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Could not update task status. Please try again.');
    }
  };

  // Open modal for editing status
  const openStatusModal = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status || (task.completed ? 'Completed' : 'Pending'));
    setIsStatusModalVisible(true);
  };

  // Update status in backend
  const updateTaskStatus = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${selectedTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      const updatedTask = await res.json();

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );

      setIsStatusModalVisible(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Could not update status. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="task-header">
          <h2>Tasks</h2>
          <button className="add-task-btn" onClick={toggleFormVisibility}>
            + Add Task
          </button>
        </div>

        {isFormVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add Task</h2>
              <form className="modal-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Task Name"
                  value={taskData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="datetime-local"
                  name="due"
                  value={taskData.due}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="customer"
                  placeholder="Customer"
                  value={taskData.customer}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="assignee"
                  placeholder="Assignee"
                  value={taskData.assignee}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="label"
                  placeholder="Label"
                  value={taskData.label}
                  onChange={handleChange}
                  required
                />
                <div className="modal-buttons">
                  <button type="submit" className="btn-blue">
                    Add
                  </button>
                  <button type="button" className="btn-red" onClick={toggleFormVisibility}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Due</th>
              <th>Customer</th>
              <th>Assignee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => toggleTaskCompleted(task._id, task.completed)}
                  />
                  {task.name} <span className="label-tag">{task.label}</span>
                </td>
                <td>{new Date(task.due).toLocaleString()}</td>
                <td>{task.customer}</td>
                <td>{task.assignee}</td>
                <td
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={() => openStatusModal(task)}
                >
                  {task.status || (task.completed ? 'Completed' : 'Pending')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Status Edit Modal */}
        {isStatusModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Project Status</h2>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="modal-buttons">
                <button className="btn-blue" onClick={updateTaskStatus}>Update</button>
                <button className="btn-red" onClick={() => setIsStatusModalVisible(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSection;
