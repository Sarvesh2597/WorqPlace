import classNames from 'classnames';
import React, { Component } from 'react';
import Select from 'react-select';
import Sortable from 'react-sortablejs';
import {
    Button,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';
import PageTitle from '../../../components/PageTitle';
import RichTextEditor from '../../../components/RichTextEditor';
import { allTasks } from './Data';

const Task = (task) => {
    return (
        <React.Fragment>
            <Card className="border mb-0">
                <CardBody className="p-3">
                    <UncontrolledDropdown className="float-right">
                        <DropdownToggle tag="a" className="dropdown-toggle p-0 arrow-none cursor-pointer">
                            <i className="uil uil-ellipsis-v font-size-14"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem className="text-danger">
                                <i className="uil uil-trash mr-2"></i>Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <h6 className="mt-0 mb-2 font-size-15">
                        <a href="/" className="text-body">
                            {task.title}
                        </a>
                    </h6>

                    <span
                        className={classNames('badge', {
                            'badge-soft-danger': task.priority === 'High',
                            'badge-soft-info': task.priority === 'Medium',
                            'badge-soft-success': task.priority === 'Low',
                        })}>
                        {task.priority}
                    </span>

                    <p className="mb-0 mt-4">
                        <img src={task.assignee_avatar} alt="user-img" className="avatar-xs rounded-circle mr-2" />

                        <span className="text-nowrap align-middle font-size-13 mr-2">
                            <i className="uil uil-comments-alt text-muted mr-1"></i>
                            {task.comments.length}
                        </span>

                        <span className="text-nowrap align-middle font-size-13">
                            <i className="uil uil-check-square mr-1 text-muted"></i>
                            {task.checklists.filter((x) => x.completed).length}/{task.checklists.length}
                        </span>
                        <small className="float-right text-muted">{task.due_date}</small>
                    </p>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

const TaskContainer = ({ tasks }) => {
    tasks = tasks.map((task, idx) => <Task key={idx} data-id={task.id} {...task}></Task>);

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

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTasks: [...allTasks.filter((x) => x.stage === 'Todo')],
            inProgessTasks: [...allTasks.filter((x) => x.stage === 'In-progress')],
            reviewTasks: [...allTasks.filter((x) => x.stage === 'Review')],
            completedTasks: [...allTasks.filter((x) => x.stage === 'Done')],
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);
        this.openModalWithClass = this.openModalWithClass.bind(this);
    }

    /**
     * Show/hide the modal
     */
    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    /**
     * Opens large modal
     */
    openModalWithSize = (size) => {
        this.setState({ size: size, className: null });
        this.toggle();
    };

    /**
     * Opens modal with custom class
     */
    openModalWithClass = (className) => {
        this.setState({ className: className, size: null });
        this.toggle();
    };

    render() {
        const initialContent = '<p>Enter Task Description Here</p>';

        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.className} size={'xl'}>
                    <ModalHeader toggle={this.toggle}>Create Task</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col lg={6}>
                                    <FormGroup>
                                        <h4 className="header-title">Title</h4>
                                        <Input type="text" name="title" id="title" placeholder="with a placeholder" />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <h4 className="header-title">Priority</h4>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={[
                                                { value: 'Low', label: 'Low' },
                                                { value: 'Medium', label: 'Medium' },
                                                { value: 'High', label: 'High' },
                                            ]}></Select>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6}>
                                    <FormGroup>
                                        <h5 className="">Priority</h5>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={[
                                                { value: 'Low', label: 'Low' },
                                                { value: 'Medium', label: 'Medium' },
                                                { value: 'High', label: 'High' },
                                            ]}></Select>
                                    </FormGroup>
                                </Col>

                                <Col lg={6}>
                                    <FormGroup>
                                        <h5>Due Date</h5>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <h5 className=" mt-3 mb-3">Task Description</h5>
                                <RichTextEditor onEditorContentChange={() => {}} initialContent={initialContent} />
                            </FormGroup>

                            <FormGroup>
                                <h5 className="">Attachment</h5>
                                <Input type="file" name="file" id="exampleFile" />
                            </FormGroup>

                            <FormGroup>
                                <h4 className="header-title">Comments</h4>

                                <Input type="textarea" name="text" id="exampleText" rows="3" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                        <Button color="primary" className="ml-1" onClick={this.toggle}>
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>

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
                        <Button color="primary" className="float-right" id="btn-new-event">
                            <i className="uil-plus mr-1"></i>Add New List
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="tasks border">
                            <Row>
                                <Col lg={10}>
                                    <h5 className="mt-0 task-header header-title">
                                        Todo <span className="font-size-13">({this.state.todoTasks.length})</span>
                                    </h5>
                                </Col>
                                <Col lg={2}>
                                    <Button
                                        color="white"
                                        className="float-right mt-2"
                                        onClick={this.toggle}
                                        id="btn-new-event">
                                        <i className="uil-plus mr-1"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <TaskContainer
                                id="task-list-one"
                                classNames="task-list-items"
                                tasks={this.state.todoTasks}></TaskContainer>
                        </div>

                        <div className="tasks border">
                            <Row>
                                <Col lg={10}>
                                    <h5 className="mt-0 task-header header-title">
                                        In Progress{' '}
                                        <span className="font-size-13">({this.state.inProgessTasks.length})</span>
                                    </h5>
                                </Col>
                                <Col lg={2}>
                                    <Button
                                        color="white"
                                        className="float-right mt-2"
                                        onClick={this.toggle}
                                        id="btn-new-event">
                                        <i className="uil-plus mr-1"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <TaskContainer
                                id="task-list-two"
                                classNames="task-list-items"
                                tasks={this.state.inProgessTasks}></TaskContainer>
                        </div>

                        <div className="tasks border">
                            <Row>
                                <Col lg={10}>
                                    <h5 className="mt-0 task-header header-title">
                                        Review <span className="font-size-13">({this.state.reviewTasks.length})</span>
                                    </h5>
                                </Col>
                                <Col lg={2}>
                                    <Button
                                        color="white"
                                        className="float-right mt-2"
                                        onClick={this.toggle}
                                        id="btn-new-event">
                                        <i className="uil-plus mr-1"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <TaskContainer
                                id="task-list-three"
                                classNames="task-list-items"
                                tasks={this.state.reviewTasks}></TaskContainer>
                        </div>

                        <div className="tasks border">
                            <Row>
                                <Col lg={10}>
                                    <h5 className="mt-0 task-header header-title">
                                        Done <span className="font-size-13">({this.state.completedTasks.length})</span>
                                    </h5>
                                </Col>
                                <Col lg={2}>
                                    <Button
                                        color="white"
                                        className="float-right mt-2"
                                        onClick={this.toggle}
                                        id="btn-new-event">
                                        <i className="uil-plus mr-1"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <TaskContainer
                                id="task-list-four"
                                classNames="task-list-items"
                                tasks={this.state.completedTasks}></TaskContainer>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Board;
