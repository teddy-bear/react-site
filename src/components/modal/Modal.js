import React from "react";
import Aux from "../hoc/Aux";
import Overlay from "../functional/Overlay";

function Modal(props) {

    const modalClose = () => {
        props.onModalClose();
    }

    //if (props.show) {
    return (
        <Aux>
            <div className='modal fade show' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title || 'Modal'}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => modalClose()}
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Overlay show={props.show} clicked={props.onModalClose}/>
        </Aux>
    )
    ///}
}

export default Modal;