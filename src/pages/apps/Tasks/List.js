import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
    Button,
    Card,
    CardBody,
    Col,
    Collapse,
    CustomInput,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    UncontrolledTooltip,
} from 'reactstrap';
import PageTitle from '../../../components/PageTitle';
import RichTextEditor from '../../../components/RichTextEditor';
import { otherTasks, todayTasks, upcomingTasks } from './Data';
import Task from './Task';

import { getLoggedInUser, getSelectedTeam } from '../../../helpers/authUtils';
import { BASE_URL } from '../../../constants/endpoint';
import moment from 'moment';
import TaskModal from '../../boards/boardDetails/TaskModal';
import API_KEY from '../../../api';

const TaskSummary = (task) => {
    const clickHandler = task.onClickHandler || {};
    return (
        <React.Fragment>
            <Row
                className={classNames('justify-content-sm-between', 'border-bottom', 'mt-2', 'pt-2', 'cursor-pointer')}
                onClick={() => clickHandler(task)}>
                <Col lg={6} className="mb-lg-0">
                    {/* {task.status !== 'Done' || task.status !== 'Deployed' ? (
                        <CustomInput
                            type="checkbox"
                            id={`task-${task.id}`}
                            label={task.title}
                            defaultChecked={task.completed}></CustomInput>
                    ) : ( */}
                        <div>{task.title}</div>
                    {/* )} */}
                </Col>
                <Col lg={6}>
                    <div className="d-sm-flex justify-content-between">
                        {/* <div>
                            <img
                                src={task.assignee_avatar}
                                alt=""
                                className="avatar-xs rounded-circle"
                                id={`task-avt-${task.id}`}
                            />
                            <UncontrolledTooltip placement="bottom" target={`task-avt-${task.id}`}>
                                Assigned to {task.assignTo[0]?.userName}
                            </UncontrolledTooltip>
                        </div> */}

                        <div className="mt-3 mt-sm-0">
                            <ul className="list-inline font-13 text-sm-right">
                                <li className="list-inline-item pr-1">
                                    <i className="uil uil-schedule font-16 mr-1"></i>
                                    {moment(task.dueDate).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY") ? 'Today'
                                        : moment(task.dueDate).format("DD-MM-YYYY")}
                                </li>
                                <li className="list-inline-item pr-1">
                                    <i className="uil uil-align-alt font-16 mr-1"></i>
                                    {task.status}
                                </li>
                                <li className="list-inline-item pr-2">
                                    <i className="uil uil-comment-message font-16 mr-1"></i>
                                    {task.comments.length}
                                </li>
                                <li className="list-inline-item">
                                    <span
                                        className={classNames(
                                            'badge',
                                            {
                                                'badge-soft-danger': task?.priority === 'High',
                                                'badge-soft-info': task?.priority === 'Medium',
                                                'badge-soft-success': task?.priority === 'Low',
                                            },
                                            'p-1'
                                        )}>
                                        {task.priority}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modaltoggle1: false,
            items: [],
            taskList: [],
        };

        this.toggle = this.toggle.bind(this);
        this.modaltoggle1 = this.modaltoggle1.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);

        this.togglePanel = this.togglePanel.bind(this);
        this.selectTask = this.selectTask.bind(this);
        this.state = {
            todayTaskCollapse: false,
            upcomingTaskCollapse: false,
            otherTaskCollapse: false,
            selectedTask: todayTasks[0],
        };
    }

    /**
     * Toggle panel
     */
    togglePanel(panel) {
        var state = { ...this.state };
        state[panel] = !state[panel];
        this.setState(state);
    }

    /**
     * Selects the task
     * @param {*} task
     */
    selectTask(task) {
        this.setState({ selectedTask: task, modal: true });
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };
    modaltoggle1 = () => {
        this.setState((prevState) => ({
            modaltoggle1: !prevState.modaltoggle1,
        }));
    };

    openModalWithSize = (size) => {
        this.setState({ size: size, className: null });
        this.toggle();
    };

    componentDidMount = () => {
        this.getBoardsList();
        // this.getBoardDetail(this.props.match.params.id);
    };

    getBoardsList() {
        const selectedTeam = getSelectedTeam();
        let userInfo = getLoggedInUser();
        fetch(BASE_URL + '/tasklist/mytaskByBoard', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                teamId: selectedTeam._id
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    console.log(response);
                    this.setState({
                        items: response,
                        isLoading: false,
                        logout: false,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    postComments = (comments) => {
        API_KEY.url
            .patch(`${API_KEY.path.addComment}`, comments)
            .then((res) => {
                this.getBoardsList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // getBoardDetail(boardId) {
    //     this.setState({ isLoading: true });
    //     let userInfo = getLoggedInUser();
    //     fetch(BASE_URL + '/board/details?id=' + boardId, {
    //         headers: {
    //             Authorization: `Bearer ${userInfo.token}`,
    //         },
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((response) => {
    //             if (response) {
    //                 this.setState({
    //                     items: response.data,
    //                     taskList: response.data[0].taskList,
    //                     isLoading: false,
    //                     logout: false,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }
    closeModal = () => {
        this.setState({
            modal: false,
            taskData: null
        })
    };


    addAttachments = (file) => {
        API_KEY.url
            .put(`${API_KEY.path.addAttachment}`, file)
            .then((res) => {
                this.getBoardsList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    deleteComment = (comment) => {
        API_KEY.url
            .put(`${API_KEY.path.deleteComment}`, comment)
            .then((res) => {
                this.getBoardsList();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    deleteAttachment = (comment) => {
        API_KEY.url
            .put(`${API_KEY.path.deleteAttachment}`, comment)
            .then((res) => {
                this.getBoardsList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    updateTask = (id, data) => {
        API_KEY.url
            .patch(`${API_KEY.path.updateTask}/${id}`, data)
            .then((res) => {
                this.getBoardsList();
            })
            .catch((err) => {
                console.log(err);

            });
    };

    render() {
        const initialContent = '<p>Enter Task Description Here</p>';
        return (
            <React.Fragment>
                {/* filter panel */}
                <Row className="mt-4">
                {this.state.modal ? (
                    <TaskModal
                        modal={this.state.modal}
                        isEditModal={true}
                        toggle={() => {
                            this.setState({
                                modal: !this.state.modal,
                                taskData: null
                            })
                        }}
                        postComments={(comment) => 
                            this.postComments(comment)
                        }
                        listData={this.state.taskId}
                        boardId={this.state.boardId}
                        users={getSelectedTeam().userId}
                        // createTask={createTask}
                        closeModal={() => {
                            this.closeModal();
                        }}
                        updateData={this.state.selectedTask}
                        updateTask={(id, data)=>this.updateTask(id, data)}
                        addAttachments={(attachment) => {
                            this.addAttachments(attachment)
                        }}
                        deleteComment={(comment) => this.deleteComment(comment)}
                        deleteAttachment={(attachment) => this.deleteAttachment(attachment)}
                    />
                ) : null}
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col sm={11}>
                                                <PageTitle title={'My Tasks'} />
                                            </Col>
                                            {/* <Col sm={1}>
                                                <Button color="primary" onClick={this.toggle}>
                                                    <i className="uil uil-plus mr-1"></i>
                                                </Button>
                                            </Col> */}
                                        </Row>

                                        {this.state.items &&
                                            this.state.items.map((item) => {
                                                return (
                                                    <Row className="mt-4">
                                                        <Col>
                                                            <Link
                                                                to="#"
                                                                id="todayTasks"
                                                                className="p-0 text-dark"
                                                                onClick={() => {
                                                                    this.togglePanel('todayTaskCollapse');
                                                                }}>
                                                                <h5 className="mb-0">
                                                                    {this.state.todayTaskCollapse && (
                                                                        <i className="uil uil-angle-down font-size-18 align-middle"></i>
                                                                    )}
                                                                    {!this.state.todayTaskCollapse && (
                                                                        <i className="uil uil-angle-right font-size-18 align-middle"></i>
                                                                    )}
                                                                    {item.boardName}
                                                                    <span className="text-muted font-size-14">
                                                                        ({item?.tasks.length})
                                                                    </span>
                                                                </h5>
                                                            </Link>
                                                            <Collapse isOpen={this.state.todayTaskCollapse}>
                                                                <Card className="mb-0 shadow-none">
                                                                    <CardBody>

                                                                        {item?.tasks.map((task, index) => {
                                                                            return (
                                                                                <TaskSummary
                                                                                    {...task}
                                                                                    isCheckbox="true"
                                                                                    key={index}
                                                                                    onClickHandler={this.selectTask}
                                                                                />
                                                                            );
                                                                        })}
                                                                    </CardBody>
                                                                </Card>
                                                            </Collapse>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    {/* <Col xl={4}>
                        <Task {...this.state.selectedTask} />
                    </Col> */}
                </Row>
            </React.Fragment>
        );
    }
}

export default TaskList;
