import { useContext } from "react";
import TaskItem from "./taskItem";
import { ThemeContext } from "../themeContext";

interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TaskTableProps {
    tasksList: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskTable({tasksList, setTaskList}: TaskTableProps) {
    const theme = useContext(ThemeContext);

    const clearCompleted = () => {
        const newList = [...tasksList].filter(task => !task.isCompleted)
        setTaskList(newList);
    }

    return (
        <>
            <div className={`bg-white rounded-[5px] flex gap-[1px] flex-col shadow-xl overflow-hidden"}`}>
                {tasksList.map(task => <TaskItem key={task.id} task={task} setTaskList={setTaskList}/>)}
                <div className={`${theme ? "bg-white" : "bg-darkBlue"} p-4 flex items-center justify-between gap-3 rounded-[5px]`}>
                    <p className={`${theme ? "text-grayish" : "text-darkFade"}`}>{[...tasksList].filter((task) => !task.isCompleted).length} items left</p>
                    <p onClick={() => clearCompleted()} className={`${theme ? "text-grayish" : "text-darkFade"} cursor-pointer`}>Clear Completed</p>
                </div>
            </div>

        </>
    )
}