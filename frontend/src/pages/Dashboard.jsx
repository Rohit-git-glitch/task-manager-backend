import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import API from "../services/api";

function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const[tasks , setTasks] = useState([]);

  const[editingTask , setEditingTask] = useState(null);

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

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await API.put(`/tasks/${id}`, updatedTask);

      fetchTasks();

      setEditingTask(null);

      alert("Task updated successfully");

    } catch (error) {
      console.log(error.response?.data || error.message);

      alert("Failed to update task");
    }
  };


  //! Function Used to delete Task
  const handleDeleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);

    fetchTasks();

    alert("Task deleted successfully");

  } catch (error) {
    console.log(error.response?.data || error.message);

    alert("Failed to delete task");
  }
  };

  //! Editing the Task i.e Updating
  const handleEditTask = (task) => {
  console.log(task);
  setEditingTask(task);
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

    <TaskForm 
      onAddTask={handleAddTask} 
      onUpdateTask={handleUpdateTask}
      editingTask={editingTask}
      
      
    />
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

            <div className="flex justify-between items-start">

      <div>
        <h3 className="text-xl font-bold">
          {task.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>
    </div>

  <div className="flex gap-2">

  <button
    onClick={() => handleEditTask(task)}
    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  >
    Edit
  </button>

  <button
    onClick={() => handleDeleteTask(task._id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete
  </button>

</div>

    </div>

      </div>
    ))
  }

  </div>

    </div>
  </>
);
}

export default Dashboard;