"use client";
import React, { useContext, useState } from "react";
import CompleteButton from "./completeButton";
import { ThemeContext } from "../themeContext";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TaskFormProps {
    tasksList: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskForm({tasksList, setTaskList}: TaskFormProps) {
    const theme = useContext(ThemeContext);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            text: {value: string};
        }
        if (target.text.value !== "") {
            const task : Task = {
                id : new Date().getUTCMilliseconds(),
                text: target.text.value,
                isCompleted: isCompleted
            }
            setTaskList([task, ...tasksList])
            setIsCompleted(false);
            target.text.value = "";
        }
    }
    const modifyTask = () => {
        setIsCompleted(!isCompleted);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${theme ? "bg-white" : "bg-darkBlue"} rounded-[5px] p-4 lg:p-5 flex items-center gap-3`}>
                <CompleteButton isCompleted={isCompleted} modifyTask={modifyTask}/>
                <input placeholder="Create a new todo..." type="text" name="text" className={`${!theme && "bg-darkBlue text-darkGray"} text-regular text-grayish font-normal flex-1 outline-none`} />
            </form>
        </>
    )
}