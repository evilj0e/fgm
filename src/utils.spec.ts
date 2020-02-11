import { camelize, clear, getCombinedName } from './utils';

describe('utils', () => {
  test('Should camelize text', () => {
    expect(camelize('Some 9)-c0mponent nAme')).toBe('Some9)-c0mponentName');
    expect(camelize('some name')).toBe('SomeName');
    expect(camelize('42')).toBe('42');
    expect(camelize('')).toBe('');
    expect(camelize('Some component name')).toBe('SomeComponentName');
  });
  
  test('Should clear text', () => {
    expect(clear('')).toBe('');
    expect(clear('42')).toBe('');
    expect(clear('a.53A')).toBe('a A');
    expect(clear('a-53-A-_      ')).toBe('a A');
    expect(clear('Some-component name')).toBe('Some component name');
  });
  
  test('Should getCombinedName', () => {
    expect(getCombinedName('Some component name')).toBe('SomeComponentName');
    expect(getCombinedName('Some-component name')).toBe('SomeComponentName1');
    expect(getCombinedName('Some-component.name')).toBe('SomeComponentName2');
    expect(getCombinedName('~!@#$%^&*()=+`[],?<>|\\{}Some-component.name')).toBe('SomeComponentName3');
    expect(getCombinedName('Some-component.name123')).toBe('SomeComponentName4');
    expect(getCombinedName('123Some-component.name123')).toBe('SomeComponentName5');
  });
});
