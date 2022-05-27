import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import Select from 'react-select';
import {
    Button,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Label,
    Media,
    Modal,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import FileUploader from '../../../components/FileUploader';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

import { BASE_URL } from '../../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../../helpers/authUtils';
import Comments from './Comments';
import { Check, X, Trash } from 'react-feather';
import { Parser } from 'html-to-react';
import { debounce, throttle } from 'lodash';
import FileViewerModal from '../../../components/FileViewer';

var htmlToReactParser = new Parser();
const rowstyle = { display: 'flex', flexDirection: 'row' };
class TaskModal extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.throttleChangeTitleText = debounce(this.throttleChangeTitleText.bind(this), 500);
        let userInfo = getLoggedInUser();
        let teamInfo = getSelectedTeam();
        this.state = {
            title: '',
            description: '',
            changeInDescription: false,
            comments: '',
            attachments: null,
            postDoc: null,
            priority: null,
            dueDate: null,
            content: 'content',
            user: null,
            commentsData: null,
            editTitle: false,
            editDescription: true,
            attachmentsData: null,
            editTitleText: false,
            modalTitle: this.props.updateData.title ? this.props.updateData.title : 'Untitled',
            username: 'Title',
            reporter: '',
            userInfo,
            teamInfo,
        };
    }

    componentDidMount = () => {
        const { updateData } = this.props;
        if (updateData) {
            this.setState({
                title: updateData?.title,
                description: updateData?.description,
                commentsData: this.props.updateData?.comments.reverse(),
                priority: { value: updateData?.priority, label: updateData?.priority },
                dueDate: updateData?.dueDate && updateData?.dueDate.slice(0, 10),
                attachmentsData: updateData?.attachments,
                reporter: updateData?.createdBy.userName,
                user: updateData?.assignTo.map((ele) => ({
                    key: ele?.userId,
                    value: ele?.userId,
                    label: ele?.userName,
                })),
            });
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.updateData && prevProps.updateData !== this.props.updateData) {
            const updateData = this.props.updateData;
            console.log(updateData);
            this.setState({
                title: updateData?.title,
                description: updateData?.description,
                commentsData: this.props.updateData?.comments.reverse(),
                priority: { value: updateData?.priority, label: updateData?.priority },
                dueDate: updateData?.dueDate && updateData?.dueDate.slice(0, 10),
                attachmentsData: updateData?.attachments,
                reporter: updateData?.createdBy.userName,
                user: updateData?.assignTo.map((ele) => ({
                    key: ele?.userId,
                    value: ele?.userId,
                    label: ele?.userName,
                })),
            });
        }
    }

    handleValidSubmit = (e, values) => {
        var assignTo;

        if (this.state.user && this.state.user.length > 0) {
            const users = this.state.user;
            assignTo = users.map((s) => ({
                userId: s.value,
                userName: s.label,
            }));
        }

        const data = {
            title: this.state.title,
            description: this.state.description,
            boardId: this.props.boardId,
            tasksListId: this.props.listData,
            dueDate: this.state.dueDate,
            priority: this.state.priority?.value,
            // status: 'todo',
            assignTo: assignTo,
        };

        this.props.createTask(JSON.stringify(data), {
            'Content-Type': 'application/json',
        });
        this.props.closeModal();
    };

    handleAssingTo = (e) => {
        if (e) {
            this.setState({ user: e }, () => {
                if (this.props.updateData) {
                    let assignTo = this.state.user.map((s) => ({
                        userId: s.value,
                        userName: s.label,
                    }));
                    this.props.updateTask(this.props.updateData?._id, {
                        assignTo: assignTo,
                        description: this.state.description,
                    });
                }
            });
        }
    };
    handlePriority = (e) => {
        if (e) {
            this.setState({ priority: e }, () => {
                if (this.props.updateData) {
                    this.props.updateTask(this.props.updateData?._id, {
                        priority: this.state.priority?.value,
                        description: this.state.description,
                    });
                }
            });
        }
    };
    handleDueDate = (e) => {
        if (e) {
            this.setState({ dueDate: e }, () => {
                if (this.props.updateData) {
                    this.props.updateTask(this.props.updateData?._id, {
                        dueDate: this.state.dueDate,
                        description: this.state.description,
                    });
                }
            });
        }
    };
    onChangeComments = (comments) => {
        if (comments) {
            this.setState({ comments });
        }
    };
    postComments = (e) => {
        const payload = {
            userId: this.state.userInfo?.id,
            userName: this.state.userInfo?.fullName,
            message: this.state.comments,
            timestamp: Date.now(),
        };
        if (this.state.commentsData && this.state.commentsData.length > 0) {
            this.state.commentsData.push(payload);
            this.state.commentsData.reverse();
            this.setState({ commentsData: this.state.commentsData, comments: '' });
        } else {
            this.setState({ commentsData: [payload], comments: '' });
        }

        this.props.postComments({ taskId: this.props.updateData?._id, comments: payload });
    };
    addAttachment = () => {
        const bodyFormData = new FormData();
        bodyFormData.append('attachments', this.state.attachments);
        bodyFormData.append('taskId', this.props.updateData?._id);
        bodyFormData.append('teamId', this.state.teamInfo._id);
        this.props.addAttachments(bodyFormData);
    };
    handleCancel = (data) => {
        let { state } = data;
        this.setState(state);
    };
    handleSave = (data) => {
        const {
            state: { editTitle, editDescription },
        } = data;
        if (editTitle === false) {
            this.props.updateTask(this.props.updateData?._id, {
                title: this.state.title,
                description: this.state.description,
            });
        }
        if (editDescription === false) {
            this.props.updateTask(this.props.updateData?._id, {
                description: this.state.description,
            });
        }
        this.setState(data.state);
    };

    deleteComment = (id) => {
        this.props.deleteComment({
            taskId: this.props.updateData?._id,
            commentId: id,
        });
    };

    deleteAttachment = (id) => {
        this.props.deleteAttachment({
            taskId: this.props.updateData?._id,
            attachmentid: id,
        });
    };
    changeTitleText = (event) => {
        this.props.updateTask(this.props.updateData?._id, {
            title: event,
            description: this.state.description,
        });
    };

    throttleChangeTitleText(edata) {
        this.changeTitleText(edata);
    }

    onFocusSave = () => {
        this.setState({
            editTitleText: false,
        });
    };

    onFocusSaveDescription = () => {
        this.setState({
            editDescription: false,
        });
        this.props.updateTask(this.props.updateData?._id, {
            description: this.state.description,
        });
    };

    onReady(eventData) {
        eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new UploadAdapter(loader);
        };
    }

    onFileViewer = (file) => {
        this.setState({
            filePath: file.fileUrl,
            fileType: file?.fileName?.split('.')[1],
            fileViewerModal: true,
        });
    };

    render() {
        const { updateData } = this.props;
        const { editTitle, editDescription, editTitleText, modalTitle } = this.state;

        let users = [];
        if (this.props.users) {
            this.props.users.map((ele) => {
                let data = {
                    key: ele?._id,
                    value: ele?._id,
                    label: ele?.fullName,
                };
                users.push(data);
            });
        }
        const EditActions = (state) => {
            return (
                <button onClick={() => this.onFocusSaveDescription()} className="check-circule btn-sm">
                    Save
                </button>
            );
        };

        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.modal} className={this.state.className} size={'xl'}>
                <AvForm>
                    {/* TITLE CREATE AND EDIT CONDITIONALLY RENDERED */}
                    <ModalHeader
                        toggle={this.props.toggle}
                        className="w-100"
                        style={{ padding: '1.5rem 0.5rem 0rem 1rem', borderBottom: 'none' }}>
                        <div style={{ Width: '100%', minWidth: '50px' }}>
                            <textarea
                                className="input-textarea"
                                ref={this.inputRef}
                                value={modalTitle}
                                onChange={(e) => {
                                    this.setState({
                                        modalTitle: e.target.value,
                                    });
                                    this.throttleChangeTitleText(e.target.value);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        this.inputRef.current.blur();
                                    }
                                }}
                                dir="auto"
                                style={{
                                    overflow: 'hidden',
                                    height: '32px',
                                    overflowWrap: 'break-word',
                                    maxHeight: '90vh',
                                }}></textarea>
                        </div>
                    </ModalHeader>
                    <ModalBody style={{ height: '90vh', overflowY: 'scroll' }}>
                        <Row>
                            {/* DESCRIPTION CREATE AND EDIT CONDITIONALLY RENDERED */}
                            <Col lg={9}>
                                {/* {!editDescription && updateData ? (
                                    <>
                                        <h6>Task Description</h6>
                                        <div
                                            style={{
                                                minHeight: '18rem',
                                                height: '18rem',
                                                overflowY: 'scroll',
                                                wordBreak: 'break-all',
                                                border: '1px solid #c7c7c7',
                                                padding: '5px',
                                            }}
                                            onClick={() =>
                                                this.setState({
                                                    editDescription: true,
                                                })
                                            }>
                                            {htmlToReactParser.parse(this.state.description)}
                                        </div>
                                    </>
                                ) : ( */}
                                <div>
                                    <FormGroup>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '5px',
                                            }}>
                                            <h6>Task Description</h6>
                                            {/* <EditActions /> */}
                                        </div>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={this.state.description ? this.state.description : ''}
                                            onInit={(editor) => {
                                                editor.editing.view.change((writer) => {
                                                    writer.setStyle(
                                                        'height',
                                                        '25rem',
                                                        editor.editing.view.document.getRoot()
                                                    );
                                                });
                                            }}
                                            config={{
                                                toolbar: [
                                                    'heading',
                                                    '|',
                                                    'bold',
                                                    'italic',
                                                    'underline',
                                                    'fontColor',
                                                    '|',
                                                    'numberedList',
                                                    'bulletedList',
                                                    'indent',
                                                    'outdent',
                                                    '|',
                                                    'imageInsert',
                                                    'blockQuote',
                                                    'insertTable',
                                                    'mediaEmbed',
                                                    'undo',
                                                    'redo',
                                                    'codeBlock',
                                                    'todoList',
                                                    'subscript',
                                                    'superscript',
                                                    'strikethrough',
                                                ],
                                                simpleUpload: {
                                                    // The URL that the images are uploaded to.
                                                    uploadUrl:
                                                        BASE_URL +
                                                        '/tasklist/task/uploadimage/' +
                                                        this.state.teamInfo._id,

                                                    // Enable the XMLHttpRequest.withCredentials property.
                                                    withCredentials: true,

                                                    // Headers sent along with the XMLHttpRequest to the upload server.
                                                    headers: {
                                                        Authorization: 'Bearer ' + this.state.userInfo.token,
                                                    },
                                                },
                                            }}
                                            onBlur={(e) => {
                                                this.onFocusSaveDescription();
                                            }}
                                            ready={(e) => this.onReady(e)}
                                            onChange={(event, editor) => {
                                                console.log(event);
                                                const data = editor.getData();

                                                console.log(data);
                                                const post = { ...this.state.postDoc };
                                                post['fileContent'] = data;
                                                this.setState({
                                                    description: data,
                                                    changeInDescription: true,
                                                });
                                            }}
                                        />
                                        {/* <button
                                                onClick={() => this.onFocusSaveDescription()}
                                                disabled={!this.state.changeInDescription}
                                                style={{ float: 'right', marginBottom: '10px' }}
                                                className="check-circule btn-sm">
                                                Save
                                            </button> */}
                                    </FormGroup>
                                    {/* {editDescription && <EditActions state={{ editDescription: false }} />} */}
                                </div>
                                {/* )} */}

                                {/* Comments CREATE AND EDIT CONDITIONALLY RENDERED */}
                                {this.props.updateData && (
                                    <Comments
                                        taskData={this.props.updateData}
                                        comments={this.state.comments}
                                        commentsData={this.state.commentsData}
                                        onChangeComments={this.onChangeComments}
                                        postComments={this.postComments}
                                        deleteComment={this.deleteComment}
                                    />
                                )}
                            </Col>
                            <Col lg={3} className="border-left">
                                <AvGroup>
                                    <Label for="Priority">Priority</Label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        value={this.state.priority}
                                        options={[
                                            { value: 'Low', label: 'Low' },
                                            { value: 'Medium', label: 'Medium' },
                                            { value: 'High', label: 'High' },
                                        ]}
                                        onChange={(e) => this.handlePriority(e)}></Select>
                                </AvGroup>
                                <AvGroup>
                                    <Label>Reporter: {this.state.reporter}</Label>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="assignTo">Assign To</Label>
                                    <Select
                                        key="assignTo"
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        value={this.state.user}
                                        options={users}
                                        onChange={(e) => this.handleAssingTo(e)}></Select>
                                </AvGroup>

                                <AvGroup>
                                    <Label for="dueDate">Due Date</Label>
                                    <InputGroup>
                                        <AvInput
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            onChange={(e) => this.handleDueDate(e.target.value)}
                                            value={this.state.dueDate}
                                            placeholder="date placeholder"
                                        />
                                    </InputGroup>
                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>
                                {/* {this.props.updateData && ( */}
                                <AvGroup>
                                    <Label for="files">Attachment</Label>
                                    <FileUploader
                                        onFileUpload={(files) => {
                                            this.setState({
                                                attachments: files[0],
                                                disableSubmit: false,
                                            });
                                            setTimeout(this.addAttachment, 100);
                                        }}
                                    />
                                    {this.props.updateData?.attachments && (
                                        <ListGroup>
                                            <ListGroupItem disabled tag="a" href="#">
                                                Attachments
                                            </ListGroupItem>
                                            {this.state.attachmentsData &&
                                                this.state.attachmentsData.map((file) => (
                                                    <ListGroupItem key={file?._id} tag="span">
                                                        {/* <a href={`${BASE_URL}/${file?.filePath}`} target="_blank">
                                                                {file?.fileName}
                                                            </a> */}

                                                        <span onClick={() => this.onFileViewer(file)}>
                                                            {file?.fileName}
                                                        </span>

                                                        {this.state.userInfo?.id === file?.users && (
                                                            <Trash
                                                                color="orange"
                                                                className="float-right"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => this.deleteAttachment(file?._id)}
                                                            />
                                                        )}
                                                    </ListGroupItem>
                                                ))}
                                        </ListGroup>
                                    )}
                                </AvGroup>
                                {/* )} */}

                                {/* <button className="delete-btn btn-sm float-right">Delete Task</button> */}
                            </Col>
                        </Row>
                        {this.state.fileViewerModal ? (
                            <FileViewerModal
                                modal={this.state.fileViewerModal}
                                fileType={this.state.fileType}
                                filePath={this.state.filePath}
                                closeModal={() => {
                                    this.setState({
                                        fileViewerModal: false,
                                        filePath: null,
                                        fileType: null,
                                    });
                                }}
                            />
                        ) : null}
                    </ModalBody>
                    {updateData ? null : (
                        <ModalFooter>
                            <Button
                                color="secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.toggle();
                                }}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                className="ml-1"
                                type="submit"
                                onClick={() => this.handleValidSubmit()}>
                                Save
                            </Button>
                        </ModalFooter>
                    )}
                </AvForm>
            </Modal>
        );
    }
}

export class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        console.log(this.readThis(loader.file));
    }

    upload() {
        //"data:image/png;base64,"+ btoa(binaryString)
        return this.readThis(this.loader.file);
    }

    readThis(file) {
        console.log(file);
        let imagePromise = new Promise((resolve, reject) => {
            var myReader = new FileReader();
            myReader.onloadend = (e) => {
                let image = myReader.result;
                console.log(image);
                return { default: 'data:image/png;base64,' + image };
            };
            myReader.readAsDataURL(file);
        });
        return imagePromise;
    }
}
export default TaskModal;
