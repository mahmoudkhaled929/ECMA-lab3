var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var editingIndex = null;
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerText = task.text;
        if (task.done)
            span.classList.add("done");
        var editBtn = document.createElement("button");
        editBtn.innerText = "✏️";
        editBtn.onclick = function () {
            taskInput.value = task.text;
            addBtn.innerText = "Update";
            editingIndex = index;
        };
        var doneBtn = document.createElement("button");
        doneBtn.innerText = "✔️";
        doneBtn.onclick = function () {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        };
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
addBtn.onclick = function () {
    var taskText = taskInput.value.trim();
    if (!taskText)
        return;
    if (addBtn.innerText === "Update" && editingIndex !== null) {
        tasks[editingIndex].text = taskText;
        editingIndex = null;
        addBtn.innerText = "Add";
    }
    else {
        tasks.push({ text: taskText, done: false });
    }
    taskInput.value = "";
    saveTasks();
    renderTasks();
};
renderTasks();
