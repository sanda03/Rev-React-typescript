import { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

type Task = {
  id: string,
  title: string
}

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // remove task from list
  const completeTask = (id: Task["id"]) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: Task["id"], taskUpdate: Task) => {
    const newTasks = tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    newTasks[index] = taskUpdate;
    setTasks(newTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { ...task, title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
