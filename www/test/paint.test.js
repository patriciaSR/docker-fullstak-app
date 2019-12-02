import { printList, updateMsg, addTaskToList, createTask, pressEnter, updateStatus, deleteTask, deleteDoneTask } from '../js/paint.js';
//import { createTaskItem } from './construct.js';
import * as constructModule from '../js/construct.js';

describe('adoptChilds method', () => {
    test('it appends noTaskMsg to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const noTaskMsg = 'texto no task';
        const node1 = document.querySelector('div');
        const text1 = 'lololo';

        updateMsg(text1, node1, 1);

        expect(node1.innerHTML).toEqual(noTaskMsg);
    });
});

// const noTaskMsg = 'No tienes tareas';
// const noTaskInputMsg = 'Por favor, introduce una tarea';

// const infoText = document.querySelector('.list__info');

// function updateMsg(txt, infoContainer, number = 0) {
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