interface Task {
  text: string;
  done: boolean;
}


const TaskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const TaskList = document.getElementById("taskList") as HTMLUListElement;

let Tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
let EditingIndex: number | null = null;

function SaveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function RenderTasks() {
  TaskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.done) span.classList.add("done");

    const editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = () => {
      TaskInput.value = task.text;
      addBtn.innerText = "Update";
      editingIndex = index;
    };

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✔️";
    doneBtn.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    TaskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const taskText = TaskInput.value.trim();
  if (!taskText) return;

  if (addBtn.innerText === "Update" && editingIndex !== null) {
    tasks[editingIndex].text = taskText;
    editingIndex = null;
    addBtn.innerText = "Add";
  } else {
    tasks.push({ text: taskText, done: false });
  }

  TaskInput.value = "";
  saveTasks();
  renderTasks();
};

renderTasks();
