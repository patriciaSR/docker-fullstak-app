'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');


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

btn.addEventListener('click',createTask);
