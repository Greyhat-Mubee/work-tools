import React,{Component} from 'react';
import { bool, func, string } from 'prop-types';
import {Row, Column} from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    activeBar: {
        height: 56,
        width: 5,
        backgroundColor: '#DDE2FF',
        position: 'absolute',
        left: 0
    },
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: {
        color: '#DDE2FF'
    },
    container: {
        height: 56,
        width: 255,
        postion:'absolute',
        right:10,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 32,
        paddingRight: 32
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#A4A6B3',
        marginLeft: 24
    }
});

function SubMenu(props) {
    const { active, icon, title, ...otherProps } = props;
    const Icon = icon;
    return (
        <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
            <img src={Icon} style={{height:'25px',width:'25px'}}/>
            {active && <div className={css(styles.activeBar)}></div>}
            <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
        </Row>
    );
}

SubMenu.propTypes = {
    active: bool,
    title: string
};

export default SubMenu;