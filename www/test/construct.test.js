// import { adoptChilds, isChecked, createTag, createTaskItem } from '../js/construct.js';
import { mockTasks } from './fixtures/mockTasks.js';
import * as constructModule from '../js/construct.js';
import * as paintModule from '../js/paint.js';

describe('createTag method', () => {
  test('it creates a new <p> element', () => {
    const newElement = constructModule.createTag('p', 'hola que tal', 'text');

    expect(newElement.tagName).toBe('P');
    expect(newElement.textContent).toBe('hola que tal');
    expect(newElement.classList).toContain('text');
  });

  test('it creates a new <checkbox> element', () => {
    const newElement = constructModule.createTag('input', 'hola que tal', 'check', 'checkbox');

    expect(newElement.tagName).toBe('INPUT');
    expect(newElement.textContent).toBe('hola que tal');
    expect(newElement.classList).toContain('check');
    expect(newElement.type).toBe('checkbox');
  });

  test('it returns null with no tag argument', () => {
    const newElement = constructModule.createTag(undefined, 'hola que tal', 'check');

    expect(newElement.tagName).toBe('DIV');
  });
});

describe('adoptChilds method', () => {
  test('it appends any element given to a node', () => {
    document.body.innerHTML = `
      <div class="mother"></div>
    `;
    const node1 = document.createElement('p');
    const node2 = document.createElement('span');
    const node3 = document.createElement('a');
    const mother = document.querySelector('.mother');

    const result = constructModule.adoptChilds(mother, node1, node2, node3);

    expect(result.firstChild.tagName).toBe('P');
    expect(result.lastChild.tagName).toBe('A');
  });

  test('it ruturns mother without any child if not childs arguments', () => {
    document.body.innerHTML = `
      <div class="mother"></div>
    `;
    const mother = document.querySelector('.mother');

    const result = constructModule.adoptChilds(mother);

    expect(result.firstChild).toBe(null);
    expect(result).toBe(mother);
  });
});

describe('isChecked method', () => {
  test('it adds task-done class when status db is true', () => {
    document.body.innerHTML = `
      <li>
        <input type="checkbox" />
      </li>
    `;
    const status = true;
    const liItem = document.querySelector('li');
    const checkBox = document.querySelector('input');

    constructModule.isChecked(liItem, checkBox, status);

    expect(liItem.classList).toContain('task-done');
  });

  test('it doesnt add task-done class when status db is false', () => {
    document.body.innerHTML = `
      <li>
        <input type="checkbox" />
      </li>
    `;
    const status = false;
    const liItem = document.querySelector('li');
    const checkBox = document.querySelector('input');

    constructModule.isChecked(liItem, checkBox, status);

    expect(liItem.classList).not.toContain('task-done');
  });
})

describe('createTaskItem method', () => {

  const spyIsChecked = jest.spyOn(constructModule, 'isChecked');
  const spyAdoptChilds = jest.spyOn(constructModule, 'adoptChilds');
  const spyDeleteTask = jest.spyOn(paintModule, 'deleteTask');
  const spyUpdateStatus = jest.spyOn(paintModule, 'updateStatus');


  document.body.innerHTML = `<div></div>`;
  const container = document.querySelector('div');

  test('it returns a new <li> element with truthy checked status', () => {
    const taskObj = mockTasks[0];
    const text = `<p>${taskObj.task}</p>`

    const result = constructModule.createTaskItem(taskObj);
    constructModule.createTaskItem(taskObj);

    container.appendChild(result);
    const newBtn = container.querySelector('.delete__btn');
    const newCheckbox = container.querySelector('input');
    newBtn.click();
    newCheckbox.click();

    expect(result.tagName).toBe('LI');
    expect(result.id).toBe(taskObj._id);
    expect(result.firstChild.checked).toBe(true);
    expect(result.innerHTML).toMatch(text);

    expect(spyIsChecked).toHaveBeenCalled();
    expect(spyAdoptChilds).toHaveBeenCalled();
    expect(spyDeleteTask).toHaveBeenCalled();
    expect(spyUpdateStatus).toHaveBeenCalled();
  });
});
