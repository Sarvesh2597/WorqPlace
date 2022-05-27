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
                                    value={this.props.isEditModal ? this.props.selectedTask?.title : null}
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
                                            data={this.props.isEditModal ? this.props.selectedTask?.description : null}
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
                                        options={this.props.users && this.props.users.length > 0 ? [...this.props.users.map(ele => {
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
                                    <FileUploader
                                    // onFileUpload={(files) => {
                                    //     this.setState({
                                    //         selectedAttachment: files[0],
                                    //         disableSubmit: false
                                    //     });
                                    //     setTimeout(this.addAttachment, 100)
                                    // }}
                                    />
                                </AvGroup>



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



// import React, { Component } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import classNames from 'classnames';
// import avatarImg6 from '../../../assets/images/users/avatar-6.jpg';
// // fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `Task ${k + offset}`,
//         priority: 'High'
//     }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);
//     destClone.splice(droppableDestination.index, 0, removed);
//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;

//     return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: grid * 1,
//     margin: `0 0 ${grid}px 0`,
//     border: '1px solid lightgrey',
//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : 'white',
//     boxShadow: "1px 1px 1px #9E9E9E",
//     // styles we need to apply on draggables
//     ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? 'lightblue' : '#EAF0F1',
//     padding: grid * 2,
//     width: "30%",
//     margin: grid,

// });

// const listTitleStyle = (isDraggingOver) => ({
//     color: isDraggingOver ? '#1287A5' : '#162A31',

// })

// class App extends Component {
//     state = {
//         todo: getItems(5),
//         inprogress: getItems(5, 5),
//         complete: getItems(5, 10)
//     };

//     /**
//      * A semi-generic way to handle multiple lists. Matches
//      * the IDs of the droppable container to the names of the
//      * source arrays stored in the state.
//      */
//     id2List = {
//         todo: 'todo',
//         inprogress: 'inprogress',
//         complete: 'complete'
//     };

//     getList = id => this.state[this.id2List[id]];

//     onDragEnd = result => {
//         const { source, destination } = result;

//         // dropped outside the list
//         if (!destination) {
//             return;
//         }

//         if (source.droppableId === destination.droppableId) {
//             const items = reorder(
//                 this.getList(source.droppableId),
//                 source.index,
//                 destination.index
//             );

//             let state = { items };

//             if (source.droppableId === 'inprogress') {
//                 state = { selected: items };
//             }
//             if (source.droppableId === 'complete') {
//                 state = { selected: items };
//             }

//             this.setState(state);
//         } else {
//             const result = move(
//                 this.getList(source.droppableId),
//                 this.getList(destination.droppableId),
//                 source,
//                 destination
//             );


//             if (result?.todo) {
//                 this.setState({
//                     todo: result?.todo,
//                 });
//             }
//             if (result?.inprogress) {
//                 this.setState({
//                     inprogress: result?.inprogress,
//                 });
//             }
//             if (result?.complete) {
//                 this.setState({
//                     complete: result?.complete,
//                 });
//             }

//         }
//     };

//     // Normally you would want to split things out into separate components.
//     // But in this example everything is just done in one place for simplicity
//     render() {
//         return (
//             <div style={{ display: 'flex', flexDirection: "row" }}>
//                 <DragDropContext onDragEnd={this.onDragEnd} >
//                     <Droppable droppableId="todo">

//                         {(provided, snapshot) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 style={getListStyle(snapshot.isDraggingOver)}>
//                                 <h5 className="mt-0 task-header header-title"
//                                     style={listTitleStyle(snapshot.isDraggingOver)}
//                                 >TODO</h5>
//                                 {this.state.todo.map((item, index) => (
//                                     <Draggable
//                                         key={item.id}
//                                         draggableId={item.id}
//                                         index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 style={getItemStyle(
//                                                     snapshot.isDragging,
//                                                     provided.draggableProps.style
//                                                 )}>

//                                                     <h6 className="mt-0 mb-2 font-size-15">
//                                                     {item.content}
//                                                     </h6>




//                                                 <p className="mb-0 mt-4">
//                                                     <img src={item?.assignee_avatar ? item?.assignee_avatar : avatarImg6} alt="user-img" className="avatar-xs rounded-circle mr-2" />

//                                                     <span className="text-nowrap align-middle font-size-13 mr-2">
//                                                         <span
//                                                             className={classNames('badge', {
//                                                                 'badge-soft-danger': item.priority === 'High',
//                                                                 'badge-soft-info': item.priority === 'Medium',
//                                                                 'badge-soft-success': item.priority === 'Low',
//                                                             })}>
//                                                             {item.priority}
//                                                         </span>
//                                                     </span>

//                                                     <small className="float-right text-muted">{item?.due_date ? item?.due_date : "30 Nov"}</small>
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                     <Droppable droppableId="inprogress">

//                         {(provided, snapshot) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 style={getListStyle(snapshot.isDraggingOver)}>
//                                 <h5 className="mt-0 task-header header-title"
//                                     style={listTitleStyle(snapshot.isDraggingOver)}>INPROGRESS</h5>
//                                 {this.state.inprogress.map((item, index) => (
//                                     <Draggable
//                                         key={item.id}
//                                         draggableId={item.id}
//                                         index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 style={getItemStyle(
//                                                     snapshot.isDragging,
//                                                     provided.draggableProps.style
//                                                 )}>
//                                                <h6 className="mt-0 mb-2 font-size-15">
//                                                     {item.content}
//                                                     </h6>
//                                                 <p className="mb-0 mt-4">
//                                                     <img src={item?.assignee_avatar ? item?.assignee_avatar : avatarImg6} alt="user-img" className="avatar-xs rounded-circle mr-2" />

//                                                     <span className="text-nowrap align-middle font-size-13 mr-2">
//                                                         <span
//                                                             className={classNames('badge', {
//                                                                 'badge-soft-danger': item.priority === 'High',
//                                                                 'badge-soft-info': item.priority === 'Medium',
//                                                                 'badge-soft-success': item.priority === 'Low',
//                                                             })}>
//                                                             {item.priority}
//                                                         </span>
//                                                     </span>

//                                                     <small className="float-right text-muted">{item?.due_date ? item?.due_date : "30 Nov"}</small>
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                     <Droppable droppableId="complete">

//                         {(provided, snapshot) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 style={getListStyle(snapshot.isDraggingOver)}>
//                                 <h5 className="mt-0 task-header header-title" style={listTitleStyle(snapshot.isDraggingOver)}>COMPLETE</h5>
//                                 {this.state.complete.map((item, index) => (
//                                     <Draggable
//                                         key={item.id}
//                                         draggableId={item.id}
//                                         index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 style={getItemStyle(
//                                                     snapshot.isDragging,
//                                                     provided.draggableProps.style
//                                                 )}>
//                                                <h6 className="mt-0 mb-2 font-size-15">
//                                                     {item.content}
//                                                     </h6>
//                                                 <p className="mb-0 mt-4">
//                                                     <img src={item?.assignee_avatar ? item?.assignee_avatar : avatarImg6} alt="user-img" className="avatar-xs rounded-circle mr-2" />

//                                                     <span className="text-nowrap align-middle font-size-13 mr-2">
//                                                         <span
//                                                             className={classNames('badge', {
//                                                                 'badge-soft-danger': item.priority === 'High',
//                                                                 'badge-soft-info': item.priority === 'Medium',
//                                                                 'badge-soft-success': item.priority === 'Low',
//                                                             })}>
//                                                             {item.priority}
//                                                         </span>
//                                                     </span>

//                                                     <small className="float-right text-muted">{item?.due_date ? item?.due_date : "30 Nov"}</small>
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 </DragDropContext>
//             </div>
//         );
//     }
// }

// // Put the things into the DOM
// export default App;
