import React, {Component, createRef} from 'react';
import SideBar from 'components/SideBar';
import Header from 'components/Header';
import styles from "./styles.module.scss";

class BaseLayout extends Component {
    mainPanelRef = createRef();

    resizeFunction = () => {

    };

    componentDidMount() {
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(prevProp, prevState, snapshot) {
        this.mainPanelRef.scrollTop = 0;
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Header/>
                <SideBar logoText={"pdev2"}/>
                <div className={styles.mainPanel} ref={this.mainPanelRef}>
                </div>
            </div>
        );
    }
}

export default BaseLayout;