import Task from "./Task.js";
const inboxBtn = document.querySelector('.inboxBtn');
const todayBtn = document.querySelector('.todayBtn');
const weekBtn = document.querySelector('.weekBtn');
const addProject = document.querySelector('.addBtn');
const addOptions = document.querySelector('.project__add');
const addBtn = document.querySelector('.greenBtn');
const cancelBtn = document.querySelector('.pinkBtn');
const details = document.getElementById("project__details");
const tasks = [];
const projects = [];

function content(header, tk) {
    const title = document.createElement("h1");
    title.classList.add("page__title");
    title.textContent = header;

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
            tk.push(task);
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

    tk.forEach((task) => displayTasks(list, task));

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
    details.appendChild(button);
    details.appendChild(taskAdd);
}

function displayTasks(list, task, tk=tasks){
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
    const oIcon = document.createElement('i');
    oIcon.classList.add('fa-regular', 'fa-circle');
    oIcon.setAttribute('aria-hidden', 'true');
    leftPanel.appendChild(oIcon);
    leftPanel.appendChild(title);
    leftPanel.appendChild(titleInput);

    title.addEventListener('click', () => {
        title.classList.add('inactive');
        titleInput.classList.remove('inactive');
        titleInput.value = task.getTitle();
    });

    titleInput.addEventListener('keydown', (e) => {
        const titles = [];
        tk.forEach((task) => titles.push(task.title));
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
    const dateInput = document.createElement('INPUT');
    dateInput.setAttribute('type', 'date');
    dateInput.name = "task__duedate";
    dateInput.id = "task__duedate";
    dateInput.classList.add('inactive');
    const xIcon = document.createElement('i');
    xIcon.classList.add('fa-solid', 'fa-times');
    xIcon.setAttribute('aria-hidden', 'true');
    rightPanel.appendChild(date);
    rightPanel.appendChild(dateInput);
    rightPanel.appendChild(xIcon);

    date.addEventListener('click', () => {
        date.classList.add('inactive');
        dateInput.classList.remove('inactive');
    });

    dateInput.addEventListener('input', () => {
        task.setDuedate(dateInput.value);
        date.textContent = dateInput.value;
        dateInput.classList.add('inactive');
        date.classList.remove('inactive');
    });

    xIcon.addEventListener('click', () => removeTask());
    oIcon.addEventListener('click', () => removeTask());

    function removeTask() {
        const index = tk.findIndex(tk => tk === task);
        tk.splice(index, 1);
        list.removeChild(taskBtn);
    }
    
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

    const date = getFormattedDate(new Date());
    tasks.forEach((task) => {
        if (task.dueDate === date) displayTasks(list, task);   
    });

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

    const weekDates = [];
    const date = new Date();
    
    for (let i = 0; i <=6; i++){
        weekDates.push(getFormattedDate(new Date(date.setDate(date.getDate() - date.getDay() + i))));
    }
    
    tasks.forEach((task) => {
        if (weekDates.includes(task.dueDate)) displayTasks(list, task);   
    });

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
}

function getFormattedDate(date){
    const monthFormatted = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const dayFormatted = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${monthFormatted}-${dayFormatted}`;
}

addProject.addEventListener('click', () => {
    addProject.classList.add('inactive');
    addOptions.classList.add('active');
});

addBtn.addEventListener('click', () => {
    const projectName = document.getElementById('project__name');
    const list = document.querySelector('.projects__list');

    if (projectName.value === "") alert("Project name can't be empty");
    else if (projects.includes(projectName.value)) alert("Project names must be different");
    else {
        projects.push(projectName.value);
        displayProjects(list, projectName.value);
        projectName.value = "";
        addProject.classList.remove('inactive');
        addOptions.classList.remove('active');
    }
});

cancelBtn.addEventListener('click', () => {
    addProject.classList.remove('inactive');
    addOptions.classList.remove('active');
});

function displayProjects(list, project){
    const projectTasks = [];

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('btn', 'projectBtn');

    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left__panel');
    const title = document.createElement('p');
    title.textContent = project;
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-list-check');
    icon.setAttribute('aria-hidden', 'true');
    leftPanel.appendChild(icon);
    leftPanel.appendChild(title);

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right__panel');
    const xIcon = document.createElement('i');
    xIcon.classList.add('fa-solid', 'fa-times');
    xIcon.setAttribute('aria-hidden', 'true');
    rightPanel.appendChild(xIcon);

    xIcon.addEventListener('click', () => {
        const index = projects.findIndex(proj => proj === project);
        projects.splice(index, 1);
        list.removeChild(projectBtn);
    });
    
    projectBtn.appendChild(leftPanel);
    projectBtn.appendChild(rightPanel);
    list.appendChild(projectBtn);

    projectBtn.addEventListener('click', () => {
        if (projectBtn.classList.contains('activeBtn')) return;
        else {
            document.querySelectorAll('.projectBtn').forEach(btn => btn.classList.remove('activeBtn'));
            content(project, projectTasks);
            projectBtn.classList.add('activeBtn');
            todayBtn.classList.remove('activeBtn');
            inboxBtn.classList.remove('activeBtn');
            weekBtn.classList.remove('activeBtn');
        }
    });
}

inboxBtn.addEventListener('click', () => {
    const projectBtn = document.querySelectorAll('.projectBtn');
    if (inboxBtn.classList.contains('activeBtn')) return;
    else {
        content('Inbox', tasks);
        inboxBtn.classList.add('activeBtn');
        todayBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
        if(projectBtn.length > 0) {
            projectBtn.forEach(btn => btn.classList.remove('activeBtn'));
        }
    }
});

todayBtn.addEventListener('click', () => {
    const projectBtn = document.querySelectorAll('.projectBtn');
    if (todayBtn.classList.contains('activeBtn')) return;
    else {
        todayContent();
        todayBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
        if(projectBtn.length > 0) {
            projectBtn.forEach(btn => btn.classList.remove('activeBtn'));
        }
    }
});

weekBtn.addEventListener('click', () => {
    const projectBtn = document.querySelectorAll('.projectBtn');
    if (weekBtn.classList.contains('activeBtn')) return;
    else {
        weekContent();
        weekBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        todayBtn.classList.remove('activeBtn');
        if(projectBtn.length > 0) {
            projectBtn.forEach(btn => btn.classList.remove('activeBtn'));
        }
    }
});

function run() {
    content('Inbox', tasks);
    inboxBtn.classList.add('activeBtn');
}

run();

