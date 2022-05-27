import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
//Redux Imports
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
    Button,
    Col,
    Row,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    FormGroup,
    Input,
    Form,
} from 'reactstrap';

import AddTeamModal from './other/AddTeamModal';
import MemberModal from './other/MemberModal';

import { BASE_URL } from '../constants/endpoint';
import { getLoggedInUser } from '../helpers/authUtils';
import moment from 'moment';
import AddMemberModal from './other/AddMemberModal';
import { Loader, UserPlus } from 'react-feather';
import { changeSelectedTeamName } from '../redux/actions';
import { fetchJSON } from '../helpers/api';
import DeleteModal from '../components/DeleteModal';

const userInfo = getLoggedInUser();

const setSession = (team) => {
    let cookies = new Cookies();
    if (team) {
        try {
            window.localStorage.setItem('team', JSON.stringify(team));
        } catch (e) {
            console.log(e);
        }
    } else cookies.remove('team', { path: '/' });
};

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamModal: false,
            memberModal: false,
            addTeamMember: false,
            userList: [],
            teamList: [],
            apiLoader: [],
            modal: false,
            isDeleteModal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.teamModalToggle = this.teamModalToggle.bind(this);
        this.memberModalToggle = this.memberModalToggle.bind(this);
    }

    componentDidMount = () => {
        this.props.changeSelectedTeamName(null);
        this.getTeamList();
        this.getUserList();
    };

    async getUserList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        try {
            const response = await fetchJSON(BASE_URL + '/users/list');
            apiLoader = this.state.apiLoader;
            apiLoader.pop();
            this.setState({
                apiLoader,
            });
            if (response) {
                this.setState({
                    userList: response,
                    isLoading: false,
                });
            }
        } catch (err) {
            apiLoader = [];
            this.setState({
                apiLoader,
            });
        }
    }

    async getTeamList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        try {
            const response = await fetchJSON(BASE_URL + '/team/list');
            apiLoader = this.state.apiLoader;
            apiLoader.pop();
            this.setState({
                apiLoader,
            });
            if (response) {
                this.setState({
                    teamList: response,
                    isLoading: false,
                });
            }
        } catch (err) {
            apiLoader = [];
            this.setState({
                apiLoader,
            });
        }
    }
    deleteTeam = (e) => {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        fetchJSON(BASE_URL + '/team/delete/' + this.state.selectedteamId, {
            method: 'DELETE',
            headers: {
                Authorization: '',
            },
        })
            .then((response) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                if (response) {
                    this.setState({
                        isLoading: false,
                        apiLoader,
                        selectedteamId: null,
                    });
                    setTimeout(() => {
                        this.getTeamList();
                    }, 100);
                }
                // return res.json();
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    };

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    teamModalToggle = () => {
        this.setState({
            isaAddTeam: true,
        });
    };
    memberModalToggle = () => {
        this.setState({
            isAddMember: !this.state.isAddMember,
        });
    };

    validSubmit = () => {
        this.setState({
            isAddMember: false,
            isaAddTeam: false,
            addTeamMember: false,
        });
        this.getTeamList();
        this.getUserList();
    };

    render() {
        if (this.state.redirectDashboard) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <React.Fragment>
                <div>
                    {this.state.isAddMember ? (
                        <MemberModal
                            modal={this.state.isAddMember}
                            closeModal={(e) => this.setState({ isAddMember: e })}
                            toggle={(e) => this.setState({ isAddMember: false })}
                            validSubmit={this.validSubmit}></MemberModal>
                    ) : null}
                    {this.state.isaAddTeam ? (
                        <AddTeamModal
                            modal={this.state.isaAddTeam}
                            userList={this.state.userList}
                            validSubmit={this.validSubmit}
                            toggle={(e) => this.setState({ isaAddTeam: false })}
                            closeModal={(e) => this.setState({ isaAddTeam: e })}></AddTeamModal>
                    ) : null}
                    {this.state.addTeamMember ? (
                        <AddMemberModal
                            modal={this.state.addTeamMember}
                            userList={this.state.userList}
                            validSubmit={this.validSubmit}
                            toggle={(e) => this.setState({ addTeamMember: false })}
                            selctedTeam={this.state.selctedTeam}
                            closeModal={(e) => this.setState({ addTeamMember: e })}></AddMemberModal>
                    ) : null}
                </div>

                <Row>
                    <Col sm={6}>
                        <h5 style={{ paddingTop: '1rem', paddingLeft: '0.7rem' }}>Teams</h5>
                    </Col>
                    <Col
                        sm={6}
                        style={{ paddingTop: '1.1rem' }}
                        className={userInfo['group'] === 'Admin' ? '' : 'notAdminGroup'}>
                        <Button
                            color="primary"
                            style={{ marginLeft: '0.5rem', fontSize: '0.8rem', padding: '0.2rem 0.5rem 0.2rem 0.5rem' }}
                            className="float-right "
                            onClick={this.teamModalToggle}
                            id="btn-new-event">
                            Create Team
                        </Button>
                        <Button
                            color="primary"
                            style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem 0.2rem 0.5rem' }}
                            className="float-right "
                            onClick={this.memberModalToggle}
                            id="btn-new-event">
                            Invite Member
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.apiLoader.length !== 0 && <Loader className="api-loader" />}
                    <Col lg={12}>
                        <Row>
                            {this.state.teamList.map((teams, index) => {
                                return (
                                    <Col lg={3} style={{ cursor: 'pointer' }}>
                                        {/* <Link to="/dashboard" className=" font-weight-bold text-muted ml-2"> */}
                                        <div
                                            class="card"
                                            style={{
                                                boxShadow: '0 0.05rem 0.01rem rgba(75,75,90,.075)',
                                                borderRadius: '.25rem',
                                            }}>
                                            <div class="card-body" style={{ height: '200px' }}>
                                                <UncontrolledDropdown className={userInfo['group'] === 'Admin' ? 'align-self-center float-right ' : 'align-self-center float-right  notAdminGroup'}>
                                                    <DropdownToggle
                                                        tag="button"
                                                        className="btn btn-link p-0 dropdown-toggle text-muted">
                                                        <i className="uil uil-ellipsis-v"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem className="text-success" onClick={this.toggle}>
                                                            <i className="uil uil-edit-alt mr-2"></i>Edit
                                                        </DropdownItem>

                                                        <DropdownItem
                                                            className="text-danger"
                                                            onClick={() => {
                                                                this.setState({
                                                                    isDeleteModal: true,
                                                                    selectedteamId: teams._id,
                                                                });
                                                            }}>
                                                            <i className="uil uil-trash mr-2"></i>Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                <h5
                                                    className="text-dark"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSession(teams);
                                                        this.props.changeSelectedTeamName(teams.teamName);
                                                        this.setState({
                                                            redirectDashboard: true,
                                                        });
                                                    }}>
                                                    {teams.teamName}
                                                </h5>
                                                <p
                                                    title={teams.shortDesc}
                                                    className="text-muted mb-4 custom-elipsis"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSession(teams);
                                                        this.props.changeSelectedTeamName(teams.teamName);
                                                        this.setState({
                                                            redirectDashboard: true,
                                                        });
                                                    }}>
                                                    {teams.shortDesc}
                                                </p>
                                                <div
                                                    style={{
                                                        height: '37%',
                                                        overflowY: 'hidden',
                                                        overflowX: 'auto',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                    <div
                                                        class="add-member avatar-sm font-weight-bold d-inline-block m-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            this.setState({
                                                                addTeamMember: true,
                                                                selctedTeam: teams,
                                                            });
                                                        }}>
                                                        <UserPlus
                                                            color="#5369f8"
                                                            size="20px"
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                    {teams.userId.map((userInitialLtr) => {
                                                        return (
                                                            <div class="avatar-sm font-weight-bold d-inline-block m-1">
                                                                <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                    {userInitialLtr.fullName[0]}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div style={{ padding: '0.7rem' }} class="border-top">
                                                <div class="row align-items-center">
                                                    <div class="col-sm-auto">
                                                        <ul class="list-inline mb-0">
                                                            <li class="list-inline-item pr-2">
                                                                <a
                                                                    href="javascript: void(0)"
                                                                    class="text-muted d-inline-block"
                                                                    placement="top"
                                                                    ngbTooltip="Due date">
                                                                    <i class="uil uil-calender mr-1" />{' '}
                                                                    {moment(teams.createdDate).format('DD MMM')}
                                                                </a>
                                                            </li>
                                                            <li class="list-inline-item pr-2">
                                                                <a
                                                                    href="javascript: void(0)"
                                                                    class="text-muted d-inline-block"
                                                                    placement="top"
                                                                    ngbTooltip="Tasks">
                                                                    <i class="uil  uil-users-alt mr-1" />
                                                                    {teams.userId.length}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
                {this.state.isDeleteModal ? (
                    <DeleteModal
                        modal={this.state.isDeleteModal}
                        submitAction={(e) => this.deleteTeam(e)}
                        closeModal={(e) =>
                            e
                                ? this.setState({
                                      isDeleteModal: false,
                                  })
                                : ''
                        }
                    />
                ) : null}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input type="text" id="projectName" name="projectName"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDesc">Project Description</Label>
                                <Input type="textarea" rows="3" id="projectDesc" name="projectDesc"></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" className="ml-1" onClick={this.toggle}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.toggle}>
                            Update
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { changeSelectedTeamName })(Tabs);
