import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
// import { PlusCircle } from 'react-feather';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    Dropdown,
    Row,
    Col,
    DropdownMenu,
    InputGroup,
    Label,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import TaskModal from './TaskModal';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import DeleteModal from '../../../components/DeleteModal';

//  reordering the tasks
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list?.todoId);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source?.todoId);
    const destClone = Array.from(destination?.todoId);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result['source'] = sourceClone;
    result['destination'] = destClone;

    return result;
};
const grid = 10;
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    cursor: 'pointer',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    color: 'black',
    background: isDragging ? 'lightgreen' : 'white',
    boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.20)',
    borderRadius: '5px',
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '#EBECF0',
    padding: grid,
    margin: grid,
    minWidth: '28%',
    // overflowY:"scroll",
    // overflowX:"hidden",
    // height:'65vh'
});
const listTitle = (isDraggingOver) => ({
    color: isDraggingOver ? 'blue' : 'black',
});
const newTaskStyle = () => ({
    display: 'flex',
    flexDirections: 'row',
    justifyContent: 'center',
    background: '#f3f3f3',
    padding: grid,
    cursor: 'pointer',
});

//WORK IN PROGRESS
export default function Tasklist({
    taskList,
    moveTask,
    postComments,
    boardId,
    deleteTaskList,
    createTask,
    users,
    updateTask,
    addAttachments,
    deleteComment,
    deleteAttachment,
}) {
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [listData, setListData] = useState(null);
    const [taskName, setTaskName] = useState(null);
    const [newTask, setNewTask] = useState(false);
    const [listId, setListId] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedList, setselectedList] = useState(null);

    useEffect(() => {
        if (taskList) {
            setTasks(taskList);
            const updatedTaskList = taskList.find((list) => list?._id === taskData?.tasksListId);
            const updatedTaskData = updatedTaskList?.todoId.find((task) => task?._id == taskData?._id);
            if (updatedTaskData) setTaskData(updatedTaskData);
        }
    }, [taskList]);

    // event handler
    const onDragEnd = (result) => {
        const { source, destination } = result;
        let list = tasks;
        let sourceList = list.find((t) => t._id === source.droppableId);
        let destinationList = list.find((t) => t._id === destination.droppableId);
        const indexOfSourceList = list.indexOf(sourceList);
        const indexOfDestinationList = list.indexOf(destinationList);
        // dropped outside the list
        if (!destination) {
            return;
        }
        // reorder cards in same list
        if (source.droppableId === destination.droppableId) {
            const items = reorder(sourceList, source.index, destination.index);
            sourceList.todoId = items;
            list[indexOfSourceList] = sourceList;
            console.log(list, 'list');
            setTasks(list);
        }
        // move task one list to another
        else {
            console.log(source, destination);
            const result = move(sourceList, destinationList, source, destination);

            const data = {
                taskId: sourceList?.todoId[source?.index]?._id,
                sourceId: source?.droppableId,
                destinationId: destination?.droppableId,
            };
            //send to api
            moveTask(data);
            sourceList.todoId = result.source;
            destinationList.todoId = result.destination;
            list[indexOfSourceList] = sourceList;
            list[indexOfDestinationList] = destinationList;
            setTasks(list);
        }
    };

    const handleModal = (data) => {
        setModal(true);
        if (data) {
            setListData(data);
        }
    };

    const handleValidSubmit = (e) => {
        if (taskName && listId) {
            const formData = new FormData();
            formData.append('title', taskName);
            formData.append('boardId', boardId);
            formData.append('tasksListId', listId?._id);

            console.log(formData.keys(), formData.values());
            createTask(formData);
            setNewTask((prevState) => !prevState);
        }
    };
    const closeModal = () => {
        setModal((prevState) => !prevState);
        setTaskData(null);
    };
    //  const toggle = () => setNewTask((prevState) => !prevState);

    return (
        <div style={{ overflowY: 'auto', display: 'flex', height: '100%', width: '100%' }}>
            {modal ? (
                <TaskModal
                    modal={modal}
                    isEditModal={true}
                    toggle={() => {
                        setModal((state) => !state);
                        setTaskData(!modal ? updateTask : true);
                    }}
                    postComments={postComments}
                    listData={listData}
                    boardId={boardId}
                    users={users}
                    createTask={createTask}
                    closeModal={closeModal}
                    updateData={taskData}
                    updateTask={updateTask}
                    addAttachments={addAttachments}
                    deleteComment={deleteComment}
                    deleteAttachment={deleteAttachment}
                />
            ) : null}
            <DragDropContext onDragEnd={onDragEnd}>
                {tasks &&
                    tasks.map((task) => (
                        <Droppable droppableId={task?._id} key={task?._id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    <Row>
                                        <Col lg={9}>
                                            <h5 className="mt-0 ml-2 task-header header-title">
                                                {task.name} <span className="font-size-13">({task.todoId.length})</span>
                                            </h5>
                                        </Col>

                                        <Col lg={1}>
                                            <div>
                                                <span
                                                    className="mt-0 ml-3"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setNewTask(true);
                                                        setListId(task);
                                                    }}>
                                                    <i className="uil uil-plus text-primary"></i>
                                                </span>
                                            </div>
                                        </Col>

                                        <Col lg={1} className="mt-0 ml-3">
                                            <UncontrolledDropdown className="d-inline mt-3">
                                                <DropdownToggle
                                                    tag="a"
                                                    className="dropdown-toggle p-0 arrow-none cursor-pointer  mt-3">
                                                    <i className="uil uil-ellipsis-v font-size-14"></i>
                                                </DropdownToggle>

                                                <DropdownMenu right>
                                                    <DropdownItem
                                                        className="text-primary"
                                                        onClick={() => {
                                                            handleModal(task._id);
                                                            // setListId(task);
                                                        }}>
                                                        <i className="uil uil-edit mr-2"></i>Add New task
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="text-danger"
                                                        onClick={() => {
                                                            setIsDeleteModal(true);
                                                            setselectedList(task);
                                                        }}>
                                                        <i className="uil uil-trash mr-2"></i>Delete List
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>
                                    </Row>
                                    {/* NEW TASK  */}
                                    {newTask && listId?._id === task?._id ? (
                                        <AvForm className="authentication-form">
                                            <AvGroup className="">
                                                <InputGroup onChange={(e) => setTaskName(e.target.value)}>
                                                    <AvInput type="text" name="name" id={task._id} />
                                                </InputGroup>
                                            </AvGroup>
                                            <div>
                                                <Button
                                                    style={{ margin: grid * 0.5 }}
                                                    onClick={() => handleValidSubmit()}
                                                    color="primary">
                                                    Create
                                                </Button>

                                                <Button
                                                    style={{ margin: grid * 0.5 }}
                                                    onClick={() => {
                                                        setNewTask(false);
                                                        setListId(null);
                                                    }}
                                                    color="dark">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </AvForm>
                                    ) : // <span
                                    //     style={newTaskStyle()}
                                    //     onClick={() => {
                                    //         setNewTask(true);
                                    //         setListId(task);
                                    //     }}>
                                    //     <i className="uil uil-plus text-primary"></i>
                                    //     <b className="text-primary">Add New Task</b>
                                    // </span>
                                    null}

                                    {/* TASK LIST START HERE */}
                                    <div
                                        className="task-list"
                                        style={{
                                            overflowY: 'scroll',
                                            overflowX: 'hidden',
                                            height: '65vh',
                                        }}>
                                        {task?.todoId.map((item, index) => (
                                            <Draggable key={item?._id} draggableId={item?._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        onClick={() => {
                                                            handleModal(task._id);
                                                            setTaskData(item);
                                                        }}>
                                                        <Task item={item} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
            </DragDropContext>
            {isDeleteModal ? (
                <DeleteModal
                    modal={isDeleteModal}
                    submitAction={() => deleteTaskList(selectedList._id)}
                    hideButton={selectedList.todoId.length > 0 ? true : false}
                    message={
                        'You cannot delete a list that has existing tickers. Please either move your tickets to a different list or delete them.'
                    }
                    closeModal={(e) => (e ? setIsDeleteModal(false) : '')}
                />
            ) : null}
        </div>
    );
}
