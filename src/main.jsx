import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import HomePage from "./pages/Home.jsx"
import TaskDetailsPage from "./pages/TaskDetails.jsx"
import TasksPage from "./pages/Tasks.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
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
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
