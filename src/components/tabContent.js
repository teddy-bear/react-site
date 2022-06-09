function TabContent(props) {

    /**
     * Transfer event options to the parent component via props lift
     * @param event
     */
    const handleTabContentClick = (event) => {
        props.onTabContentClick(event);
    }

    return (
        <div onClick={handleTabContentClick} className='inner'>{props.children}</div>
    )
}

export default TabContent;
