import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';

import FileViewer from 'react-file-viewer';

class FileViewerModal extends Component {
    constructor(props) {
        super(props);
    }

    fileViewerModal = (e) => {
        this.props.closeModal(true);
    };

    onError(e) {
        console.error(e, 'error in file-viewer'); // TODO: add toaster message here
    }

    render() {
        return (
            <Modal toggle={() => this.fileViewerModal()} isOpen={this.props.modal} size={'md'}>
                <ModalHeader toggle={() => this.fileViewerModal()}></ModalHeader>
                <ModalBody>
                <FileViewer
                    fileType={this.props.fileType}
                    filePath={this.props.filePath}
                    onError={this.onError}/>
                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
            </Modal>
        );
    }
}

export default FileViewerModal;
