import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { ChevronDown, X, Plus } from 'react-feather';
import Sortable from 'react-sortablejs';
import {
    Button,
    Card,
    CardBody,
    Col,
    DropdownItem,
    Input,
    DropdownMenu,
    DropdownToggle,
    InputGroup,
    Label,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AddGroupModal from './AddGroupModal';
import { BASE_URL } from '../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';

class Task extends Component {
    constructor(props) {
        super(props);
        const selectedTeam = getSelectedTeam();
        this.state = {
            isEditModal: false,
            modal: false,
            selectedTeam
        };
    }

    modalToggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const { selectedTeam } = this.state;
        return (
            <React.Fragment>
                {this.state.modal ? (
                    <AddGroupModal
                        modal={this.state.modal}
                        isEditModal={true}
                        selectedTask={this.state.selectedTask}
                        users={selectedTeam ? selectedTeam.userId : []}
                        toggle={this.modalToggle}
                        closeModal={(e) => this.setState({ isAddGroupModal: e })}
                    />
                ) : null}
                <Card
                    className="border mb-0"
                    onClick={() => {
                        this.setState({
                            modal: true,
                            selectedTask: this.props.task,
                            isEditModal: true,
                        });
                    }}>
                    <CardBody className="p-3">
                        <UncontrolledDropdown className="float-right">
                            <DropdownToggle tag="a" className="dropdown-toggle p-0 arrow-none cursor-pointer">
                                <i className="uil uil-ellipsis-v font-size-14"></i>
                            </DropdownToggle>

                            <DropdownMenu right>
                                <DropdownItem className="text-danger">
                                    <i className="uil uil-trash mr-2"></i>Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <h6 className="mt-0 mb-2 font-size-15">{this.props.task.title}</h6>

                        <p className="mb-0 mt-4">
                            <span className="text-nowrap align-middle font-size-13 mr-2">
                                <i className="uil uil-comments-alt text-muted mr-1"></i>
                                {this.props.task.comments.length}
                            </span>
                            <small className="float-right text-muted">{this.props.task.createdDate}</small>
                        </p>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

const TaskContainer = ({ tasks }) => {
    tasks = tasks.map((task, idx) => <Task key={idx} data-id={task._id} task={task}></Task>);
    return (
        <Sortable
            options={{
                group: 'shared',
                animation: 150,
            }}
            tag="div">
            {tasks}
        </Sortable>
    );
};

class BoardDetails extends Component {
    constructor(props) {
        super(props);
        const selectedTeam = getSelectedTeam();
        this.state = {
            selectedTasksListId: '',
            selectedBoardId: '',
            taskList: [],
            isAddGroupModal: false,
            show: false,
            hide: false,
            selectedTeam,
        };
    }

    showCard = () => {
        console.log('Hello');
        this.setState({
            show: true,
        });
    };

    componentDidMount() {
        this.getBoardDetail(this.props.match.params.id);
    }

    getBoardDetail(boardId) {
        this.setState({ isLoading: true });
        let userInfo = getLoggedInUser();
        fetch(BASE_URL + '/board/details?id=' + boardId, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.setState({
                        items: response.data,
                        taskList: response.data[0].taskList,
                        isLoading: false,
                        logout: false,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    addGroupModalToggle = (id) => {
        this.setState((prevState) => ({
            isAddGroupModal: !prevState.isAddGroupModal,
            selectedBoardId: this.props.match.params.id,
            selectedTasksListId: id,
        }));
    };

    handleValidSubmit = (e, values) => {

    };

    toggle = () => {
        this.setState({ isAddGroupModal: !this.state.isAddGroupModal });
    };

    render() {
        const { selectedTeam } = this.props;
        return (
            <React.Fragment>
                {this.state.isAddGroupModal ? (
                    <AddGroupModal
                        modal={this.state.isAddGroupModal}
                        data={this.state}
                        users={selectedTeam ? selectedTeam.userId : []}
                        toggle={this.toggle}
                        closeModal={(e) => this.setState({ isAddGroupModal: e })}
                    />
                ) : null}
                <Row className="page-title">
                    <Col md={10}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Apps', path: '/apps/tasks/board' },
                                { label: 'Tasks', path: '/apps/tasks/board' },
                                { label: 'Board', path: '/apps/tasks/board', active: true },
                            ]}
                            title={'Task Name'}
                        />
                    </Col>
                    <Col md={2}>
                        <UncontrolledDropdown className="d-inline">
                            <DropdownToggle color="primary">
                                Add New List
                                <i className="icon">
                                    <ChevronDown></ChevronDown>
                                </i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <div className="text-muted p-2">
                                    <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                        <AvGroup className="">
                                            <Label for="username">Name </Label>
                                            <InputGroup>
                                                <AvInput type="text" name="name" id="name" />
                                            </InputGroup>
                                        </AvGroup>
                                        <div className="text-center">
                                            <Button color="dark">Submit</Button>
                                        </div>
                                    </AvForm>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                </Row>

                <Row>
                    <Col className="board-row">
                        {this.state.taskList &&
                            this.state.taskList.map((task, idx) => {
                                return (
                                    <div className="tasks border board-item">
                                        <Row>
                                            <Col lg={10}>
                                                <h5 className="mt-0 task-header header-title">
                                                    {task.name}{' '}
                                                    <span className="font-size-13">({task.todoId.length})</span>
                                                </h5>
                                            </Col>

                                            <span className="mt-3">
                                                <i className="uil uil-plus text-primary" onClick={this.showCard}></i>
                                            </span>

                                            <Col lg={1} className="mt-3">
                                                <UncontrolledDropdown className="d-inline mt-3">
                                                    <DropdownToggle
                                                        tag="a"
                                                        className="dropdown-toggle p-0 arrow-none cursor-pointer  mt-3">
                                                        <i className="uil uil-ellipsis-v font-size-14"></i>
                                                    </DropdownToggle>

                                                    <DropdownMenu right>
                                                        <DropdownItem
                                                            className="text-primary"
                                                            onClick={(e) => this.addGroupModalToggle(task._id)}>
                                                            <i className="uil uil-edit mr-2"></i>Add New Card
                                                        </DropdownItem>
                                                        <DropdownItem className="text-danger">
                                                            <i className="uil uil-trash mr-2"></i>Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                        </Row>

                                        <TaskContainer
                                            id="task-list-one"
                                            classNames="task-list-items"
                                            tasks={task.todoId}></TaskContainer>

                                        {this.state.hide === false ? (
                                            <div>
                                                {this.state.show && (
                                                    <Card className="card-border">
                                                        <CardBody>
                                                            <Input type="text" placeholder="Enter todo name..."></Input>
                                                            <div>
                                                                <Button className="mt-2">Add Card</Button>
                                                                <span>
                                                                    <X
                                                                        className="mt-2 ml-3 text-danger"
                                                                        onClick={(e) =>
                                                                            this.setState({
                                                                                hide: !this.state.hide,
                                                                            })
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default BoardDetails;
