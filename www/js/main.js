'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');


fetch('http://localhost/api/misdatos')
    .then(res => res.json())
    .then(data => {
        const taskArray = data;
        return printList(taskArray);
    }
    )

function printList(arr) {
    for (const item of arr) {
        createListElements(item);
    }
}

function createListElements({ task, _id, checked }) {
    const newItem = document.createElement('li');
    newItem.id = _id;
    const taskTextNode = document.createTextNode(task);


    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';

    const newText = document.createElement('p');
    
    
    const newDelBtn = document.createElement('button');
    const btnText = document.createTextNode('delete');

    newText.appendChild(taskTextNode);
    newDelBtn.appendChild(btnText);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newDelBtn);
    list.appendChild(newItem);

    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', changeStatus);

    if (checked) {
        newItem.classList.add('task-done');
    } else {
        newItem.classList.remove('task-done');
    }

    newCheckbox.checked = checked;

    return newCheckbox;
}

function createTask() {
    const inputVal = input.value;
    postTask(inputVal).then((data) => {
        createListElements(data);
    });
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
            console.log(`POST result: ${res.ok}`);
            return res.json();
        });
}

function deleteOnDatabase(id) {
    // delete body data 
    const ENDPOINT = 'http://localhost/api/misdatos';
    const listItem = {
        _id: id,
    };
// request options
    const options = {
        method: 'DELETE',
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

 // send DELETE request   
    return fetch(ENDPOINT, options)
    .then(res => {
        console.log(`DELETE result: ${res.ok}`)
    });
}


function deleteTask(event) {
    const currentBtn = event.currentTarget;   
    const liItem = currentBtn.parentElement;
    const id = liItem.id;
    deleteOnDatabase(id).then(() => {
        liItem.remove();
    });
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
    .then(res => {
        console.log(`PATCH result: ${res.ok}`)
    });
}

function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);

