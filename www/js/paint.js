import { createTaskItem } from './construct.js';
import { deleteManyDatabase, deleteOnDatabase, patchOnDatabase, postOnDataBase } from './service.js';

let numberTasks = 0;

const noTaskMsg = 'No tienes tareas';
const noTaskInputMsg = 'Por favor, introduce una tarea';

const infoText = document.querySelector('.list__info');

function updateMsg(txt, infoContainer, number=0) {
  if (infoContainer) {
    if ((txt === 'No tienes tareas') || (txt === 'Por favor, introduce una tarea')) {
      infoContainer.classList.add('emptyMsg');
      infoContainer.innerHTML = txt;
    } else {
      infoContainer.classList.remove('emptyMsg');
      infoContainer.innerHTML = `Aquí están tus tareas: Tienes <strong>${number}</strong> tareas`;
    }
  }
}

function addTaskToList(taskObj) {
  const newItem = createTaskItem(taskObj);
  const list = document.querySelector('.list');
  list.appendChild(newItem);
  numberTasks++;
  
  updateMsg(null, infoText, numberTasks);
}

function printList(arr) {
  if (arr.length > 0) {
    arr.forEach(item => addTaskToList(item));
    //numberTasks = arr.length;
  } else {
    updateMsg(noTaskMsg, infoText);
  }
}

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

function pressEnter(event) {
  if (event.key === 'Enter') {
    createTask();
  }
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
    updateMsg(null, infoText, numberTasks);
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
        updateMsg(null, infoText, numberTasks);
      }
    }
  }
  deleteManyDatabase();
}

export { printList, updateMsg, addTaskToList, createTask, pressEnter, updateStatus, deleteTask, deleteDoneTask };