import Tasks from "./components/Tasks"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="flex gap-9">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
