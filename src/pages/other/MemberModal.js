import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, CustomInput, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';
import { getLoggedInUser } from '../../helpers/authUtils';
import { BASE_URL } from '../../constants/endpoint';
import Loader from '../../components/Loader';
import AvRadio from 'availity-reactstrap-validation/lib/AvRadio';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';

class MemberModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    memberModalToggle = () => {
        this.setState({
            isAddMember: !this.state.isAddMember,
        });
        this.props.closeModal(false);
    };

    handleValidSubmit = (event, values) => {
        this.inviteMember(values);
    }

    inviteMember(values) {
        values = { ...values, isClient: values.memberType === 'client' ? true : false };
        this.setState({
            isLoading: true
        })
        let userInfo = getLoggedInUser();
        fetch(BASE_URL + '/users/invite-user', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                this.setState({
                    isLoading: false
                })
                if (response.success) {
                    this.setState({
                        err: false,
                        message: response.message
                    })
                    setTimeout(() => {
                        this.props.validSubmit()
                    }, 2000)
                } else {
                    this.setState({
                        err: true,
                        message: response.error ? response.error : response.message
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    err: true,
                    message: 'Internal Sever error.'
                });
            });
    }


    render() {
        return (
            <Modal toggle={this.memberModalToggle} className="authentication-form" isOpen={this.props.modal} size={'md'}>
                <ModalHeader toggle={this.props.toggle}>Invite Member</ModalHeader>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <ModalBody>
                        {this.state.err && this.state.message ? (
                            <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                        ) : this.state.message ? (
                            <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                        ) : null}
                        {this.state.isLoading && <Loader />}
                        <AvGroup className="">
                            <Label for="membername">Member Name</Label>
                            <InputGroup>
                                <AvInput
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="First name"
                                    required
                                />
                            </InputGroup>
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>
                        <AvGroup className="">
                            <Label for="email">Email</Label>
                            <InputGroup>
                                <AvInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="xyz@xyz.com"
                                    required
                                />
                            </InputGroup>
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>

                        <AvGroup className="">
                            <Label for="email">Member Type</Label>
                            <AvRadioGroup inline name="memberType" required>
                                <AvRadio label="Member" value="member" />
                                <AvRadio label="Client" value="client" />
                            </AvRadioGroup>
                        </AvGroup>

                        <AvGroup className="">
                            <Label for="position">Job Position</Label>
                            <InputGroup>
                                <AvInput
                                    type="text"
                                    name="position"
                                    id="position"
                                    placeholder="Sr. Software Developer"
                                    required
                                />
                            </InputGroup>
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" className="ml-1" onClick={this.props.toggle}>Cancel</Button>
                        <Button color="primary">Invite</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

export default MemberModal;
