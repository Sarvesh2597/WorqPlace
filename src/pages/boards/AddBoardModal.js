
import React, { Component } from 'react';

import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledAlert, FormGroup, Input, Form, Spinner } from 'reactstrap';
import { getSelectedTeam, getLoggedInUser } from '../../helpers/authUtils';

import {BASE_URL} from '../../constants/endpoint';
import { Redirect } from 'react-router-dom';


class AddBoardModal extends Component {
    constructor(props) {
        super(props);
        const selectedTeam = getSelectedTeam();
        this.state = {
            postboard: this.props.isEdit ? this.props.selectedBoard : {teamId: selectedTeam._id},
            formSubmitted: false,
            err: false,
            message: '',
            userInfo: getLoggedInUser()
        }
    }

    addBoards = () => {
        this.setState({
            isLoading: true,
        });
        fetch(BASE_URL + '/board/create', {
            method: 'POST',
            body: JSON.stringify(this.state.postboard),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            return res.json();
        })
            .then((response) => {
                   if(response.success) {
                       this.setState({
                        isLoading: false,
                        // err: false,
                        logout: false,
                        // message: response.message
                    });
                    // setTimeout(() => {/
                        this.props.modalSubmitted();
                    // }, 2000)
                    } else {
                        this.setState({
                            isLoading: false,
                            err: true,
                            message: response.message,
                        })
                    }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    err: true,
                    logout: false,
                    message:'Internal server error.'
                });
                console.error('Error:', error);
            });
    }

    updateBoard = () => {
        const payload = {
            boardName: this.state.postboard.boardName,
            shortDesc: this.state.postboard.shortDesc,
            tag: this.state.postboard.tag,
        };
        fetch(BASE_URL + '/board/' + this.props.selectedBoard._id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            return res.json();
        })
            .then((response) => {
                   if(response.error) {
                       this.setState({
                           isLoading: false,
                           err: true,
                           message: 'Error occured while updating document',
                       })
                    } else {
                        this.setState({
                            isLoading: false,
                            // err: false,
                            // message: response.message
                        });
                        // setTimeout(() => {
                            this.props.modalSubmitted();
                        // }, 2000)
                    }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        console.log(this.props)
        if(this.state.formSubmitted) {
            return <Redirect to="/boards"></Redirect>
        }

        const colors = ['primary'];
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.modal} size={'md'}>
                 {this.state.isLoading ?
                            <div>                              
                             <Spinner className="loader-spinner" color={colors} />;                            
                            </div>
                            : null }
                <ModalHeader toggle={this.props.toggle}>{this.props.isEdit ? 'Update Board' :'Create Board'}</ModalHeader>
                    <ModalBody>
                        {this.state.err && this.state.message ? (
                            <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                        ) : this.state.message ? (
                            <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                        ) : null}
                       
                        <Form>
                         <FormGroup>
                             <Label for="boardName">Board Name</Label>
                             <Input type="text" id="boardName" value={this.state.postboard.boardName} onChange={(e) => this.setState({
                                 postboard: {...this.state.postboard, boardName: e.target.value}
                             })} name="boardName"></Input>
                         </FormGroup>
                         <FormGroup>
                             <Label for="shortDesc">Board Description</Label>
                             <Input type="text" id="shortDesc" name="shortDesc" value={this.state.postboard.shortDesc} onChange={(e) => this.setState({
                                 postboard: {...this.state.postboard, shortDesc: e.target.value}
                             })}></Input>
                         </FormGroup>
                         <FormGroup>
                             <Label for="Tag">Tag</Label>
                             <Input type="text" id="tag" name="tag" value={this.state.postboard.tag} onChange={(e) => this.setState({
                                 postboard: {...this.state.postboard, tag: e.target.value}
                             })}></Input>
                         </FormGroup>
                         </Form>
                         
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" className="ml-1" disabled={this.state.submitDisabled|| this.state.err} onClick={this.props.toggle}>Cancel</Button>
                        <Button color="primary" type="submit" onClick={(e) => {
                           this.props.isEdit ? this.updateBoard() : this.addBoards();
                        }}>{!this.props.isEdit ? 'Add' : 'Update'}</Button>
                    </ModalFooter>
            </Modal>
        );
    }
}

export default AddBoardModal;
