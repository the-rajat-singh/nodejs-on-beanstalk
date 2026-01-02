import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!title) return;

    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    setTasks([...tasks, { title }]);
    setTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DevTrack Lite</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

