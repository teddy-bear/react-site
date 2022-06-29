import React from "react";

export default function TabContent(props) {

    let linkCLass = (props.activeTab) ? 'active' : '';

    return (
        <div className={`tab-pane ${linkCLass}`}>{props.children}</div>
    )
}
