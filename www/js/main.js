'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');
const listSection = document.querySelector('.main__list');
const infoText = document.querySelector('.list__info');
const deleteManyBtn = document.querySelector('.deletemany');
const ENDPOINT = 'http://localhost/api/misdatos';

let numberTasks = 0;

const noTaskMsg = 'No tienes tareas';
const taskMsg = `Aquí están tus tareas: `;
const noTaskInputMsg = 'Por favor, introduce una tarea';


//get data function
fetch(ENDPOINT)
    .then(res => res.json())
    .then(data => {
        return printList(data);
    });

//
function printList(arr) {
    if (arr.length === 0) { 
        updateMsg(noTaskMsg, infoText);

    } else {       
        arr.forEach(item => createListElements(item));
    }
}

function updateMsg(txt, infoContainer, number = 0) {
    if ((txt === noTaskMsg) || (txt === noTaskInputMsg)) {
        infoContainer.classList.add('emptyMsg');
        infoContainer.innerHTML = txt;
    } else {
        infoContainer.classList.remove('emptyMsg');
        infoContainer.innerHTML =`${txt} Tienes <strong>${number}</strong> tareas`;
    }
}

function createTag(tag, text, newClass, newType) {
    const newElement = document.createElement(tag);
    const newText = document.createTextNode(text);
    
    newClass ? newElement.classList.add(newClass): null;
    newType ? (newElement.type = newType) : null;
    
    newElement.appendChild(newText);

    return newElement;
}

function createNodeAdopt(mother, ...rest) {
    const newMother = rest.map(node => mother.appendChild(node));
    
    return newMother;
}

function createListElements({ _id, task, checked }) {

    const newItem = document.createElement('li');
    newItem.classList.add('list__item')
    newItem.id = _id;

    const newCheckbox = createTag('input', null, null, 'checkbox');
    const newText = createTag('p', task);
    const newDelBtn = createTag('button', '-', 'delete__btn');

    isCheked(newItem, newCheckbox, checked);
    
    createNodeAdopt(newItem, newCheckbox, newText, newDelBtn);
    list.appendChild(newItem);
    
    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', updateStatus);
    numberTasks ++;

    updateMsg(taskMsg, infoText, numberTasks);
}

//interaction functions
function isCheked(liItem, checkBox, status) {
    if (status) {
        checkBox.checked = true;
        liItem.classList.add('task-done');
    }
    else {
        liItem.classList.remove('task-done');
    }
};

function createTask() {
    const inputVal = input.value;
    if (input.value === '') {
        updateMsg(noTaskInputMsg,infoText);
    } else {
        postOnDataBase(inputVal).then((data) => {
            createListElements(data);
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
    }
    else {
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
    
    numberTasks --;
    
    if (numberTasks !== 0) {
        updateMsg(taskMsg, infoText, numberTasks);
    }else {
        updateMsg(noTaskMsg, infoText);
    }
}

//call API functions
function postOnDataBase(newTask) {
    // post body data 
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

function patchOnDatabase(id, bool) {
    // patch body data 
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

    // send PATCH request   
    fetch(ENDPOINT, options)
        .then(res => {
            console.log(`PATCH result: ${res.ok}`)
        });
}

function deleteOnDatabase(id) {
    // delete body data 
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

function deleteManyDatabase() {

    // request options
    const options = {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send DELETE request   
    return fetch('http://localhost/api/misdatos/delete', options)
        .then(res => {
            console.log(`DELETEMANY result: ${res.ok}`)
        });
}

function deleteDoneTask () {
    const listItem = document.querySelectorAll('li');
    for (const item of listItem) {
        const checkBox = item.firstChild;
        if (checkBox.checked === true) {
            item.remove();
            numberTasks --;
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

function changeTxt () {
    const isEmpty = (list.innerHTML === '') ? updateMsg(noTaskMsg, infoText):null;   
    return isEmpty; 
}


function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);
deleteManyBtn.addEventListener('click', deleteDoneTask);

