import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import API from "../services/api";

function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/users/profile");

        setUser(response.data.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

const handleAddTask = async (task) => {
  try {
    const response = await API.post("/tasks", task);

    console.log(response.data);

    alert("Task created successfully");

  } catch (error) {
    console.log(error.response?.data || error.message);

    alert("Failed to create task");
  }
};


 return (
  <>
    <Navbar />

    <div className="max-w-4xl mx-auto mt-10 px-4">

      <h1 className="text-3xl font-bold mb-2">
        Welcome {user ? user.name : "Loading..."} 👋
      </h1>

      <p className="text-gray-600 mb-8">
        {user ? user.email : ""}
      </p>

      <TaskForm onAddTask={handleAddTask} />

    </div>
  </>
);
}

export default Dashboard;