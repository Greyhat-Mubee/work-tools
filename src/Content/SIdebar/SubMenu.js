import React from 'react';
import { bool, string } from 'prop-types';
import {Row} from 'simple-flexbox';
function SubMenu(props) {
    const { active, icon, title, ...otherProps } = props;
    const Icon = icon;
    return (
        <Row className={`subMenuContainer ${active ? "activeContainer": ""}`} vertical="center" {...otherProps}>
            <img src={Icon} className='subMenuImage' alt=' sub menu icon'/>
            {active && <div className="activeBar"></div>}
            <span className={`menutitle ${active ? "activeTitle": ""}`}>{title}</span>
        </Row>
    );
}

SubMenu.propTypes = {
    active: bool,
    title: string
};

export default SubMenu;