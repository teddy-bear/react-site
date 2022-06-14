const Overlay = (props) => (
    props.show ? <div className="fade modal-backdrop show" onClick={props.clicked}></div> : null
);

export default Overlay;
