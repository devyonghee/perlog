import { types } from './actions';
import { colorsIndex } from './colors';
import { saveFiles, loadFiles } from '../storage';

const sortCompare = (preFile, curFile) => {
  if (preFile.isDirectory !== curFile.isDirectory) {
    return (preFile.isDirectory && !curFile.isDirectory) ? -1 : 1;
  }
  const icmp = preFile.name.toLowerCase().localeCompare(curFile.name.toLowerCase());
  if (icmp !== 0) return icmp;
  if (preFile.name > curFile.name) return 1;
  else if (preFile.name < curFile.name) return -1;
  else return 0;
};

const addDirectory = (state, { name, parent = null }) => {
  const newDirectory = {
    name: name.trim(),
    isDirectory: true,
    parent: null,
    route: name.trim(),
    child: [],
  };

  if (!parent) {
    return [...state, newDirectory].sort(sortCompare);
  }

  newDirectory.parent = parent;
  newDirectory.route = [parent.route, newDirectory.name].join('/');
  parent.child.push(newDirectory);
  parent.child.sort(sortCompare);
  saveFiles(state);
  return [...state];
};

const addFile = (state, { file, parent = null }) => {
  if (!file.name || !file.path) return state;

  const newFile = {
    name: file.name.trim(),
    route: file.name.trim(),
    path: file.path,
    isDirectory: false,
    parent: null,
    color: colorsIndex.next().value,
  };

  if (!parent) {
    return [...state, newFile].sort(sortCompare);
  }

  newFile.parent = parent;
  newFile.route = [parent.route, newFile.name].join('/');
  parent.child.push(newFile);
  parent.child.sort(sortCompare);
  saveFiles(state);
  return [...state];
};

const removeFile = (state, { file }) => {
  const parent = (!!file.parent) ? file.parent.child : state;
  parent.splice(parent.indexOf(file), 1);
  return [...state];
};

export default (state = loadFiles() || [], action) => {
  switch (action.type) {
    case types.ADD_DIRECTORY:
      return addDirectory(state, action);

    case types.ADD_FILE:
      return addFile(state, action);

    case types.REMOVE_FILE:
      return removeFile(state, action);

    default:
      return state;
  }
}