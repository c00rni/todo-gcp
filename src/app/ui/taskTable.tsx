import { useContext, useState } from "react";
import TaskItem from "./taskItem";
import { ThemeContext } from "../themeContext";
import TaskFilter from "./taskFilter";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

type Status = "ALL" | "ACTIVE" | "COMPLETED";

interface TaskTableProps {
    filter: Status;
    tasksList: Array<Task>;
    onTasksChange: React.Dispatch<React.SetStateAction<Array<Task>>>;
    onStatusChange: React.Dispatch<React.SetStateAction<Status>>;
}


export default function TaskTable({filter, tasksList, onTasksChange, onStatusChange}: TaskTableProps) {
    const theme = useContext(ThemeContext);

    const clearCompleted = () => {
        const newList = tasksList.filter(task => !task.isCompleted)
        onTasksChange(newList);
    }

    const createList = () => {
        if (!tasksList) return [];
        const tasks = tasksList.filter(task => {
            switch(filter) {
                case "COMPLETED":
                    return task.isCompleted;
                case "ACTIVE":
                    return task.isCompleted === false;
                default:
                    return true;
            }
        });
        return [...tasks]
    }

    return (
        <>
            <div className={`${theme ? "bg-white" : "bg-darkBlue"} rounded-[5px] flex gap-[1px] flex-col shadow-xl overflow-hidden"}`}>
                {createList().map(task => <TaskItem key={task.id} task={task} onChange={onTasksChange}/>)}
                <div className={`${theme ? "bg-white" : "bg-darkBlue"} p-4 flex items-center justify-between gap-3 rounded-[5px]`}>
                    <p className={`${theme ? "text-grayish" : "text-darkFade"}`}>{createList().filter((task) => !task.isCompleted).length} items left</p>
                    <TaskFilter onStatusChange={onStatusChange} status={filter} className={`hidden lg:inline-block`}/>
                    <p onClick={() => clearCompleted()} className={`${theme ? "text-grayish" : "text-darkFade"} cursor-pointer`}>Clear Completed</p>
                </div>
            </div>

        </>
    )
}