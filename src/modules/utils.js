export const SERVER = 'SERVER';
export const DIRECTORY = 'DIRECTORY';
export const FILE = 'FILE';

export const findByIndex = indexes => array => {
    if (!Array.isArray(indexes) || !Array.isArray(array)) return null;
    const newIndexes = [...indexes];
    const currentIndex = newIndexes.shift();
    if (!array[currentIndex]) return null;
    if (newIndexes.length) return findByIndex(newIndexes)(array[currentIndex].child);

    return array[currentIndex];
};

export const changeChildValue = indexes => values => array => {
    if (!Array.isArray(indexes) || !Array.isArray(array)) return array;
    const newIndexes = [...indexes];
    const currentIndex = newIndexes.shift();
    if (!array[currentIndex]) return array;
    if (newIndexes.length) return changeChildValue(newIndexes)(values)(array.child);

    return [
        ...array.slice(0, currentIndex),
        Object.assign(array[currentIndex], { ...values }),
        ...array.slice(currentIndex + 1)
    ];
};


export const changeValue = index => values => array => {
    if (!Array.isArray(array) || !array[index]) return array;

    return [
        ...array.slice(0, index),
        Object.assign(array[index], { ...values }),
        ...array.slice(index + 1)
    ];
};
