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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      let url = `/tasks?page=${page}&limit=5`;

      url += `&search=${search}`;

      if (filter !== "all") {
        url += `&completed=${filter === "completed"}`;
      }

      url += `&sort=${sort}`;

      const response = await API.get(url);

      setTasks(response.data.data.tasks);

      setTotalPages(response.data.data.pagination.totalPages);

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
  }, [token , search , filter , sort , page]);

  useEffect(() => {
    setPage(1);
  }, [search, filter, sort]);

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

  const handleToggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();

    } catch (error) {
      console.log(error.response?.data || error.message);
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

       <input
         type="text"
         placeholder="Search tasks..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="w-full border rounded px-4 py-2 mb-6"
       />

       <div className="flex gap-3 mb-6">

         <button
           onClick={() => setFilter("all")}
           className="bg-blue-600 text-white px-4 py-2 rounded"
         >
           All
         </button>

         <button
           onClick={() => setFilter("completed")}
           className="bg-green-600 text-white px-4 py-2 rounded"
         >
           Completed
         </button>

         <button
           onClick={() => setFilter("pending")}
           className="bg-yellow-500 text-white px-4 py-2 rounded"
         >
           Pending
         </button>

       </div>
       <div className="flex gap-3 mb-6">

         <button
           onClick={() => setSort("latest")}
           className="bg-purple-600 text-white px-4 py-2 rounded"
         >
           Latest
         </button>

         <button
           onClick={() => setSort("oldest")}
           className="bg-gray-600 text-white px-4 py-2 rounded"
         >
           Oldest
         </button>

       </div>
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


                <div className="mt-3">
                  <span className="text-sm">
                    Status:
                  </span>

                  <span
                    className={
                      task.completed
                        ? "text-green-600 font-bold ml-2"
                        : "text-yellow-600 font-bold ml-2"
                    }
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
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

  <button
    onClick={() => handleToggleComplete(task)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
  {task.completed ? "Mark Pending" : "Complete"}
  </button>

</div>


    </div>

      </div>
    ))
  }
         <div className="flex justify-center items-center gap-4 mt-8">

           <button
             onClick={() => setPage(page - 1)}
             disabled={page === 1}
             className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
           >
             Previous
           </button>

           <span className="font-semibold">
             Page {page} of {totalPages}
           </span>

           <button
             onClick={() => setPage(page + 1)}
             disabled={page === totalPages}
             className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
           >
             Next
           </button>

         </div>

  </div>

    </div>
  </>
);
}

export default Dashboard;