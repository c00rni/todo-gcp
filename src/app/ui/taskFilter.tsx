import React, { useContext } from "react";
import { ThemeContext } from "../themeContext";

type Status = "ALL" | "ACTIVE" | "COMPLETED";

interface TaskFilterProps {
    status: Status;
    onStatusChange: React.Dispatch<React.SetStateAction<Status>>
    className?: string;
}

export default function TaskFilter({status, onStatusChange, className}: TaskFilterProps) {
    const theme = useContext(ThemeContext);
    return (
        <>
            <div className={`${theme ? "bg-white text-grayish" : "bg-darkBlue text-darkFade"} rounded-[5px] font-bold ${className}`}>
                <div className="flex gap-5 justify-center items-center">
                    <p className={`cursor-pointer ${status === "ALL" && "text-active"}`} onClick={() => onStatusChange("ALL")}>All</p>
                    <p className={`cursor-pointer ${status === "ACTIVE" && "text-active"}`} onClick={() => onStatusChange("ACTIVE")}>Active</p>
                    <p className={`cursor-pointer ${status === "COMPLETED" && "text-active"}`} onClick={() => onStatusChange("COMPLETED")}>Completed</p>
                </div>
            </div>
        </>
    )
}