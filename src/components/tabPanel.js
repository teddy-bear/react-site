function TabPanel(props) {
    let linkCLass = (props.activeTab) ? 'nav-link active' : 'nav-link';
    return (
        <li className='nav-item' onClick={() => props.onClick(props.children)}>
            <span className={linkCLass}>
                 {props.children}
            </span>
        </li>
    )
}

export default TabPanel;