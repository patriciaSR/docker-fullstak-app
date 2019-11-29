'use strict';
import { getOnDataBase } from './service.js';
import { printList, createTask, pressEnter, deleteDoneTask } from './paint.js';

const btn = document.querySelector('.create__btn');
// const listSection = document.querySelector('.main__list');
const deleteManyBtn = document.querySelector('.deletemany');

getOnDataBase().then(data => { return printList(data) });

btn.addEventListener('click', createTask);
document.addEventListener('keyup', pressEnter);
deleteManyBtn.addEventListener('click', deleteDoneTask);