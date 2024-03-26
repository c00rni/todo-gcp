import { useContext } from "react";
import { ThemeContext } from "../themeContext";

export default function TaskFilter() {
    const theme = useContext(ThemeContext);
    return (
        <>
            <div className={`${theme ? "bg-white text-grayish" : "bg-darkBlue text-darkFade"} p-4 shadow-lg rounded-[5px] font-bold`}>
                <div className="flex gap-5 justify-center items-center">
                    <p className={`cursor-pointer ${status === "ALL" && "text-active"}`}>All</p>
                    <p className={`cursor-pointer ${status === "ACTIVE" && "text-active"}`}>Active</p>
                    <p className={`cursor-pointer ${status === "COMPLETED" && "text-active"}`}>Completed</p>
                </div>
            </div>
        </>
    )
}