const generatedNames: { [key: string]: string } = {};

export const camelize = (name: string): string =>
  name.split(' ').reduce((res, word) => {
    const w = word.trim();
    const combinedWord = w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '';

    return res + combinedWord;
  }, '');

export const clear = (string: string): string =>
  string
    .replace(/[-\.]/g, ' ')
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

export const getCombinedName = (name: string, counter: number = 0): string => {
  const postfix = counter || '';
  const clearedName = counter ? name : camelize(clear(name));
  const currentName = clearedName + postfix;

  if (generatedNames[currentName]) {
    return getCombinedName(clearedName, counter + 1);
  }
  generatedNames[currentName] = currentName;

  return currentName;
};
