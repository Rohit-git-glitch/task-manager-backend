import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import API from "../services/api";

function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const[tasks , setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");

      setTasks(response.data.data.tasks);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

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
      fetchTasks();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

const handleAddTask = async (task) => {
  try {
    await API.post("/tasks", task);
    fetchTasks();

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
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        My Tasks
      </h2>

    {
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >

        <h3 className="text-xl font-bold">
          {task.title}
        </h3>

        <p className="text-gray-600">
          {task.description}
        </p>

      </div>
    ))
  }

  </div>

    </div>
  </>
);
}

export default Dashboard;