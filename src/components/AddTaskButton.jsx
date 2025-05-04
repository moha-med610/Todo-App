import React from 'react'
import { Link } from 'react-router-dom'
import { FcTodoList } from "react-icons/fc";

const AddTaskButton = () => {
  return (
    <div className="flex justify-end">
          <Link
            to="/addTodo"
            className="flex items-center gap-2 bg-opacity-70 bg-lime-700 p-2 rounded-2xl m-2 text-white hover:bg-lime-800 hover:scale-95 transition-all font-medium"
          >
            <FcTodoList className="text-2xl" />
            Add New Task
          </Link>
        </div>
  )
}

export default AddTaskButton
