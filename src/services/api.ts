import { Task } from "../entities/Task";

export const tasksService = {
    async fetchTasks(): Promise<Task[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const data = await response.json();
        return data;
    }
}