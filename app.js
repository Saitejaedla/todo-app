let tasks = [];
let editIndex = -1;

const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('newTask');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress');
const numbers = document.getElementById('numbers');

taskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === "") return;

    if (editIndex === -1) {
        tasks.push({ text, completed: false });
    } else {
        tasks[editIndex].text = text;
        editIndex = -1;
        taskButton.textContent = "+";
    }

    taskInput.value = "";
    updateList();
});

function editTask(index) {
    taskInput.value = tasks[index].text;
    editIndex = index;
    taskButton.textContent = "✓";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateList();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateList();
}
function updateList() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})" />
                    <img src="./img/bin.png" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        li.querySelector("input").addEventListener("change", () => toggleComplete(index));
        taskList.appendChild(li);
    });

    // Update progress
    const done = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    progressBar.style.width = total ? `${(done / total) * 100}%` : "0%";
    numbers.textContent = `${done} / ${total}`;
    if (total>0 && done ===total) {
        blastconfetti();
    }
}
const blastconfetti = ()=> {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });

    }