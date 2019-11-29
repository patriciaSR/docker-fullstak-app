'use strict';
import {deleteManyDatabase, deleteOnDatabase, patchOnDatabase, postOnDataBase, getOnDataBase} from './service.js';
import {createTaskItem} from './construct.js';
const btn = document.querySelector('.create__btn');
const listSection = document.querySelector('.main__list');
const infoText = document.querySelector('.list__info');
const deleteManyBtn = document.querySelector('.deletemany');


let numberTasks = 0;

const noTaskMsg = 'No tienes tareas';
const taskMsg = `Aquí están tus tareas: `;
const noTaskInputMsg = 'Por favor, introduce una tarea';



getOnDataBase().then(data => { return printList(data) });

function printList(arr) {
    if (arr.length === 0) {
        updateMsg(noTaskMsg, infoText);

    } else {
        arr.forEach(item => addTaskToList(item));
    }
}

function updateMsg(txt, infoContainer, number = 0) {
    if ((txt === noTaskMsg) || (txt === noTaskInputMsg)) {
        infoContainer.classList.add('emptyMsg');
        infoContainer.innerHTML = txt;
    } else {
        infoContainer.classList.remove('emptyMsg');
        infoContainer.innerHTML = `${txt} Tienes <strong>${number}</strong> tareas`;
    }
}


function addTaskToList(taskObj) {
    const newItem = createTaskItem(taskObj);
    const list = document.querySelector('.list');    
    
    list.appendChild(newItem);    
    numberTasks++;

    updateMsg(taskMsg, infoText, numberTasks);
}

//interaction functions


function createTask() {
    const input = document.querySelector('.create__field');
    const inputVal = input.value;
    if (input.value === '') {
        updateMsg(noTaskInputMsg, infoText);
    } else {
        postOnDataBase(inputVal).then((task) => {
            addTaskToList(task);
        });
    };

    input.value = '';
}

function updateStatus(event) {
    const currentBox = event.currentTarget;
    const liItem = currentBox.parentElement;
    const itemId = liItem.id;
    const status = currentBox.checked;

    if (status) {
        liItem.classList.add('task-done');
    } else {
        liItem.classList.remove('task-done');
    }

    patchOnDatabase(itemId, status);
}

function deleteTask(event) {
    const currentBtn = event.currentTarget;
    const liItem = currentBtn.parentElement;
    const id = liItem.id;
    deleteOnDatabase(id)
        .then(() => {
            liItem.remove();
        });

    numberTasks--;

    if (numberTasks !== 0) {
        updateMsg(taskMsg, infoText, numberTasks);
    } else {
        updateMsg(noTaskMsg, infoText);
    }
}


function deleteDoneTask() {
    const listItem = document.querySelectorAll('li');
    for (const item of listItem) {
        const checkBox = item.firstChild;
        if (checkBox.checked === true) {
            item.remove();
            numberTasks--;
            if (numberTasks === 0) {
                updateMsg(noTaskMsg, infoText);
            }
            else {
                updateMsg(taskMsg, infoText, numberTasks);
            }
        }
    }
    console.log(listItem);
    deleteManyDatabase();
}


function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);
deleteManyBtn.addEventListener('click', deleteDoneTask);

export {deleteTask, updateStatus};