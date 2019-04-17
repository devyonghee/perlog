import React, {useState} from 'react';
import Presenter from './presenter';

const container = (props) => {
    const {files} = props;
    const [path, setPath] = useState('');

    const handlePathChange = e => {
        const {target: {value}} = e;
        setPath(value);
    };

    const handlePathKeyPress = e => {
        const {key} = e;
        if (key.toLowerCase() !== "enter") return;

        e.preventDefault();
        const {addFile} = props;
        addFile(path);
        setPath('');
    };

    return <Presenter files={files}
                      handlePathChange={handlePathChange}
                      handlePathKeyPress={handlePathKeyPress}
                      path={path}/>;
};

export default container;