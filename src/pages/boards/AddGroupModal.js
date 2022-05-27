import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, InputGroup, Label, Media, Modal, Card, CardBody, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import FileUploader from '../../components/FileUploader';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { BASE_URL } from '../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
const moment = require('moment');

const FilesList = ({ name, description, time }) => {
    return (
        <Media className="mt-1 border-top pt-3">
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-0">{description}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{time}</h6>
            </Media>
        </Media>
    )
}
const TaskComment = (item) => {
    return (
        // <div className="comments-box">
        <Media className="mt-3 p-1">
            {/* <img src={item.author_avatar} className="mr-2 rounded-circle" height="36" alt="" /> */}

            <Media body>
                <h5 className="mt-0 mb-0 font-size-14">
                    <span className="float-right text-muted font-size-12">{moment(item.timestamp).format("DD-MM-YYYY HH:mm")}</span>
                    {item.userName}
                </h5>
                <p className="mt-1 mb-0 text-muted">{item.message}</p>
            </Media>

        </Media>
        // </div>
    );
};

class CommentsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: null
        }
    }

    addComment = (e) => {
        e.preventDefault();
        this.props.addComment(this.state.comment);
        this.setState({
            comment: ''
        })
    }

    render() {
        return (
            <React.Fragment>

                <h5 className="mb-2 font-size-16">Comments</h5>
                <div className="comments-box">
                    {this.props.comments.map((item, idx) => {
                        return (

                            <React.Fragment key={idx}>

                                <TaskComment {...item} />

                                <hr />

                            </React.Fragment>

                        );
                    })}
                </div>

                <div className="border rounded">
                    <div className="comment-area-box mt-3">
                        <textarea
                            rows="2"
                            className="form-control border-0 resize-none"
                            value={this.state.comment}
                            placeholder="Your comment..." onChange={(e) => {
                                this.setState({
                                    comment: e.target.value
                                })
                            }}></textarea>
                        <div className="p-2">
                            <div className="float-right">
                                <button className="btn btn-sm btn-success mt-3"
                                    onClick={this.addComment}
                                // onClick={this.props.addComment(this.state.comment)}
                                >
                                    <i className="uil uil-message mr-1"></i>Submit
                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


class AddGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            comments: props.selectedTask ? props.selectedTask.comments : [],
            attachments: props.selectedTask ? props.selectedTask.attachments : [],
        }
    }

    // componentDidMount = () => {
    // }

    groupModalToggle = () => {
        this.setState({
            isAddGroup: true,
        });
    };

    handleValidSubmit = (e, values) => {
        const payload =
        {
            'title': values.title,
            'description': this.state.description,
            'assignTo': [...this.state.selectedUsers.map(ele => {
                let obj = {
                    userId: ele._id,
                    userName: ele.fullName
                }
                return obj;
            })],
            'boardId': this.props.data.selectedBoardId,
            'tasksListId': this.props.data.selectedTasksListId,
            'dueDate': values.dueDate,
            'priority': this.state.selectedPriority.value,
            'status': 'todo',
            comments: this.state.comments
        }
        this.createTask(payload);
    }

    createTask = (payload) => {
        const userInfo = getLoggedInUser();
        fetch(BASE_URL + '/tasklist/task/create', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        err: false,
                        message: response.message,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        err: true,
                        logout: false,
                        message: response.message,
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

    selectUser = (e) => {
        if (e) {
            this.setState({ selectedUsers: e });
        }
    }

    addComment = (value) => {
        const userInfo = getLoggedInUser();
        if (this.props.selectedTask) {
            const payload = {
                taskId: this.props.selectedTask._id,
                comments: {
                    userName: userInfo.fullName,
                    message: value
                }
            }
            fetch(BASE_URL + '/tasklist/task/addcomment', {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    if (response.success) {
                        this.setState({
                            isLoading: false,
                            err: false,
                            message: response.message,
                            comments: response.comments
                        })
                    } else {
                        this.setState({
                            isLoading: false,
                            err: true,
                            logout: false,
                            message: response.message,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {

        }
    }

    addAttachment = () => {
        const userInfo = getLoggedInUser();
        const selectedTeam = getSelectedTeam();
        const bodyFormData = new FormData();
        bodyFormData.append('attachments', this.state.selectedAttachment);
        bodyFormData.append('taskId', this.props.selectedTask._id);
        bodyFormData.append('teamId', selectedTeam._id);
        fetch(BASE_URL + '/tasklist/task/addAttachments', {
            method: 'PUT',
            body: bodyFormData,
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        err: false,
                        message: response.message,
                        comments: response.comments
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        err: true,
                        logout: false,
                        message: response.message,
                    });
                    setTimeout(() => {
                        // this.props.modalSubmitted();

                    }, 2000)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        console.log(this.props);
        return (
            <Modal
                isOpen={this.props.modal}
                className={this.state.className}
                size={'xl'}>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <ModalHeader toggle={this.props.toggle} className="w-100">
                        <AvGroup>
                            <InputGroup className="header-input">
                                <AvInput
                                    type="text"
                                    name="title"
                                    value={this.props.isEditModal ? this.props.selectedTask.title : null}
                                    className="input-field header-input"
                                    id="title"
                                    placeholder="Enter Todo Name"
                                />
                            </InputGroup>
                            <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={9}>
                                <Form>
                                    <FormGroup>
                                        <h5 className=" mt-2 mb-3">Task Description</h5>

                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={this.props.isEditModal ? this.props.selectedTask.description : null}
                                            onInit={editor => {
                                                editor.editing.view.change(writer => {
                                                    writer.setStyle(
                                                        "height",
                                                        "18rem",
                                                        editor.editing.view.document.getRoot()
                                                    );
                                                });
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                const post = { ...this.state.postDoc };
                                                post['fileContent'] = data;
                                                this.setState({
                                                    postDoc: post
                                                })
                                            }}
                                        />
                                    </FormGroup>
                                </Form>
                                <CommentsComponent comments={this.state.comments} addComment={this.addComment}></CommentsComponent>
                            </Col>
                            <Col lg={3} className="border-left">
                                <AvGroup>
                                    <Label for="Priority">Priority</Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name='status'
                                        onChange={e => { this.setState({ selectedPriority: e }) }}
                                        id='status'
                                        options={[
                                            { value: 'Low', label: 'Low' },
                                            { value: 'Medium', label: 'Medium' },
                                            { value: 'High', label: 'High' },
                                        ]}></Select>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="assignTo">Assign To</Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        value={this.state.selectedUsers}
                                        options={this.props.users.length > 0 ? [...this.props.users.map(ele => {
                                            ele.value = ele._id;
                                            ele.label = ele.fullName;
                                            return ele;
                                        })] : []}
                                        onChange={this.selectUser}>
                                    </Select>
                                </AvGroup>

                                <AvGroup>
                                    <Label for="dueDate">Due Date</Label>
                                    <InputGroup>
                                        <AvInput
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            onChange={e => console.log(e)}
                                            value={this.props.task ? this.props.task.dueDate : '2020-08-20T00:00:00.000Z'}
                                            placeholder="date placeholder"
                                        />
                                    </InputGroup>
                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="files">Attachment</Label>
                                    <FileUploader onFileUpload={(files) => {
                                        this.setState({
                                            selectedAttachment: files[0],
                                            disableSubmit: false
                                        });
                                        setTimeout(this.addAttachment, 100)
                                    }} />
                                </AvGroup>

                                <Card className="project-border">
                                    <CardBody>

                                        <FilesList name="API Details" description="End points for testing APIs." />
                                        <FilesList name="Authentication system design" description="OAuth 2.0 POC" />
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </ModalBody >
                    <ModalFooter>
                        <Button color="secondary" onClick={(e) => {
                            e.preventDefault();
                            this.props.toggle();
                        }}>
                            Cancel
                     </Button>
                        <Button color="primary" className="ml-1" type="submit" onClick={this.groupModalToggle}>
                            Save
                     </Button>
                    </ModalFooter>
                </AvForm>
            </Modal >
        );
    }
}
export default AddGroupModal;
