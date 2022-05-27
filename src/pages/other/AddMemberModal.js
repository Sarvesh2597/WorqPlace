import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import Select from 'react-select';
import { Button, Input, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';
import { getLoggedInUser } from '../../helpers/authUtils';
import { BASE_URL } from '../../constants/endpoint';
import Loader from '../../components/Loader';

class AddMemberModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            userList:  []
        };
    }

    componentDidMount = () => {
        const userInfo = getLoggedInUser();
        const users = []
        this.props.userList.map(ele => {
            if(ele._id !== userInfo.id) {
                if (this.props.selctedTeam.userId.map(function(e) { return e._id; }).indexOf(ele._id) === -1) {
                    const option = {
                        value: ele._id,
                        label: ele.fullName,
                        isClient: ele.isClient
                    }
                    users.push(option)
                }
            }
        })
        this.setState({userList: users})
    }

    teamModalToggle = () => {
        this.setState({
            isaAddTeam: true,
        });
        this.props.closeModal(false);
    };

    addMember = (values) => {
        this.setState({
            isLoading: true
        })
        const userInfo = getLoggedInUser();
        fetch(BASE_URL + '/team/addmember', {
            method: 'PUT',
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
                    // this.setState({
                    //     err: false,
                    //     message: response.message
                    // })
                    // setTimeout(()=> {
                        this.props.validSubmit()
                    // }, 2000)
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
                    isLoading: false,
                    message: 'Internal Sever error.'
                });
            });
    }

    handleValidSubmit = (e, values) => {
        const userId = []
        console.log(this.state.selectedUsers);
        this.state.selectedUsers.map(ele => {
            console.log(ele);
            userId.push({userId: ele.value, isClient: ele.isClient})
        })
        let payload = {
            userId: userId,
            id: this.props.selctedTeam._id
        };
        this.addMember(payload);
    }

    selectUser = (e) => {
        if (e) {
            console.log(e);
            this.setState({ selectedUsers: e });
        }
    }

    render() {
        return (
            <Modal toggle={this.teamModalToggle} isOpen={this.props.modal} size={'md'}>
                <ModalHeader toggle={this.teamModalToggle}>Add Team</ModalHeader>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <ModalBody>
                        {this.state.err && this.state.message ? (
                            <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                        ) : this.state.message ? (
                            <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                        ) : null}
                        {this.state.isLoading && <Loader />}

                        <AvGroup className="mb-3">
                            <Label for="members">Members</Label>
                            <Select
                                placeholder="Members"
                                isMulti={true}
                                options={   this.state.userList.map(ele => {
                                    const option = {
                                        value: ele.value,
                                        isClient: ele.isClient,
                                        label: ele.label
                                    }
                                    return option
                                })}
                                onChange={this.selectUser}
                                className="react-select"
                                classNamePrefix="react-select" required></Select>
                        </AvGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" className="ml-1" onClick={this.teamModalToggle}>Cancel</Button>
                        <Button color="primary" type="submit">Add</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}


export default AddMemberModal;
