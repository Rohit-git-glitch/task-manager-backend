import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />

      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">
          Welcome to Dashboard
        </h1>
      </div>
    </>
  );
}

export default Dashboard;