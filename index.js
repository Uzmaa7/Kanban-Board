const todo = document.querySelector('#todo');
const progress =document.querySelector('#progress');
const done = document.querySelector('#done');




const tasks = document.querySelectorAll('.task');

tasks.forEach(task =>{
    task.addEventListener("drag", (e) =>{

    })
})


function addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e)=>{
        e.preventDeafault;
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e)=>{
        e.preventDeafault;
        column.classList.remove("hover-over");
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