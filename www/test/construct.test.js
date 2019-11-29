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
});