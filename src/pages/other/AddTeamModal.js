import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import Select from 'react-select';
import { Button, Input, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert } from 'reactstrap';
import { getLoggedInUser } from '../../helpers/authUtils';
import { BASE_URL } from '../../constants/endpoint';
import Loader from '../../components/Loader';

class AddTeam extends Component {
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
                const option = {
                    value: ele._id,
                    label: ele.fullName
                }
                users.push(option)
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
        fetch(BASE_URL + '/team/create', {
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
                    message: 'Internal Sever error.'
                });
            });
    }

    handleValidSubmit = (e, values) => {
        const userId = []
        this.state.selectedUsers.map(ele => {
            userId.push(ele.value)
        })
        let payload = { ...values, userId: userId, shortDesc: this.state.shortDesc };
        this.addMember(payload);
    }

    selectUser = (e) => {
        if (e) {
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
                        <AvGroup className="">
                            <Label for="team_name">Team Name</Label>
                            <InputGroup>
                                <AvInput
                                    type="text"
                                    name="teamName"
                                    id="teamName"
                                    placeholder="Team name"
                                //  required
                                />
                            </InputGroup>
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>
                        <AvGroup className="">
                            <Label for="shortDesc">Team Description</Label>
                            <Input
                                type="textarea"
                                name="shortDesc"
                                id="shortDesc"
                                onChange={(e) => {
                                    this.setState({
                                        shortDesc: e.target.value
                                    })
                                }}
                                placeholder="Team Description"
                                rows="2"
                            />
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>

                        <AvGroup className="mb-3">
                            <Label for="members">Members</Label>
                            <Select
                                placeholder="Members"
                                isMulti={true}
                                options={   this.state.userList.map(ele => {
                                    const option = {
                                        value: ele.value,
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


export default AddTeam;
