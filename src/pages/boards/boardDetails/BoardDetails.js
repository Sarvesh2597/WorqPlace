import React, { useState, useEffect } from 'react';
import API_KEY from '../../../api/index';
import {
    Row,
    Col,
    Button,
    DropdownItem,
    Input,
    DropdownMenu,
    Dropdown,
    DropdownToggle,
    InputGroup,
    Label,
    Alert,
    Spinner,
} from 'reactstrap';
// import { getLoggedInUser } from "../../../helpers/authUtils";
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import PageTitle from '../../../components/PageTitle';
import Tasklist from './Tasklist';
import { getSelectedTeam } from '../../../helpers/authUtils';
export default function BoardDetails(props) {
    const [data, setData] = useState(null);
    const [taskList, setTaskList] = useState(null);
    const [listName, setListName] = useState(null);
    const [listModal, setListModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState(null);
    const [users, setUsers] = useState(null);
    const {
        match: {
            params: { id },
        },
    } = props;

    const fetchData = async () => {
        setIsLoading(true);
        setMessages('Loading...');
        // setTaskList(null);
        const result = await API_KEY.url.get(`${API_KEY.path.boardDetails}${id}`);
        if (result?.data?.data) {
            setIsLoading(false);
            setMessages(null);
            setData(result.data);
            setTaskList(result?.data?.data[0].taskList.map(list => ({ ...list, todoId: list.todoId.reverse() })));
        }
    };
    useEffect(() => {
        fetchData();
        // getUsers();
        console.log('team', getSelectedTeam());
        setUsers(getSelectedTeam().userId)
        const user = getSelectedTeam();
    }, []);

    const moveTask = async (data) => {
        const result = await API_KEY.url.patch(API_KEY.path.moveTask, data);
        if (result?.data) {
            console.log(result?.data);
        }
    };
    const handleValidSubmit = (e) => {
        console.log(listName);
        if (listName) {
            const data = {
                name: listName,
                boardId: id,
            };
            postList(data);
        }
    };
    const postList = (data) => {
        setIsLoading(true);
        setMessages('Loading...');
        API_KEY.url
            .post(API_KEY.path.createTaskList, data)
            .then((res) => {
                console.log(res);

                setListModal((prevState) => !prevState);
                setListName(null);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
                setMessages('Something went Wrong :(');
                setListModal((prevState) => !prevState);
            });
    };
    const postComments = (comments) => {
        API_KEY.url
            .patch(`${API_KEY.path.addComment}`, comments)
            .then((res) => {
                console.log(res);
                fetchData();

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addAttachments = (file) => {
        API_KEY.url
            .put(`${API_KEY.path.addAttachment}`, file)
            .then((res) => {
                console.log(res);
                fetchData();

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteComment = (comment) => {
        API_KEY.url
            .put(`${API_KEY.path.deleteComment}`, comment)
            .then((res) => {
                console.log(res);
                fetchData();

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteAttachment = (attachment) => {
        API_KEY.url
            .put(`${API_KEY.path.deleteAttachment}`, attachment)
            .then((res) => {
                console.log(res);
                fetchData();

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteTaskList = async (data) => {
        const result = await API_KEY.url.delete(`${API_KEY.path.tasklist}${data}`);
        if (result?.data) {
            fetchData();
        }
    };

    const createTask = (data, headers) => {
        setTaskList(taskList.map(list => {
            if(list._id === data.get('tasksListId')) {
                list.todoId.unshift({});
            }
            return list;
        }))
        setIsLoading(true);
        setMessages('Loading...');
        API_KEY.url
            .post(API_KEY.path.createTask, data, {
                headers: headers ? headers : {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
                setMessages('Something went Wrong :(');
            });
    };
    const updateTask = (id, data) => {
        API_KEY.url
            .patch(`${API_KEY.path.updateTask}/${id}`, data)
            .then((res) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);

            });
    };

    const toggle = () => setListModal((prevState) => !prevState);
    return (
        <div>
            <Row className="page-title" style={{ display: 'flex', justifyContent: "space-between" }}>
                {/* <Col md={10}> */}
                <PageTitle title={data?.data[0]?.boardName} />
                {/* </Col> */}
                {/* <Col md={2}> */}
                <Dropdown toggle={toggle} isOpen={listModal}>
                    <DropdownToggle color="primary">Add New List</DropdownToggle>
                    <DropdownMenu style={{ width: '300px' }}>
                        <div className="text-muted p-2 m-4">
                            <AvForm onValidSubmit={(e) => handleValidSubmit(e)} className="authentication-form">
                                <AvGroup className="">
                                    <Label for="username">Name</Label>
                                    <InputGroup onChange={(e) => setListName(e.target.value)}>
                                        <AvInput type="text" name="name" id="name" />
                                    </InputGroup>
                                </AvGroup>
                                <div className="text-center">
                                    <Button color="dark">Submit</Button>
                                </div>
                            </AvForm>
                        </div>
                    </DropdownMenu>
                </Dropdown>
                {/* </Col> */}
            </Row>

            {taskList ? (
                <Tasklist
                    postComments={postComments}
                    boardId={id}
                    taskList={taskList}
                    moveTask={moveTask}
                    deleteTaskList={deleteTaskList}
                    createTask={createTask}
                    users={users}
                    updateTask={updateTask}
                    addAttachments={addAttachments}
                    deleteComment={deleteComment}
                    deleteAttachment={deleteAttachment}
                />
            ) : (
                <div style={{ margin: 'auto', width: '50%', padding: ' 10px' }}>
                    <Spinner animation="grow" variant="primary" size="xl" />
                </div>
            )}
        </div>
    );
}
