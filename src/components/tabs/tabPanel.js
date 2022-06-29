import React from "react";

export default function TabPanel(props) {

    let linkCLass = (props.activeTab) ? 'active' : '';

    return (
        <li className={`nav-link ${linkCLass}`} onClick={() => props.onClick(props.children)}>
            <span className={linkCLass}>
                 {props.children}
            </span>
        </li>
    )
}
