function Tasks () {
    const taskList = ["Tarefa 1", "Tarefa 2", "Tarefa 3"];

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <ul style={{listStyleType: "none"}}>
                {taskList.map((task) => <li>{task}</li>)}
            </ul>
        </div>
    )
}

export default Tasks;