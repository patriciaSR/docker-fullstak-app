import { printList, updateMsg, addTaskToList, createTask, pressEnter, updateStatus, deleteTask, deleteDoneTask } from '../js/paint.js';
//import { createTaskItem } from './construct.js';
import * as constructModule from '../js/construct.js';

describe('adoptChilds method', () => {
    document.body.innerHTML = `
    <div class="mother"></div>
  `;
    const node1 = document.querySelector('div');
    test('it appends noTaskMsg to mother element', () => {

        const inputText = 'No tienes tareas';


        updateMsg(inputText, node1, 1);

        expect(node1.innerHTML).toEqual(inputText);
    });
    test('it appends noTaskMsg to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = 'Por favor, introduce una tarea';


        updateMsg(inputText, node1, 1);

        expect(node1.innerHTML).toEqual(inputText);
        expect(node1.classList).toContain('emptyMsg');
    });
    test('it appends noTaskMsg to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = '';
        const output = `Aquí están tus tareas: Tienes <strong>4</strong> tareas`


        updateMsg(inputText, node1, 4);

        expect(node1.innerHTML).toEqual(output);
        expect(node1.classList).not.toContain('emptyMsg');
    });
    test('it appends noTaskMsg to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = null;
        const output = `Aquí están tus tareas: Tienes <strong>0</strong> tareas`


        updateMsg(inputText, node1);

        expect(node1.innerHTML).toEqual(output);
    });
    test('it appends noTaskMsg to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = undefined;
        const output = `Aquí están tus tareas: Tienes <strong>0</strong> tareas`


        updateMsg(inputText, node1);

        expect(node1.innerHTML).toEqual(output);
    });

});

// const noTaskMsg = 'No tienes tareas';
// const noTaskInputMsg = 'Por favor, introduce una tarea';

// const infoText = document.querySelector('.list__info');

// function updateMsg(txt, infoContainer, number=0) {
//   if (infoContainer) {
//     if ((txt === 'No tienes tareas') || (txt === 'Por favor, introduce una tarea')) {
//       infoContainer.classList.add('emptyMsg');
//       infoContainer.innerHTML = txt;
//     } else {
//       infoContainer.classList.remove('emptyMsg');
//       infoContainer.innerHTML = `Aquí están tus tareas: Tienes <strong>${number}</strong> tareas`;
//     }
//   }
// }