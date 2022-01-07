import React from 'react';
import { bool, string } from 'prop-types';
import {Row} from 'simple-flexbox';

function Menu(props) {
    const { active, title, ...otherProps } = props;
    return (
        <Row className={`menuContainer ${active ? "activeContainer" : ""}`} vertical="center" {...otherProps}>
            {active && <div className="activeBar"></div>}
            <span className={`menutitle ${active ? "activeTitle":""}`}>{title}</span>
        </Row>
    );
}

Menu.propTypes = {
    active: bool,
    title: string
};

export default Menu;