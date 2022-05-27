import React, { Component } from 'react';
import {
    Button, InputGroup, Label, Modal,
    ModalBody,
    ModalFooter, ModalHeader,
    UncontrolledAlert
} from 'reactstrap';
import FileUploader from '../../components/FileUploader';
import { BASE_URL } from '../../constants/endpoint';
import { getSelectedTeam, getLoggedInUser } from '../../helpers/authUtils';
import { Loader } from 'react-feather';

class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isfileModal: false,
        }
    }


    uploadModalToggle = (e) => {
        if (e) {
            this.setState({
                isfileModal: true,
            });
            this.props.closeModal(true);
        }
    };

    submitAction = (value) => {
        const selectedTeam = getSelectedTeam();
        const userInfo = getLoggedInUser();
        var bodyFormData = new FormData();
        this.setState({
            isLoading: true,
        });
        bodyFormData.append('files', this.state.selectedPhoto);
        bodyFormData.append('teamId', selectedTeam._id);
        fetch(BASE_URL + '/document/uploadfiles', {
            method: 'POST',
            body: bodyFormData,
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.error) {
                    this.setState({
                        isLoading: false,
                        err: true,
                        message: 'Error occured while Adding document',
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        err: false,
                        message: response.message
                    });
                    setTimeout(() => {
                        this.props.modalSubmitted();
                    }, 2000)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <Modal toggle={this.uploadModalToggle} isOpen={this.props.modal} size={'md'}>
                <ModalHeader toggle={this.uploadModalToggle}>Upload Files</ModalHeader>
                <ModalBody>
                    {this.state.err && this.state.message ? (
                        <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                    ) : this.state.message ? (
                        <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                    ) : null}
                    {this.state.isLoading && <Loader />}
                    <FileUploader onFileUpload={(files) => {
                        this.setState({
                            selectedPhoto: files[0],
                            disableSubmit: false,
                        });
                    }} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className="ml-1" onClick={(e) => this.submitAction(false)}>Cancel</Button>
                    <Button color="primary" onClick={(e) => this.submitAction(true)}>Confirm</Button>
                </ModalFooter>

            </Modal>
        );
    }
}


export default UploadFiles;
