'use strict';

const input = document.querySelector('.create__field');
const btn = document.querySelector('.create__btn');
const list = document.querySelector('.list');
const listSection = document.querySelector('.main__list');
const infoText = document.querySelector('.list__info');
const ENDPOINT = 'http://localhost/api/misdatos';

const noTaskMsg = 'no hay tareas';
const taskMsg = 'aquí están tus tareas:';
const noTaskInputMsg = 'Por favor, introduce una tarea';


fetch(ENDPOINT)
    .then(res => res.json())
    .then(data => {
        return printList(data);
    });

function printList(arr) {
    if (arr.length === 0) { 
        updateMsg(noTaskMsg);

    } else {
        for (const item of arr) {
            createListElements(item);
        }
    }
}


function updateMsg(txt) {
    if ((txt === noTaskMsg) ||(txt === noTaskInputMsg)) {
        infoText.classList.add('emptyMsg');
    } else {
        infoText.classList.remove('emptyMsg');
    }
    infoText.innerHTML = txt;

}

function createListElements({ _id, task, checked }) {

    const newItem = document.createElement('li');
    newItem.classList.add('list__item')
    newItem.id = _id;

    const newCheckbox = createTag('input', null, null, 'checkbox');
    const newText = createTag('p', task);
    const newDelBtn = createTag('button', '-');

    isCheked(newItem, newCheckbox, checked);
    
    createNodeAdopt(newItem, newCheckbox, newText, newDelBtn);
    list.appendChild(newItem);
    
    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', changeStatus);
    
    updateMsg(taskMsg);
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
        updateMsg(noTaskInputMsg);
    } else {
        postTask(inputVal).then((data) => {
            createListElements(data);
        });
    };

    input.value = '';
}

function postTask(newTask) {
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


function changeTxt () {
    const isEmpty = (list.innerHTML === '') ? updateMsg(noTaskMsg):null;   
    return isEmpty; 
}

function deleteTask(event) {
    const currentBtn = event.currentTarget;
    const liItem = currentBtn.parentElement;
    const id = liItem.id;
    deleteOnDatabase(id)
        .then(() => {
            liItem.remove();                
        })
        .then(()=> changeTxt());  
     
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

function pressEnter(event) {
    if (event.key === 'Enter') {
        createTask();
    }
}

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);

