import { Route, Router, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import TodoDetails from "./pages/TodoDetails";
import NotFound from "./pages/NotFound";
import Cookies from "js-cookie";

function App() {
  function PrivateRoute({ children }) {
    const token = Cookies.get("token");
    return token ? children : <Navigate to="/" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
        <Route
          path="/addTodo"
          element={
            <PrivateRoute>
              <AddTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/todoDetails/:id"
          element={
            <PrivateRoute>
              <TodoDetails />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  );
}

export default App;
