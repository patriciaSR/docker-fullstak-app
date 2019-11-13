'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');


fetch('http://localhost/api/misdatos')
    .then(res => res.json())
    .then(data => {
        const taskArray = data[1].results;
        return printList(taskArray);
    }
    )

function printList(arr) {
    for (const item of arr) {
        createListElements(item.task);
        if (item.checked) {
            newCheckbox.checked;
        }
    }
}

function createListElements(input) {
    const newItem = document.createElement('li');
    const task = document.createTextNode(input);


    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';

    const newDelBtn = document.createElement('button');
    const btnText = document.createTextNode('delete');

    newDelBtn.appendChild(btnText);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(task);
    newItem.appendChild(newDelBtn);
    list.appendChild(newItem);

    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', changeStatus);

    return newCheckbox;
}

function createTask() {
    const inputVal = input.value;
    createListElements(inputVal);
    postTask(inputVal);
}

function postTask(newTask) {
// post body data 
    const ENDPOINT = 'http://localhost/api/misdatos';
    const listItem = {
        task: newTask,
        checked: false
    };
// request options
    const options = {
        method: 'POST',
        body: JSON.stringify({tarea: 'hola que ase'}),
        headers: {
            'Content-Type': 'application/json'
        }
    }

 // send POST request   
    fetch(ENDPOINT, options)
        .then(res => res.json())
        .then(res => console.log(res));
}



function deleteTask(event) {
    const currentBtn = event.currentTarget;
    const liItem = currentBtn.parentElement;
    liItem.remove();
}

function changeStatus(event) {
    const currentBox = event.currentTarget;
    const liItem = currentBox.parentElement;
    if (currentBox.checked) {
        liItem.classList.add('task-done');
    }
    else {
        liItem.classList.remove('task-done');
    }
}

function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);

