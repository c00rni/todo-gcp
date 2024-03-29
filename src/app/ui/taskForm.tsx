"use client";
import React, { useContext, useState } from "react";
import CompleteButton from "./completeButton";
import { ThemeContext } from "../themeContext";
import { updateTasks } from "../firebase/firebase";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TaskFormProps {
    onTaskSubmit: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskForm({onTaskSubmit}: TaskFormProps) {
    const theme = useContext(ThemeContext);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            text: {value: string};
        }
        if (target.text.value !== "") {
            const newtask : Task = {
                id : new Date().getUTCMilliseconds(),
                text: target.text.value,
                isCompleted: isCompleted
            }
            onTaskSubmit((tasks) => {
                const newList = [newtask, ...tasks];
                updateTasks(newList)
                return newList;
            });
            setIsCompleted(false);
            target.text.value = "";
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${theme ? "bg-white" : "bg-darkBlue"} rounded-[5px] p-4 lg:p-5 flex items-center gap-3`}>
                <CompleteButton isCompleted={isCompleted} modifyTask={() => setIsCompleted(!isCompleted)}/>
                <input placeholder="Create a new todo..." type="text" name="text" className={`${!theme && "bg-darkBlue text-darkGray"} text-regular text-grayish font-normal flex-1 outline-none`} />
            </form>
        </>
    )
}