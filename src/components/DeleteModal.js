import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteModal: false,
        };
    }

    deleteModalToggle = (e) => {
        if (e) {
            this.setState({
                isDeleteModal: true,
            });
            this.props.closeModal(true);
        }
    };

    submitAction = (value) => {
        this.props.submitAction(value);
        this.deleteModalToggle(true);
        //  this.props.closeModal(false);
    };

    render() {
        return (
            <Modal toggle={this.deleteModalToggle} isOpen={this.props.modal} size={'md'}>
                <ModalHeader toggle={this.deleteModalToggle}>
                    {this.props.hideButton ? '' : 'Delete Confirmation Modal'}
                </ModalHeader>

                <ModalBody>
                    <p className="font-size-16">
                        {this.props.message ? this.props.message : 'Are you sure you want to delete this?'}
                    </p>
                </ModalBody>
                {this.props.hideButton ? (
                    <ModalFooter></ModalFooter>
                ) : (
                    <ModalFooter>
                        <Button color="secondary" className="ml-1" onClick={(e) => this.props.closeModal(true)}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={(e) => this.submitAction(true)}>
                            Confirm
                        </Button>
                    </ModalFooter>
                )}
            </Modal>
        );
    }
}

export default DeleteModal;
