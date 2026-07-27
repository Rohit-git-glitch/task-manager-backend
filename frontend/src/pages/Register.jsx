import API from "../services/api";
import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await API.post("/users/register", formData);

    console.log(response.data);

    alert("Registration successful");

  } catch (error) {

    console.log(error.response?.data || error.message);

    alert("Registration failed");

  }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>


        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />


        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />


        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;