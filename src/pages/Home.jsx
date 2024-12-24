import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false); // Add Task modal state
  const [taskName, setTaskName] = useState(""); // Task name
  const [taskDate, setTaskDate] = useState(""); // Task date

  const navigate = useNavigate();

  // Handle Add Task logic
  const handleAddTask = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
    //  alert("You must be logged in to add tasks.");
      return;
    }

    const newTask = {
      name: taskName,
      date: taskDate,
      status: "Pending",
      userId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        alert("Task added successfully!");
        setShowModal(false);
        setTaskName("");
        setTaskDate("");

        // Redirect to View Tasks page after saving
        navigate("/tasks");
      } else {
      //  alert("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 flex flex-col items-center justify-center text-white">
      {/* Header Section */}
      <h1 className="text-5xl font-bold mb-10 text-center tracking-wider">
        Welcome to <span className="text-purple-400">Task Manager</span>
      </h1>

      {/* Log Out Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
      >
        Log Out
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
        {/* Add Task Button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-10 py-6 rounded-lg shadow-lg hover:scale-105 hover:bg-blue-600 transition-all"
        >
          <span className="text-xl font-semibold">➕ Add Task</span>
        </button>

        {/* View Tasks Button */}
        <button
          onClick={() => navigate("/tasks")}
          className="bg-green-500 text-white px-10 py-6 rounded-lg shadow-lg hover:scale-105 hover:bg-green-600 transition-all"
        >
          <span className="text-xl font-semibold">📋 View Tasks</span>
        </button>

        {/* Completed Tasks Button */}
        <button
          onClick={() => navigate("/completed")}
          className="bg-purple-500 text-white px-10 py-6 rounded-lg shadow-lg hover:scale-105 hover:bg-purple-600 transition-all"
        >
          <span className="text-xl font-semibold">✅ Completed Tasks</span>
        </button>
      </div>

      {/* Modal for Adding Task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Add New Task
            </h2>
            <form onSubmit={handleAddTask}>
              {/* Task Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter task name"
                  required
                />
              </div>

              {/* Task Date Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Task Date
                </label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Save Task
              </button>
            </form>

            {/* Cancel Button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
