import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  const addTodo = async () => {
    setLoading(true);
    try{
    const response = await axios.post(
      `${baseUrl}/api/todos`,
      {
        title,
        description,
      },
      {
        withCredentials: true,
      }
    );

    setTitle("");
    setDescription("");
    navigate("/todos");
    alert(response.data.message);
  }catch (error) {
    setLoading(false);
    alert(error?.response?.data?.message);
  } finally {
    setLoading(false);
  }  
} 
  

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 border rounded-lg shadow-lg p-6 bg-white">
      <div className="text-3xl font-bold text-center text-gray-700 m-7">
        Add New Task
      </div>
      <div className="flex flex-col gap-4 justify-center">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-300 ease-in-out w-full"
            onClick={addTodo}
          >
            {loading ? "Loading..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
