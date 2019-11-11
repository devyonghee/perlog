export const SERVER = 'SERVER';
export const DIRECTORY = 'DIRECTORY';
export const FILE = 'FILE';

export const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url;
export const replaceUrl = url => url.trim().toLowerCase().replace('\\', '');


export const findByIndexWithRoute = (indexes, routes = []) => array => {
    if (!Array.isArray(indexes) || !Array.isArray(array)) return null;
    const newIndexes = [...indexes];
    const currentIndex = newIndexes.shift();
    if (!array[currentIndex]) return null;
    if (newIndexes.length) return findByIndexWithRoute(newIndexes, routes.concat(array[currentIndex].name))(array[currentIndex].child);

    return { ...array[currentIndex], route: routes.join('/') };
};


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
    if (!array[currentIndex] || (newIndexes.length && array[currentIndex].type === FILE)) return array;
    if (newIndexes.length) {
        return [
            ...array.slice(0, currentIndex),
            {
                ...array[currentIndex],
                child: changeChildValue(newIndexes)(values)(array[currentIndex].child)
            },
            ...array.slice(currentIndex + 1)
        ];
    }

    return [
        ...array.slice(0, currentIndex),
        Object.assign(array[currentIndex], values),
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
