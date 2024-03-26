"use client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../themeContext";
import CompleteButton from "./completeButton";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}


export default function TaskItem({task, setTaskList}: TaskItemProps) {
    const theme = useContext(ThemeContext);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const modifyTask = () => {
        setIsCompleted(!isCompleted);
        setTaskList((tasks) => {
            const taskIndex = tasks.findIndex(item => item.id == task.id);
            const newTask = {...task, isCompleted: isCompleted}
            tasks[taskIndex] = newTask;
            return tasks;
        });
    }

    const handleDelete = (e: React.SyntheticEvent) => {
        e.stopPropagation();
         setTaskList((tasks) => {
            const taskIndex = tasks.findIndex(item => item.id == task.id);
            console.log(tasks.splice(taskIndex, 1));
            console.log(tasks)
            return tasks;
        });
    }

    return (
        <>
            <div className={`${theme ? "bg-white" : "bg-darkBlue"} p-4 lg:p-5 flex items-center gap-3`}>
                <CompleteButton isCompleted={isCompleted} modifyTask={modifyTask}/>
                <p className={`text-regular flex-auto truncate max-w-[90%] ${theme ? "text-dark" : isCompleted ? "text-darkFade" : "text-darkLight"} font-normal flex-1 ${isCompleted && (theme ? "line-through text-lightGray" : "line-through text-darkFade")}`} >{task.text}</p>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-[24px] h-6 flex-shrink-0 flex-grow-0 cursor-pointer ${theme ? "text-grayish" : "text-dark"}`}>
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </div>
        </>
    )
}