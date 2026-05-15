import "./index.css"

import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.jsx"
import TaskDetailsPage from "./pages/task-detail.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:id",
    element: <TaskDetailsPage />,
  },
  {
    path: "*",
    element: (
      <h1 className="text-center text-2xl">404 - Página não encontrada</h1>
    ),
  },
])

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
