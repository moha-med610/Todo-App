import React, { useEffect, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/todos`, {
        withCredentials: true,
      });
      setTasks(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error?.response?.data?.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/todos/${id}`, {
        withCredentials: true,
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <main className="h-screen w-screen flex justify-center bg-slate-200 overflow-x-hidden">
  <div className="w-full max-w-6xl p-6">
    

    <div className="flex justify-end mb-4">
      <AddTaskButton />
    </div>

    <div className="flex justify-center w-full backdrop-blur-lg rounded-2xl">
      <h1 className="text-5xl m-5 font-medium">My Tasks</h1>
    </div>

    <div className="flex flex-col justify-center items-start w-full h-auto p-5 gap-4">
      {tasks.length === 0 ? (
        <p className="text-center w-full text-gray-600 text-xl mt-10">No tasks available.</p>
      ) : (
        tasks.map((t) => (
          <div
            key={t._id}
            className="bg-white/50 rounded-2xl shadow-lg p-4 w-full backdrop-blur-xl hover:translate-x-2 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <Link to={`/todoDetails/${t._id}`} className="block">
            <div className="flex flex-col gap-2">
              <h2 className="lg:text-2xl md:text-2xl sm:text-sm font-bold text-gray-700 truncate">
                {t.title}
              </h2>
              <p className="text-gray-700 text-sm line-clamp-1">
                {t.description}
              </p>
            </div>
            </Link>
            <div className="flex justify-end items-center gap-2 mt-4">
              <button
                aria-label={`Delete ${t.title}`}
                onClick={() => {
                  const confirmDelete = window.confirm(
                    `Are you sure you want to delete ${t.title.toUpperCase()}?`
                  );
                  if (confirmDelete) {
                    deleteTask(t._id);
                  }
                }}
                className="text-red-600 hover:bg-slate-300 text-2xl font-bold bg-slate-200 rounded-2xl p-2"
              >
                <MdDelete />
              </button>

              <button
                aria-label={`Edit ${t.title}`}
                onClick={() => navigate(`/edit/${t._id}`)}
                className="text-black text-2xl font-bold bg-slate-200 hover:bg-slate-300 rounded-2xl p-2"
              >
                <MdEdit />
              </button>
            </div>
            
          </div>
        ))
      )}
    </div>
  </div>
</main>

    </>
  );
};

export default Todo;
