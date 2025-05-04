import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TodoDetails = () => {

    const { id } = useParams();
  const [todo, setTodo] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const response = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/todos/${id}`, {
                withCredentials: true,
            });
            setTodo(res.data.data);
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    }
    response();
  }, [id]);
  return (
    <div>
        <h1 className="text-5xl text-center m-5 font-medium">Todo Details</h1>
        <div className="flex flex-col justify-center items-start w-full h-auto p-5 gap-4">
                {todo && (
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 bg-slate-300 rounded-3xl" key={todo?._id}>
                <div className="text-3xl font-bold text-center text-gray-700 m-7 border-b-2 border-black pb-3">
                    {todo?.title}
                </div>
                <div className="text-lg text-gray-600 mx-7 mb-4">
                    {todo?.description}
                </div>
            </div>
                )}
        </div>
    </div>
  )
}

export default TodoDetails;