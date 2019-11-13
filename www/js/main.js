'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');


fetch('http://localhost/api/misdatos')
.then(res => res.json())
.then(data => console.log(data[2].results))

// fetch('/misdatos',
// {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "GET",
//     // body: JSON.stringify({a: 1, b: 2})
// })
// .then(function(res){ console.log(res) })
// .catch(function(res){ console.log(res) })

function createTask () {
    
    const newItem = document.createElement('li');
    const task = document.createTextNode(input.value);
    
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

btn.addEventListener('click',createTask);
document.addEventListener('keyup', pressEnter);