import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTodo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/todos/${id}`, {
          withCredentials: true,
        });
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
      } catch (err) {
        setError('Failed to load task data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const task = { title, description }; 
    try {
      const response = await axios.put(`${baseURL}/api/todos/${id}`, task, {
        withCredentials: true,
      });
      if (response.status >= 200 && response.status < 300) {
        alert('Task updated successfully!');
        navigate('/todos'); 
      } else {
        throw new Error('Failed to update task');
      }
    } catch (err) {
      if(description.length < 3 || title.length < 3) {
        setError(" must be at least 3 characters long.");
      }else{
        setError('Failed to update task. Please try again.');
      }
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; 
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg m-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Todo</h1>
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSave}>
        <div className="mb-4">
          <input
            placeholder="Title"
            id="title"
            type="text"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1 p-2 w-full border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Description"
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="mt-1 p-2 w-full border rounded-lg"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
