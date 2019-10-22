export const SERVER = 'SERVER';
export const DIRECTORY = 'DIRECTORY';
export const FILE = 'FILE';

export const changeValue = target => values => array => {
    if (!Array.isArray(array)) return array;
    const findIndex = array.findIndex(current => current === target);
    if (findIndex < 0) return array;

    return [
        ...array.slice(0, findIndex),
        { ...array[findIndex], ...values },
        ...array.slice(findIndex + 1)
    ];
};
