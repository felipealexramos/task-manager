import Tasks from "./components/Tasks"
import Header from "./components/Header"

function App() {
  return (
    <div>
      <h1 className="text-red-500">Task Manager</h1>
      <Header />
      <Tasks />
    </div>
  )
}

export default App
