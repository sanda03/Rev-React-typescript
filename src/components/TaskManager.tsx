import { ChangeEvent, useState } from "react";
import { useTaskManager } from "./hooks/useTaskManager";
import "./TaskManager.css";

export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    getFilteredTask,
    deleteTask,
    updateTask,
    addTask
  } = useTaskManager();

  const saveTask = () => {
    setTitle("");
    addTask(title);
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = getFilteredTask(searchKeyword);

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
        <button onClick={saveTask}>Add Task</button>
      </div>
      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { id: task.id, title: e.target.value })}
              />
              <button onClick={() => deleteTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
