
import { deleteTask, updateStatus } from './paint.js';

function adoptChilds(mother, ...rest) {
    if (rest) {
        rest.forEach(node => mother.appendChild(node));
        return mother;
    }
}

function isChecked(liItem, checkBox, status) {
    if (status) {
        checkBox.checked = true;
        liItem.classList.add('task-done');
    }
};

function createTag(tag = 'div', text = '', newClass, newType) {
    if(tag) {
        const newElement = document.createElement(tag);
        const newText = document.createTextNode(text);
    
        newClass ? newElement.classList.add(newClass) : null;
        newType ? (newElement.type = newType) : null;
    
        newElement.appendChild(newText);
    
        return newElement;
    } 
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