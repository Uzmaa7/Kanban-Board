const todo = document.querySelector('#todo');
const progress =document.querySelector('#progress');
const done = document.querySelector('#done');

let dragElement = null;
const tasks = document.querySelectorAll('.task');
let tasksData = {};




function addTask(title, desc, column){

    const div = document.createElement('div');

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h3>${title}</h3>
        <p>${desc}</p>
        <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("drag", ()=>{
        dragElement = div;
    })

    const deletebtn = div.querySelector("button");
    deletebtn.addEventListener("click", (e)=>{
        div.remove();
        updateTaskCount();
    })

    return div;

}


function updateTaskCount(){
    [todo, progress, done].forEach(col => {

        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');

        tasksData[col.id] = Array.from(tasks).map(t => {
            return{
                title : t.querySelector("h3").innerText,
                desc : t.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData));

        count.innerText = tasks.length;
    })
}



if(localStorage.getItem("tasks")){
    // user visit first time to the kanban

    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        })   
    }

    updateTaskCount();
}



tasks.forEach(task =>{
    task.addEventListener("drag", (e) =>{
        dragElement = task;
    })
})


function addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e)=>{
        e.preventDefault;
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e)=>{
        e.preventDefault;
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    column.addEventListener("drop", (e)=>{
        e.preventDefault();


        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
  
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


// progress.addEventListener("dragenter", (e) => {
//     progress.classList.add("hover-over");
// })

// progress.addEventListener("dragleave", (e)=>{
//     progress.classList.remove("hover-over");
// })



// Modal related logic
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector('.modal');

toggleModalButton.addEventListener("click", ()=>{
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", ()=>{
    modal.classList.remove("active")
})

// Modal related logic

const addTaskButton = document.querySelector("#add-new-task");
addTaskButton.addEventListener("click", ()=>{

    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-description-input").value;

    
    addTask(taskTitle, taskDesc, todo);
    updateTaskCount();
    modal.classList.remove("active")
})