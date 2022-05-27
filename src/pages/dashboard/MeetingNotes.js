import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Input,
    Collapse,
    CardHeader,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import NotesModal from '../other/NotesModal';
import { BASE_URL } from '../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import DeleteModal from '../../components/DeleteModal';

const initialNote = {
    title: '',
    content: '',
    noteId: null
}

class Tasks extends Component {
    constructor(props) {
        super(props);

        const selectedTeam = getSelectedTeam()
        const userInfo = getLoggedInUser()
        this.togglePanel = this.togglePanel.bind(this);
        this.state = {
            title: '',
            content: '',
            isModalOpen: false,
            modalName: '',
            modalMode: '',
            selectedTeam,
            userInfo,
            modalData: initialNote,
            isDeleteModalOpen: false,
            notesList: [],
            openNotes: [],
        };
    }

    componentDidMount() {
        this.getMeetingNotes();
    }

    getMeetingNotes = () => {
        fetch(BASE_URL + '/notes/meeting/' + this.state.selectedTeam._id, {
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.setState({ notesList: response.map((element) => ({ ...element, open: false })) })
                }
            })
            .catch((err) => {

            });
    }

    togglePanel(noteId) {
        this.setState({
            notesList: this.state.notesList.map(note => {
                if (note._id === noteId) {
                    note.open = !note.open
                }
                return note;
            })
        });
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    createNote = (data) => {
        fetch(BASE_URL + '/notes/create/meeting/', {
            method: 'POST',
            body: JSON.stringify({
                teamId: this.state.selectedTeam._id,
                ...data,
            }),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.getMeetingNotes()
                }
            })
            .catch((err) => {

            });
    }

    modalSubmit = (event, data) => {
        if (this.state.modalMode === 'add')
            this.createNote(data);
        else
            this.updateNote(data);
        this.toggleModal()
    }

    updateNote = (data) => {
        fetch(BASE_URL + '/notes/update/' + this.state.modalData.noteId, {
            method: 'PUT',
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.getMeetingNotes()
                }
            })
            .catch((err) => {

            });
    }

    updateIconClicked = (note) => {
        this.setState({
            modalMode: 'update',
            modalName: 'Update note',
            modalData: {
                title: note.title,
                content: note.content,
                noteId: note._id
            },
            isModalOpen: true
        })
    }

    deleteNote = () => {
        fetch(BASE_URL + '/notes/' + this.state.modalData.noteId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.getMeetingNotes()
                }
            })
            .catch((err) => {

            });
    }

    deleteNoteClicked = (note) => {
        this.setState({ modalData: { noteId: note._id }, isDeleteModalOpen: true })
    }

    render() {
        return (
            <Card className="grid-cards">
                <CardBody className="pt-2 pb-0">
                    <Button className="float-right mt-2 mr-2" size={'sm'} color="primary" onClick={() => {
                        this.setState({ modalName: 'Add a note', modalMode: 'add' })
                        this.toggleModal()
                    }}>
                        Add
                    </Button>
                    <NotesModal
                        toggle={this.toggleModal}
                        isOpen={this.state.isModalOpen}
                        modalName={this.state.modalName}
                        modalSubmit={this.modalSubmit}
                        title={this.state.modalData.title}
                        content={this.state.modalData.content}
                    />
                    <DeleteModal
                        modal={this.state.isDeleteModalOpen}
                        closeModal={() => this.setState({ isDeleteModalOpen: false })}
                        submitAction={(value) => value && this.deleteNote()}
                    />
                    <h3 className="mb-3 header-title">Meeting Notes</h3>
                    <PerfectScrollbar style={{ maxHeight: '376px', minHeight: '376px' }} >
                        <div>
                            <div>

                                <div id="accordion" className="accordion custom-accordionwitharrow mt-4">
                                    {this.state.notesList.length ? this.state.notesList.map((data, index) => (
                                        <Card className="mb-2 shadow-none border" key={index}>
                                            <NavLink
                                                className="text-dark"
                                                id="group1"
                                                href="#"
                                                onClick={() => {
                                                    this.togglePanel(data._id);
                                                }}>
                                                <CardHeader className="p-1">
                                                    <h5 className="m-0 font-size-16">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div className="accordian-item-text mt-1">{data.title}</div>
                                                            <div>
                                                                {data.open ?
                                                                    <i className="uil uil-angle-up float-right accordion-arrow"></i>
                                                                    : <i className="uil uil-angle-down float-right accordion-arrow"></i>}

                                                                {data.open &&
                                                                    data.createdBy === this.state.userInfo.id &&
                                                                    <span>
                                                                        <i className="uil uil-edit-alt mr-2 float-right accordion-arrow" onClick={() => this.updateIconClicked(data)}></i>
                                                                        <i className="uil uil-trash mr-2 float-right accordion-arrow" onClick={() => this.deleteNoteClicked(data)}></i>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </h5>
                                                </CardHeader>
                                            </NavLink>

                                            <Collapse isOpen={data.open}>
                                                <CardBody style={{ whiteSpace: 'pre-wrap', 'user-select': 'text', }}>{data.content}</CardBody>
                                            </Collapse>
                                        </Card>
                                    )) : 'Meetings notes are not created yet.'}
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </CardBody>
            </Card>
        );
    }
}

export default Tasks;
