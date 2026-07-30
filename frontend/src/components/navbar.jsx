import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;