function addOrUpdateTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;
    const task = {
        title,
        description,
        dueDate,
        priority,
        status,
    };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const editIndex = document.getElementById("editIndex").value;
    if (editIndex !== "") {
        tasks[editIndex] = task;
        document.getElementById("editIndex").value = "";
    } else {
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    document.getElementById("taskForm").reset();
}

function resetForm() {
    document.getElementById("taskForm").reset();
    document.getElementById("editIndex").value = "";
    resetTaskList();
}

function resetTaskList() {
    localStorage.removeItem("tasks");
    displayTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const editedTask = tasks[index];
    document.getElementById("title").value = editedTask.title;
    document.getElementById("description").value = editedTask.description;
    document.getElementById("dueDate").value = editedTask.dueDate;
    document.getElementById("priority").value = editedTask.priority;
    document.getElementById("category").value = editedTask.category;
    document.getElementById("status").value = editedTask.status;
    document.getElementById("editIndex").value = index;
}

function filterTasks() {
    const filterStatus = document.getElementById("filterStatus").value;
    displayTasks(filterStatus);
}

function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case "high":
            return "priority-high";
        case "medium":
            return "priority-medium";
        case "low":
            return "priority-low";
        default:
            return "";
    }
}

function displayTasks(filterStatus = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        if (filterStatus === "all" || task.status === filterStatus) {
            const li = document.createElement("li");
            li.classList.add(getPriorityClass(task.priority));
            li.innerHTML = ` <strong>${task.title}</strong> - <span class="task-description">${task.description}</span><br> <strong>Due Date:</strong> <span class="task-due-date">${task.dueDate}</span><br> <strong>Priority:</strong> <span class="task-priority task-prority-high">${task.priority}</span><br> <strong>Status:</strong> ${task.status}<br> <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button> <button onclick="removeTask(${index})"><i class="fas fa-trash-alt"></i></button> `;
            taskList.appendChild(li);
        }
    });
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
displayTasks();