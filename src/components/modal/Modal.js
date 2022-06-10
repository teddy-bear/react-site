import Aux from "../hoc/Aux";

function Modal(props) {
    let modalClass = (props.show) ? 'modal fade show' : 'modal fade';

    const modalClose = () => {
        console.log('overlay clicked')
        props.onModalClose();
    }

    return (
        <Aux>
            <div className='modal fade show' id="exampleModal"
                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                 onClick={() => modalClose()}
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fade modal-backdrop show" onClick={() => modalClose()}></div>
        </Aux>
    )
}

export default Modal;