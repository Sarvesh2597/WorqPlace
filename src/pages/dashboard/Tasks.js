import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media
} from 'reactstrap';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import RichTextEditor from '../../components/RichTextEditor';
import { getSelectedTeam } from '../../helpers/authUtils';
import API_KEY from '../../api';
//import TaskCommentsForm from './TaskCommentsForm';

const TaskItem = ({name, createdBy, className }) => {
    return (
        <Media className="mt-1 border-top pt-3">         
            <Media body style={{cursor:"pointer"}}>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                {/* <h6 className="text-muted font-weight-normal mt-1 mb-0">{description}</h6> */}
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{createdBy}</h6>
            </Media>
        </Media>
    );
};

class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myTasks: []
        };
    }

    componentDidMount() {
        this.getMyTasks();
    }
    
    getMyTasks = async () => {
        const team = getSelectedTeam();

        const payload = {
            teamId: team._id
        }
        const result = await API_KEY.url.put(`${API_KEY.path.getMyTasks}`, payload);
        console.log(result);
        if (result) {
            this.setState({myTasks: result.data})
        }
    }
   /*  toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    }; */
    render() {
        const initialContent =
            '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>';
        return (
            <Card className="grid-cards" style={{ minHeight: '445px' }}>
                <CardBody className="pb-0 pt-2">
                    {/* <UncontrolledDropdown className="mt-2 pt-1 float-right ml-2">
                        <DropdownToggle tag="button" className="btn btn-link arrow-none p-0 text-muted">
                            <i className="uil uil-ellipsis-v "></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem className="text-info">
                                <i className="uil uil-pen mr-2"></i>Unpin
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="text-danger">
                                <i className="uil uil-trash mr-2"></i>Delete
                            </DropdownItem>
                        </DropdownMenu> 
                    </UncontrolledDropdown> */}
                    <Link to="/apps/tasks/list">
                        <Button className="float-right mt-2 mr-2" size={'sm'} color="primary">
                            View All
                        </Button>
                    </Link>
                    {/* <Button
                        className="float-right mt-2 mr-2"
                        size={'sm'}
                        color="dark"
                        onClick={() => this.openModalWithSize('xl')}>
                        Create
                    </Button> */}

                    <h5 className="mb-3 header-title">My Tasks</h5>
                    <PerfectScrollbar style={{ maxHeight: '376px', minHeight: '376px' }}>
                        <TaskList>
                        {this.state.myTasks && this.state.myTasks.map(task => {
                            return <TaskItem  name={task.title}  createdBy={task.createdBy.userName} />
                        })}
                        </TaskList>
                    </PerfectScrollbar>
                    {/* <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.state.className}
                        size={this.state.size}>
                        <ModalHeader toggle={this.toggle}>Create Task</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <h4 className="header-title">Title</h4>
                                            <Input
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="with a placeholder"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <h4 className="header-title">Assign To</h4>
                                            <Select
                                                isMulti={true}
                                                options={[
                                                    { value: 'Sarvesh', label: 'Sarvesh' },
                                                    { value: 'Salman', label: 'Salman' },
                                                    { value: 'Pranav', label: 'pranav' },
                                                ]}
                                                className="react-select"
                                                classNamePrefix="react-select"></Select>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
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

                                    <Col lg={6}>
                                        <FormGroup>
                                            <h4 className="header-title">Due Date</h4>
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
                                    <h4 className="header-title mt-4 mb-1">Task Description</h4>

                                    <RichTextEditor onEditorContentChange={() => { }} initialContent={initialContent} />
                                </FormGroup>

                                <FormGroup>
                                    <h4 className="header-title">Attachments</h4>
                                    <Input type="file" name="file" id="exampleFile" />
                                </FormGroup>

                                <FormGroup>
                                    <Row className="mt-3">
                                        <Col><h4 className="header-title">Comments</h4>
                                            <Input type="textarea" name="text" id="exampleText" rows="3" />
                                        </Col>
                                    </Row>
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
                    </Modal> */}
                </CardBody>
            </Card>
        );
    }
}

export default Tasks;
