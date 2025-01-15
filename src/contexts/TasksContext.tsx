import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../entities/Task";
import { tasksService } from "../services/api";

export interface TasksContextData {
    tasks: Task[],
    createTask: (attributes: Omit<Task, "id">) => Promise<void>,
    updateTask: (id: number, attributes: Omit<Task, "id">) => Promise<void>,
    deleteTask: (id: number) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData);

interface TasksContextProvaiderProps {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksContextProvaiderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        tasksService.fetchTasks().then((data) => {
            setTasks(data);
        })
    }, [])

    const createTask = async (atrributes: Omit<Task, "id">) => {
        const newTask = await tasksService.createTask(atrributes);
        setTasks((currentState) => {
            const updatedTasks = [...currentState, newTask];
            return updatedTasks;
        })
        return newTask;
    }

    const updateTask = async (id: number, attributes: Partial<Omit<Task, "id">>) => {

    }

    const deleteTask = async (id: number) => {

    }
    return (
        <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask }} >
            {children}
        </TasksContext.Provider>
    )
}