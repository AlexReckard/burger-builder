import React, {useState} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/_Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);
    // state = {
    //     showSideDrawer: false
    // };

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
        // this.setState({showSideDrawer: false});
    };

    const sideDrawerToggleHandler = () => {
      setSideDrawerVisible(!sideDrawerVisible);
      //   this.setState((prevState) => {
      //     return {showSideDrawer: !prevState.showSideDrawer};
      // });
    };

    // render() {
        return (
          <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerVisible}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
          </Aux>
        );
    // };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);
