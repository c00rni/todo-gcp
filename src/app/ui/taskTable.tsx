import React, { useContext, useId, useState } from "react";
import TaskItem from "./taskItem";
import { ThemeContext } from "../themeContext";
import TaskFilter from "./taskFilter";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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

    const handleDragEnd = (event:any) => {
        const {active, over} = event;
        let newList;
        if (active.id !== over.id) {
            onTasksChange((tasks) => {
                const activeIndex = tasks.findIndex(task => task.id == active.id);
                const overIndex = tasks.findIndex(task => task.id == over.id);

                newList = arrayMove(tasks, activeIndex, overIndex);
                return [...newList];
            });
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 8,
            },
        })
    )

    const id = useId();

    return (
        <>
            <div className={`${theme ? "bg-white" : "bg-darkBlue"} rounded-[5px] flex gap-[1px] flex-col shadow-xl overflow-hidden"}`}>
                <DndContext id={id} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={createList()} strategy={verticalListSortingStrategy}>
                        {createList().map(task => <TaskItem key={task.id} task={task} onChange={onTasksChange}/>)}
                    </SortableContext>
                </DndContext>
                <div className={`${theme ? "bg-white" : "bg-darkBlue"} p-4 flex items-center justify-between gap-3 rounded-[5px]`}>
                    <p className={`${theme ? "text-grayish" : "text-darkFade"}`}>{createList().filter((task) => !task.isCompleted).length} items left</p>
                    <TaskFilter onStatusChange={onStatusChange} status={filter} className={`hidden lg:inline-block`}/>
                    <p onClick={() => clearCompleted()} className={`${theme ? "text-grayish" : "text-darkFade"} cursor-pointer`}>Clear Completed</p>
                </div>
            </div>

        </>
    )
}