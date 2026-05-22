import "./index.css"

import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App.jsx"
import TaskDetailsPage from "./pages/task-details.jsx"

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
    <Toaster
      toastOptions={{
        style: {
          color: "#35383E",
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
)
