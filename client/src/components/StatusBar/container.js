import React, {useState, useLayoutEffect} from 'react';
import Presenter from './presenter';

const container = (props) => {
    const {messages} = props;

    const [now, setNow] = useState(new Date().getTime());
    const [start] = useState(new Date().getTime());

    useLayoutEffect(()=>{
        setInterval(() => setNow(new Date().getTime()), 1000)
    }, []);

    const elapsed = (now - start) / 1000;
    const minutes = Number(elapsed / 60).toFixed(0);
    let seconds = Number(elapsed % 60).toFixed(0);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    const prettyTime = minutes + ":" + seconds;
    const messageSpeed = (elapsed !== 0) ? (messages / elapsed).toFixed(2) : Number(0).toFixed(2);

    return <Presenter
        {...props}
        time={prettyTime}
        messageSpeed={messageSpeed}
        messages={messages}
    />;
};

export default container;