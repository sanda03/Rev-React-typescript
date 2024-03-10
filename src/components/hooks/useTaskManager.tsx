import { useState } from "react";
import { nanoid } from "nanoid";

export type Task = {
  id: string,
  title: string
}

export function useTaskManager(){
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (id: Task["id"]) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const updateTask = (id: Task["id"], taskUpdate: Task) => {
    const newTasks = tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    newTasks[index] = taskUpdate;
    setTasks(newTasks);
  };

  const addTask = (title: Task["title"]) => {
    if (title.length < 1) {
      return;
    }

    const newTask = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
  };

  const getFilteredTask = (title: Task["title"]) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    getFilteredTask,
    deleteTask
  };
}
