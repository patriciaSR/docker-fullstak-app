
import {deleteTask, updateStatus } from './main.js';

function adoptChilds(mother, ...rest) {
    if (rest) {
        const newMother = rest.map(node => mother.appendChild(node));
        return newMother;
    }
}

function isChecked(liItem, checkBox, status) {
    if (status) {
        checkBox.checked = true;
        liItem.classList.add('task-done');
    }
    else {
        liItem.classList.remove('task-done');
    }
};

function createTag(tag, text, newClass, newType) {
    const newElement = document.createElement(tag);
    const newText = document.createTextNode(text);

    newClass ? newElement.classList.add(newClass) : null;
    newType ? (newElement.type = newType) : null;

    newElement.appendChild(newText);

    return newElement;
}

function createTaskItem(taskObj) {
    const { _id, task, checked } = taskObj;
    
    const newItem = document.createElement('li');
    const newCheckbox = createTag('input', null, null, 'checkbox');
    const newText = createTag('p', task);
    const newDelBtn = createTag('button', '-', 'delete__btn');

    newItem.classList.add('list__item')
    newItem.id = _id;
    newDelBtn.addEventListener('click', deleteTask);
    newCheckbox.addEventListener('click', updateStatus);

    isChecked(newItem, newCheckbox, checked);
    adoptChilds(newItem, newCheckbox, newText, newDelBtn);

    return newItem;
}

export {adoptChilds, isChecked, createTag, createTaskItem};