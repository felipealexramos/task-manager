function Tasks () {
    const taskList = ["Tarefa 1", "Tarefa 2", "Tarefa 3"];
    const people = ['João', "Maria", "José"]
        console.log(people)   
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <ul style={{listStyleType: "none"}}>
                {taskList.map((task) => <li>{task}</li>)}
            </ul>
        </div>
    );
}

export default Tasks;