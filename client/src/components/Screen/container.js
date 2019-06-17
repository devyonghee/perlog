import React, {useRef, useEffect, useState} from 'react';
import Presenter from './presenter';

const container = (props) => {
    const screen = useRef(null);
    const [preScrollHeight, setPreScrollHeight] = useState(0);
    const [filterString, setFilterString] = useState('');
    const handleFilterStringChange = e => e.preventDefault() & setFilterString(e.target.value);


    useEffect(() => {
        if (!screen.current ||
            !screen.current.scrollHeight ||
            screen.current.scrollHeight <= preScrollHeight ||
            (screen.current.clientHeight + screen.current.scrollTop) < preScrollHeight) {
            return;
        }

        screen.current.scrollTop = screen.current.scrollHeight - screen.current.clientHeight;
        setPreScrollHeight(screen.current.scrollHeight)
    });

    return <Presenter
        {...props}
        screenRef={screen}
        filterString={filterString}
        handleFilterStringChange={handleFilterStringChange}
    />;
};

export default container;