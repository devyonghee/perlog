export const SERVER = 'SERVER';
export const DIRECTORY = 'DIRECTORY';
export const FILE = 'FILE';


export const changeMiddleValue = index => values => array => {
    if (!array.hasOwnProperty(index)) return array;
    return [
        ...array.slice(0, index),
        { ...array[index], ...values },
        ...array.slice(index + 1)
    ];
};
