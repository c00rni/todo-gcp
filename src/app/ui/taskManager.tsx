import { useState } from "react";
import TaskForm from "./taskForm";
import TaskTable from "./taskTable";
import TaskFilter from "./taskFilter";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

type Status = "ALL" | "ACTIVE" | "COMPLETED";

export default function TaskManager() {
    const [taskList, setTaskList] = useState<Array<Task>>([
            {
                id: 7,
                text: "Complete online javascript course",
                isCompleted: true
            },
            {
                id: 1,
                text: "Jog around the park 3x",
                isCompleted: false
            },
            {
                id: 2,
                text: "10 minutes mediation",
                isCompleted: false
            },
            {
                id: 3,
                text: "Read for 1 hour",
                isCompleted: false
            },
            {
                id:4,
                text: "Pick up groceries",
                isCompleted: false
            },
            {
                id:5,
                text: "Complete Todo App on Frontend Mentor",
                isCompleted: false
            }
    ]);
    const [filterStatus, setFilterStatus] = useState<Status>("ALL");

    return (
        <>
            <div className={`flex gap-5 flex-col shadow-xl overflow-hidden"}`}>
                <TaskForm onTaskSubmit={setTaskList}/>
                <TaskTable filter={filterStatus} tasksList={taskList} onTasksChange={setTaskList} onStatusChange={setFilterStatus}/>
            </div>
            <TaskFilter status={filterStatus} onStatusChange={setFilterStatus} className="shadow-lg lg:hidden p-4"/>
       </>
    )
}