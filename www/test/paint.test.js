import { printList, updateMsg, addTaskToList, createTask, pressEnter, updateStatus, deleteTask, deleteDoneTask } from '../js/paint.js';
//import { createTaskItem } from './construct.js';
import * as constructModule from '../js/construct.js';
import * as paintModule from '../js/paint.js';
import * as serviceModule from '../js/service.js';

import { mockTasks } from './fixtures/mockTasks.js';

describe('updateMsg method', () => {
    document.body.innerHTML = `
    <div class="mother"></div>
  `;
    const node1 = document.querySelector('div');
    test('it appends -No tienes tareas- to mother element', () => {

        const inputText = 'No tienes tareas';

        updateMsg(inputText, node1, 1);

        expect(node1.innerHTML).toEqual(inputText);
    });
    test('it appends -Por favor, introduce una tarea- to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = 'Por favor, introduce una tarea';

        updateMsg(inputText, node1, 1);

        expect(node1.innerHTML).toEqual(inputText);
        expect(node1.classList).toContain('emptyMsg');
    });
    test('it appends -Aquí están tus tar...- to mother element', () => {
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
    test('it appends with null parameter to mother element', () => {
        document.body.innerHTML = `
        <div class="mother"></div>
      `;
        const node1 = document.querySelector('div');
        const inputText = null;
        const output = `Aquí están tus tareas: Tienes <strong>0</strong> tareas`

        updateMsg(inputText, node1);

        expect(node1.innerHTML).toEqual(output);
    });
    test('it appends with undefined parameter to mother element', () => {
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

describe('addTaskToList method', () => {
    const spyUpdateMsg = jest.spyOn(paintModule, 'updateMsg');
    test('appends a new li element and calls updateMsg', () => {
        document.body.innerHTML = `
        <ul class="list"></ul>
      `;

        addTaskToList(mockTasks[0]);
        const mockedList = document.querySelector('ul');

        expect(mockedList.firstChild.tagName).toBe('LI');
        expect(spyUpdateMsg).toHaveBeenCalled();
    });
});

describe('printList method', () => {
    const spyAddTaskToList = jest.spyOn(paintModule, 'addTaskToList');
    const spyUpdateMsg = jest.spyOn(paintModule, 'updateMsg');

    test('calls addTaskToList with an object', () => {
        document.body.innerHTML = `
        <ul class="list"></ul>
      `;

        printList(mockTasks);
        const mockedList = document.querySelector('ul');
        const newItems = document.querySelectorAll('li');

        expect(mockedList.firstChild.tagName).toBe('LI');
        expect(newItems.length).toEqual(3);
        expect(spyAddTaskToList).toHaveBeenCalled();
    });
    
    test('calls updateMsg when arr is empty', () => {
      document.body.innerHTML = `
      <ul class="list"></ul>
    `;

      printList();
      const mockedList = document.querySelector('ul');

      expect(mockedList.innerHTML.length).toBe(0);
      expect(spyUpdateMsg).toHaveBeenCalled();
  });
});

describe('createTask method', () => {
  const spyPost = jest.spyOn(serviceModule, 'postOnDataBase');
  const spyUpdateMsg = jest.spyOn(paintModule, 'updateMsg');

  test('calls updateMessage if input is empty', () => {
    document.body.innerHTML = `
    <input value="" class="create__field" />
  `;
    createTask();

    expect(spyUpdateMsg).toHaveBeenCalled();
    expect(spyPost).not.toHaveBeenCalled();

});

  test('calls postOnDataBase', () => {
      document.body.innerHTML = `
      <input value="hola" class="create__field" />
    `;

      createTask();

      expect(spyPost).toHaveBeenCalledWith('hola');
  });
});
