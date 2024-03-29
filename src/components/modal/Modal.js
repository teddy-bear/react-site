import React from "react";
import Overlay from "../functional/Overlay";

function Modal(props) {

    //if (props.show) {
    return (
        <>
            <div className={`modal fade show ${props.cssClass}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title || 'Modal'}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={props.handleModal}
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
            <Overlay show={props.show} clicked={props.handleModal}/>
        </>
    )
    ///}
}

export default Modal;