let today=dayjs();
today=today.format('YYYY-MM-DD');
let tommorow= dayjs().add(1,'day');
tommorow=tommorow.format('YYYY-MM-DD');
document.querySelector('.doda').min=today;
document.querySelector('.doda').value=today;
function changetheme() {
    const darkElement = document.querySelector('.godark');
    const lightElement = document.querySelector('.golight');
    const scoreBox = document.body;
    const todo=document.querySelector('.do');
    const dodate=document.querySelector('.doda');
    if (darkElement) {
        darkElement.classList.remove('godark');
        darkElement.classList.add('golight');
        todo.classList.add('todo');
        todo.classList.remove('lighttodo');
        dodate.classList.add('dodate');
        dodate.classList.remove('lightdodate');
        scoreBox.style.backgroundColor = "#333";
        scoreBox.style.color = "white"; 
        darkElement.innerHTML="Light";
        localStorage.setItem('theme','darkElement');
    } else if (lightElement) {
        lightElement.classList.remove('golight');
        lightElement.classList.add('godark');
        scoreBox.style.backgroundColor = "#fff"; 
        scoreBox.style.color = "black"; 
        todo.classList.add('lighttodo');
        todo.classList.remove('todo');
        dodate.classList.add('lightdodate');
        dodate.classList.remove('dodate');
        lightElement.innerHTML="Dark";
        localStorage.setItem('theme','lightElement');
    }
}
document.querySelector('.golight').addEventListener('click',changetheme);
let todolist=[];
if (localStorage.getItem('todolist')){
    todolist=JSON.parse(localStorage.getItem('todolist'));
}

if (todolist.length!==0) {
    document.title=`Todo • ${todolist.length} Todos`;
    if (todolist.length===1) {
        document.title=`Todo • ${todolist.length} Todo`;
    }
    todolist.forEach((todo,i)=>{
        if (today===todo.dodate) {
            document.querySelector('.list').innerHTML+=`<div class="todolist" data-index=${i}><p class="todo">${todo.todo}</p><p class="dodate">Today</p><button class="deletetodo">- Remove Todo</button></div>`;
        } else if (tommorow===todo.dodate) {
            document.querySelector('.list').innerHTML+=`<div class="todolist" data-index=${i}><p class="todo">${todo.todo}</p><p class="dodate">Tommorow</p><button class="deletetodo">- Remove Todo</button></div>`;
        } else {
            document.querySelector('.list').innerHTML+=`<div class="todolist" data-index=${i}><p class="todo">${todo.todo}</p><p class="dodate">${todo.dodate}</p><button class="deletetodo">- Remove Todo</button></div>`;
        }
        
        let dlbts=document.querySelectorAll('.deletetodo');
        dlbts.forEach((button)=>{
            button.addEventListener('click',()=>{
                if (todolist.length>1) {
                    button.parentElement.remove();
                    const index = button.parentElement.getAttribute('data-index');
                    todolist.splice(index, 1);
                    
                    localStorage.setItem('todolist',JSON.stringify(todolist));
                    location.reload();
                } else {
                    document.querySelector('.list').innerHTML='';
                    todolist=[];
                    localStorage.setItem('todolist',todolist);
                    location.reload();
                }
            })
        })
    })
}
document.querySelector('.addtodo').addEventListener('click',addtodo);
document.querySelector('.do').addEventListener('keydown',(event)=>{
    if (event.key==='Enter') {
        addtodo();
    }
});
document.querySelector('.list').addEventListener('keydown',(event)=>{
    if (event.key==='Backspace') {
        document.querySelector('.list').innerHTML='';
        todolist=[];
        localStorage.setItem('todolist',todolist);
    }
});
function addtodo() {
    let todo=document.querySelector('.do').value;
    let dodate=document.querySelector('.doda').value;
    if (!todo) {
        todo='Doing nothing';
    }
    if (today===dodate) {
        document.querySelector('.list').innerHTML+=`<div class="todolist"><p class="todo">${todo}</p><p class="dodate">Today</p><button class="deletetodo">- Remove Todo</button></div>`;
    } else if (tommorow===dodate) {
        document.querySelector('.list').innerHTML+=`<div class="todolist"><p class="todo">${todo}</p><p class="dodate">Tommorow</p><button class="deletetodo">- Remove Todo</button></div>`;
    } else {
        document.querySelector('.list').innerHTML+=`<div class="todolist"><p class="todo">${todo}</p><p class="dodate">${dodate}</p><button class="deletetodo">- Remove Todo</button></div>`;
    }
    todolist.push({todo:todo,dodate:dodate});
    document.title=`Todo • ${todolist.length} Todos`;
    if (todolist.length===1) {
        document.title=`Todo • ${todolist.length} Todo`;
    }
    localStorage.setItem('todolist',JSON.stringify(todolist));
    let todos=document.querySelectorAll('.todolist');
    let dlbts=document.querySelectorAll('.deletetodo');
    dlbts.forEach((button,i)=>{
        button.addEventListener('click',()=>{
            if (todolist.length>1) {
                button.parentElement.remove();
                //const index = button.parentElement.getAttribute('data-index');
                //todolist.splice(index, 1);
                todolist.splice(i,1);
                localStorage.setItem('todolist',JSON.stringify(todolist));
                location.reload();
            } else {
                document.querySelector('.list').innerHTML='';
                todolist=[];
                localStorage.setItem('todolist',todolist);
                location.reload();
            }
            /*todolist.forEach((todo,i)=>{
                todolist.splice(todo,1);
                if (todolist.length>1) {
                    button.parentElement.remove();
                } else {
                    document.querySelector('.list').innerHTML='';
                }
            }) */
        })
    })
}
