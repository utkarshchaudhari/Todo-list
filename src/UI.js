import Task from "./Task.js";
const inboxBtn = document.querySelector('.inboxBtn');
const todayBtn = document.querySelector('.todayBtn');
const weekBtn = document.querySelector('.weekBtn');
const addProject = document.querySelector('.addBtn');
const addOptions = document.querySelector('.project__add');
const cancelBtn = document.querySelector('.pinkBtn');
const details = document.getElementById("project__details");
const tasks = [];

function inboxContent() {
    const title = document.createElement("h1");
    title.classList.add("page__title");
    title.textContent = "Inbox";

    const list = document.createElement("div");
    list.classList.add("tasks__lists");
    list.id = "tasks__lists";

    const button = document.createElement("button");
    button.classList.add("btn", "addTask");
    button.innerHTML += `<i class="fa-solid fa-plus" aria-hidden="true"></i> Add Task`;

    const taskAdd = document.createElement('div');
    taskAdd.classList.add('task__add', 'input__options');

    const input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.name = "task__name";
    input.id = "task__name";

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const addButton = document.createElement("button");
    addButton.classList.add("inputBtn", "greenBtn");
    addButton.textContent = "Add";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("inputBtn", "pinkBtn");
    cancelButton.textContent = "Cancel";

    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);
    taskAdd.appendChild(input);
    taskAdd.appendChild(buttons);

    button.addEventListener('click', () => {
        button.classList.add('inactive');
        taskAdd.classList.add('active');
    });
    addButton.addEventListener('click', () => {
        if (input.value === "") return alert("Please enter task name.");
        else{
            const task = new Task(input.value);
            tasks.push(task);
            displayTasks(list, task);
            input.value = '';
            taskAdd.classList.remove('active');
            button.classList.remove('inactive');
        }
    });
    cancelButton.addEventListener('click', () => {
        taskAdd.classList.remove('active');
        button.classList.remove('inactive');
    });

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
    details.appendChild(button);
    details.appendChild(taskAdd);
}

function displayTasks(list, task){
    const taskBtn = document.createElement('button');
    taskBtn.classList.add('task__btn');

    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left__panel');
    const title = document.createElement('p');
    title.textContent = task.getTitle();
    const titleInput = document.createElement('INPUT');
    titleInput.setAttribute('type', 'text');
    titleInput.name = "task__title";
    titleInput.id = "task__title";
    titleInput.classList.add('inactive');
    leftPanel.innerHTML += `<i class="fa-regular fa-circle" aria-hidden="true"></i>`;
    leftPanel.appendChild(title);
    leftPanel.appendChild(titleInput);

    title.addEventListener('click', () => {
        title.classList.add('inactive');
        titleInput.classList.remove('inactive');
        titleInput.value = task.getTitle();
    });

    titleInput.addEventListener('keydown', (e) => {
        const titles = [];
        tasks.forEach((task) => titles.push(task.title));

        if (e.key === 'Enter') {
            if (titleInput.value === "") alert("Task name can't be empty");
            else if (titles.includes(titleInput.value)) alert("Task names must be different");
            else {
                task.setTitle(titleInput.value);
                title.textContent = titleInput.value;
                titleInput.classList.add('inactive');
                title.classList.remove('inactive');
            }
        }
    });

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right__panel');
    const date = document.createElement('p');
    date.textContent = task.getDuedate();
    rightPanel.appendChild(date);
    rightPanel.innerHTML += `<i class="fa-solid fa-times" aria-hidden="true"></i>`;


    taskBtn.appendChild(leftPanel);
    taskBtn.appendChild(rightPanel);
    list.appendChild(taskBtn);
}

function todayContent() {
    const title = document.createElement("h1");
    title.classList.add("page__title");
    title.textContent = "Today";

    const list = document.createElement("div");
    list.classList.add("tasks__lists");
    list.id = "tasks__lists";

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
}

function weekContent() {
    const title = document.createElement("h1");
    title.classList.add("page__title");
    title.textContent = "This week";

    const list = document.createElement("div");
    list.classList.add("tasks__lists");
    list.id = "tasks__lists";

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
}

addProject.addEventListener('click', () => {
    addProject.classList.add('inactive');
    addOptions.classList.add('active');
});

cancelBtn.addEventListener('click', () => {
    addProject.classList.remove('inactive');
    addOptions.classList.remove('active');
});

inboxBtn.addEventListener('click', () => {
    if (inboxBtn.classList.contains('activeBtn')) return;
    else {
        inboxContent();
        inboxBtn.classList.add('activeBtn');
        todayBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
    }
});

todayBtn.addEventListener('click', () => {
    if (todayBtn.classList.contains('activeBtn')) return;
    else {
        todayContent();
        todayBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
    }
});

weekBtn.addEventListener('click', () => {
    if (weekBtn.classList.contains('activeBtn')) return;
    else {
        weekContent();
        weekBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        todayBtn.classList.remove('activeBtn');
    }
});

function run() {
    inboxContent();
    inboxBtn.classList.add('activeBtn');
}

run();

