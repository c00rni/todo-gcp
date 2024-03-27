"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../themeContext";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
    onChange: React.Dispatch<React.SetStateAction<Array<Task>>>;
}


export default function TaskItem({task, onChange}: TaskItemProps) {
    const theme = useContext(ThemeContext);

    const modifyTask = () => {
        onChange((tasks) => {
            const taskIndex = tasks.findIndex(item => item.id == task.id);
            const newTask = {...task, isCompleted: !task.isCompleted}
            tasks[taskIndex] = newTask;
            return  [...tasks];
        });
    }

    const handleDelete = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        onChange((tasks) => {
            const taskIndex = tasks.findIndex(item => item.id == task.id);
            tasks.splice(taskIndex, 1);
            return [...tasks];
        });
    }

    return (
        <>
            <div className={`${theme ? "bg-white" : "bg-darkBlue"} p-4 lg:p-5 flex items-center gap-3 rouneded-t-[5px]`}>
                <div className={`${!theme && "bg-darkBlue"} rounded-full flex flex-shrink-0 items-center justify-center z-10 cursor-pointer ${task.isCompleted ? "bg-gradient-to-br from-cyan-300 to-purple-500" : (theme ? "border border-gray-400" : "border border-darkLine")} w-[20px] h-[20px]`} onClick={modifyTask}>
                    {task.isCompleted && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path stroke="white" strokeWidth="1.8" fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    )}
                </div>

                <p className={`text-regular flex-auto truncate max-w-[90%] ${theme ? "text-dark" : task.isCompleted ? "text-darkFade" : "text-darkLight"} font-normal flex-1 ${task.isCompleted && (theme ? "line-through text-lightGray" : "line-through text-darkFade")}`} >{task.text}</p>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-[24px] h-6 flex-shrink-0 flex-grow-0 cursor-pointer ${theme ? "text-grayish" : "text-dark"}`}>
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </div>
        </>
    )
}