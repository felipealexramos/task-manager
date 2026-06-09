import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { lazy } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import RootLayout from "./components/RootLayout.jsx"
import RouteError from "./components/RouteError.jsx"

const HomePage = lazy(() => import("./pages/Home.jsx"))
const TasksPage = lazy(() => import("./pages/Tasks.jsx"))
const TaskDetailsPage = lazy(() => import("./pages/TaskDetails.jsx"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min — dados mudam pouco; transição entre telas fica instantânea
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
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
    ],
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
