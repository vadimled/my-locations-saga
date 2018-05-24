import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const Popup = (props) => {

    const {isOpen, toggle, onClickYes, onClickCancel, message} = props;
        return (
            <Modal role="document"
                   isOpen={isOpen}
                   toggle={toggle}>
                <ModalHeader toggle={toggle}>{message}
                </ModalHeader>
                <ModalBody>
                    Are you sure?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onClickYes}>Yes</Button>{' '}
                    <Button color="secondary" onClick={onClickCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>

        );
};

export default Popup;


