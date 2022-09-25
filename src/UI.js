const inboxBtn = document.querySelector('.inboxBtn');
const todayBtn = document.querySelector('.todayBtn');
const weekBtn = document.querySelector('.weekBtn');
const addProject = document.querySelector('.addBtn');
const addOptions = document.querySelector('.project__add');
const cancelBtn = document.querySelector('.pinkBtn');
const details = document.getElementById("project__details");

function inboxContent(){
    const title = document.createElement("h1");
    title.classList.add("page__title");
    title.textContent = "Inbox";

    const list = document.createElement("div");
    list.classList.add("tasks__lists");
    list.id = "tasks__lists";

    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML += `<i class="fa-solid fa-plus" aria-hidden="true"></i> Add Task`;

    details.textContent = "";
    details.appendChild(title);
    details.appendChild(list);
    details.appendChild(button);
}

function todayContent(){
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

function weekContent(){
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
    if(inboxBtn.classList.contains('activeBtn')) return;
    else{
        inboxContent();
        inboxBtn.classList.add('activeBtn');
        todayBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
    }
});

todayBtn.addEventListener('click', () => {
    if(todayBtn.classList.contains('activeBtn')) return;
    else{
        todayContent();
        todayBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        weekBtn.classList.remove('activeBtn');
    }
});

weekBtn.addEventListener('click', () => {
    if(weekBtn.classList.contains('activeBtn')) return;
    else{
        weekContent();
        weekBtn.classList.add('activeBtn');
        inboxBtn.classList.remove('activeBtn');
        todayBtn.classList.remove('activeBtn');
    }
});

function run(){
    inboxContent();
    inboxBtn.classList.add('activeBtn');
}

run();
