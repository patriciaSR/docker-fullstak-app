import { adoptChilds, isChecked, createTag, createTaskItem } from '../js/construct.js';

describe('test list construction', () => {
  describe('createTag method', () => {
    test('it creates a new <p> element', () => {
      const newElement = createTag('p', 'hola que tal', 'text');

      expect(newElement.tagName).toBe('P');
      expect(newElement.textContent).toBe('hola que tal');
      expect(newElement.classList).toContain('text');
    });

    test('it creates a new <checkbox> element', () => {
      const newElement = createTag('input', 'hola que tal', 'check', 'checkbox');

      expect(newElement.tagName).toBe('INPUT');
      expect(newElement.textContent).toBe('hola que tal');
      expect(newElement.classList).toContain('check');
      expect(newElement.type).toBe('checkbox');
    });

    test('it returns null with no tag argument', () => {
      const newElement = createTag(undefined, 'hola que tal', 'check');

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

      const result = adoptChilds(mother, node1, node2, node3);

      expect(result.firstChild.tagName).toBe('P');
      expect(result.lastChild.tagName).toBe('A');
    });

    test('it ruturns mother without any child if not childs arguments', () => {
      document.body.innerHTML = `
        <div class="mother"></div>
      `;
      const mother = document.querySelector('.mother');

      const result = adoptChilds(mother);

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
      const status= true;
      const liItem = document.querySelector('li');
      const checkBox = document.querySelector('input');

      isChecked(liItem, checkBox, status );

      expect(liItem.classList).toContain('task-done');
    });

    test('it doesnt add task-done class when status db is false', () => {
      document.body.innerHTML = `
        <li>
          <input type="checkbox" />
        </li>
      `;
      const status= false;
      const liItem = document.querySelector('li');
      const checkBox = document.querySelector('input');

      isChecked(liItem, checkBox, status );

      expect(liItem.classList).not.toContain('task-done');
    });
  })
});
