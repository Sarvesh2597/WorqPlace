import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';
import Loader from '../../components/Loader';

class DailyStandupModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    render() {  
        return (
            <Modal toggle={this.props.toggle} className="authentication-form" isOpen={this.props.isOpen} size={'md'}>
                <ModalHeader toggle={this.props.toggle}>{this.props.modalName}</ModalHeader>
                <AvForm onValidSubmit={this.props.modalSubmit}>
                    <ModalBody>
                        {this.state.err && this.state.message ? (
                            <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                        ) : this.state.message ? (
                            <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                        ) : null}
                        {this.state.isLoading && <Loader />}
                         {/* <AvGroup className="">
                            <Label for="title">Title</Label>
                            <InputGroup>
                                <AvInput
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.props.title}
                                    placeholder="Title"
                                    required
                                />
                            </InputGroup>
                            <AvFeedback>Title is required</AvFeedback>
                        </AvGroup> */}
                        <AvGroup className="">
                            <Label for="content">Note</Label>
                            <InputGroup>
                                <AvInput
                                    type="textarea"
                                    name="content"
                                    id="content"
                                    rows="10"
                                    value={this.props.content}
                                    placeholder="Write something down..."
                                />
                            </InputGroup>
                        </AvGroup>
                    </ModalBody>

                    <ModalFooter>
                    <Button color="secondary" className="ml-1" onClick={this.props.toggle}>Discard</Button>
                    <Button color="primary">Save</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

export default DailyStandupModal;
