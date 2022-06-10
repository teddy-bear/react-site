function Overlay(props) {

    return (
        <div className="fade modal-backdrop show" onClick={props.clicked}></div>
    )

}

export default Overlay;
