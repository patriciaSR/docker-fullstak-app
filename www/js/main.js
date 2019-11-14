'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');
const listSection = document.querySelector('.main__list');


fetch('http://localhost/api/misdatos')
    .then(res => res.json())
    .then(data => {
        console.log('initial print ->', data);
        return printList(data);
    });

function printList(arr) {
    if (arr === []) {
        printNoDataMsg();
    } else {
        for (const item of arr) {
            createListElements(item);
        }
    }
}

function printNoDataMsg() {
    const message = document.createElement('p');
    message.classList.add('emptyMsg');
    const messageText = document.createTextNode('No hay tareas pendientes, añade alguna');
    message.appendChild(messageText);
    listSection.insertBefore(message, list);
}

function removeEmptyMsg() {
    if (list.innerHTML === '') {
        const text = document.querySelector('emptyMsg');
        listSsection.removeChild(text);
    }
}

function createListElements({ _id, task, checked }) {
    // removeEmptyMsg();    
    const newItem = document.createElement('li');
    newItem.id = _id;
    const taskT = document.createTextNode(task);

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    const newText = document.createElement('p');

    const newDelBtn = document.createElement('button');
    const btnText = document.createTextNode('delete');

    newText.appendChild(taskT);
    newDelBtn.appendChild(btnText);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newDelBtn);
    list.appendChild(newItem);

    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', changeStatus);

    if (checked) {
        newCheckbox.checked = true;
        newItem.classList.add('task-done');
    }
    else {
        newItem.classList.remove('task-done');
    }

}

function createTask() {
    const inputVal = input.value;
    postTask(inputVal).then(data =>  createListElements(data));
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
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send POST request  
    return fetch(ENDPOINT, options)
        .then(res => {
            return res.json();
        });
}

function deleteOnDatabase(newTask) {
    // post body data 
    const ENDPOINT = 'http://localhost/api/misdatos';
    const listItem = {
        task: newTask,
    };
    // request options
    const options = {
        method: 'DELETE',
        body: JSON.stringify(listItem),
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
    const task = currentBtn.previousSibling.textContent;
    const liItem = currentBtn.parentElement;
    deleteOnDatabase(task);
    liItem.remove();
}



function changeStatus(event) {
    const currentBox = event.currentTarget;
    const liItem = currentBox.parentElement;
    const itemId = liItem.id;
    const status = currentBox.checked;

    if (status) {
        liItem.classList.add('task-done');
    }
    else {
        liItem.classList.remove('task-done');
    }

    updateOnDatabase(itemId, status);
}

function updateOnDatabase(id, bool) {
    // post body data 
    const ENDPOINT = 'http://localhost/api/misdatos';
    const listItem = {
        _id: id,
        checked: bool
    };
    // request options
    const options = {
        method: 'PATCH',
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send POST request   
    fetch(ENDPOINT, options)
        .then(res => res.json())
        .then(res => console.log(res));
}

function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);

