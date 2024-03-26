import { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import TaskTable from "./taskTable";
import TaskFilter from "./taskFilter";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

export default function TaskManager() {
    const [taskList, setTaskList] = useState<Array<Task>>([]);
    useEffect(() => {
        const tasks: Array<Task> = [
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
        ];
        setTaskList(tasks)
    }, [])

    return (
        <>
            <div className={`flex gap-5 flex-col shadow-xl overflow-hidden"}`}>
                <TaskForm tasksList={taskList} setTaskList={setTaskList}/>
                <TaskTable tasksList={taskList} setTaskList={setTaskList}/>
            </div>
            <TaskFilter />
        </>
    )
}