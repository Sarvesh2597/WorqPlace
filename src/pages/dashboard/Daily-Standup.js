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
import DailyStandupModal from '../other/DailyStandupModal';

const initialNote = {
    title: '',
    content: '',
    dsrId: null
}

class DailyStandup extends Component {
    constructor(props) {
        super(props);

        const selectedTeam = getSelectedTeam()
        const userInfo = getLoggedInUser()
        this.togglePanel = this.togglePanel.bind(this);
        this.state = {
            title: '',
            content: '',
            isModalOpen: false,
            isDeleteModalOpen: false,
            modalName: 'Send DSR',
            modalMode: '',
            selectedTeam,
            userInfo,
            modalData: initialNote,
            notesList: [],
            openNotes: [],
        };
    }

    componentDidMount() {
        this.getDailyStandupReport();
    }

    getDailyStandupReport = () => {
        fetch(BASE_URL + '/daily-standup/list/' + this.state.selectedTeam._id, {
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

    togglePanel(dsrId) {
        this.setState({
            notesList: this.state.notesList.map(note => {
                if (note._id === dsrId) {
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
        fetch(BASE_URL + '/daily-standup/create', {
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
                console.log(response);
                if (response['success']) {
                    this.getDailyStandupReport()
                }
            })
            .catch((err) => {

            });
    }

    modalSubmit = (event, data) => {
        if (this.state.modalMode === 'add')
            this.createNote(data);
        else
            this.updateDsr(data);
        this.toggleModal()
    }

    updateDsr = (data) => {
        fetch(BASE_URL + '/daily-standup/update/' + this.state.modalData.dsrId, {
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
                    this.getDailyStandupReport()
                }
            })
            .catch((err) => {

            });
    }

    updateIconClicked = (dsr) => {
        this.setState({
            modalMode: 'update',
            modalName: 'Update ',
            modalData: {
                content: dsr.content,
                dsrId: dsr._id
            },
            isModalOpen: true
        })
    }

    deleteNote = () => {
        fetch(BASE_URL + '/daily-standup/' + this.state.modalData.dsrId, {
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
                    this.getDailyStandupReport()
                }
            })
            .catch((err) => {

            });
    }

    deleteDsrClicked = (dsr) => {
        this.setState({ modalData: { dsrId: dsr._id }, isDeleteModalOpen: true })
    }

    render() {
        return (
            <Card className="grid-cards">
                <CardBody className="pt-2 pb-0">
                    <Button className="float-right mt-2 mr-2" size={'sm'} color="primary" onClick={() => {
                        this.setState({ modalName: 'Daily work report', modalMode: 'add' })
                        this.toggleModal()
                    }}>
                        Add
                    </Button>
                    <DailyStandupModal
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
                    <h3 className="mb-3 header-title">Daily Updates</h3>
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
                                                                        <i className="uil uil-trash mr-2 float-right accordion-arrow" onClick={() => this.deleteDsrClicked(data)}></i>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </h5>
                                                </CardHeader>
                                            </NavLink>

                                            <Collapse isOpen={data.open}>
                                                <CardBody style={{ whiteSpace: 'pre-wrap' }}>{data.content}</CardBody>
                                            </Collapse>
                                        </Card>
                                    )) : 'No Daily updates available'}
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </CardBody>
            </Card>
        );
    }
}

export default DailyStandup;
