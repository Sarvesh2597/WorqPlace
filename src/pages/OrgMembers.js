import React, { Component } from 'react';
import { Row, Col, Table, CardBody, Card, Badge, Button } from 'reactstrap';
import { fetchJSON } from '../helpers/api';
import { BASE_URL } from '../constants/endpoint';
import 'react-perfect-scrollbar/dist/css/styles.css';
import DeleteModal from '../components/DeleteModal';
import { getLoggedInUser, getSelectedTeam } from '../helpers/authUtils';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

const setSession = (team) => {
    let cookies = new Cookies();
    if (team) cookies.set('team', JSON.stringify(team), { path: '/' });
    else cookies.remove('team', { path: '/' });
};
class OrgMembers extends Component {
    constructor(props) {
        super(props);
        const selectedTeam = getSelectedTeam();
        const userInfo = getLoggedInUser();
        this.state = {
            userList: [],
            apiLoader: [],
            isDeleteModal: false,
            selectedTeam,
            userInfo,
            userId: null
        };
    }
    async getUserList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        try {
            const response = await fetchJSON(BASE_URL + '/users/list/all');
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

    componentDidMount = () => {
        if (this.state.selectedTeam) {
            if (this.state.selectedTeam.hq) {
                this.getUserList();
            } else {
                this.setState({userList: this.state.selectedTeam.userId})
            }
        } else {
            this.setState({redirectToHome: true})
        }
    };
    
    getTeamDetails = async () => {
        try {
            const response = await fetchJSON(BASE_URL + '/team/list/' +  this.state.selectedTeam._id)
            if (response) {
                console.log(response);
                setSession(response);
                this.setState({userList: response.userId, selectedTeam: response})
            }
        } catch (err) {
        }
    }

    onDeleteUser = () => {
       let apiUrl = '';
       if(this.state.selectedTeam && this.state.selectedTeam.hq) {
        apiUrl = BASE_URL + '/users/delete/' + this.state.selectedUserId;
       } else {
        apiUrl = BASE_URL + `/team/remove/user/${this.state.selectedTeam._id}/${this.state.selectedUserId}`;
       }
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.setState({
                        selectedUserId: null,
                        userList: [],
                    });
                    setTimeout(() => {
                        if (this.state.selectedTeam.hq) {
                            this.getUserList();
                        } else {
                            this.getTeamDetails();
                        }
                    }, 100)
                }
            })
            .catch((err) => {
                // add toasterhere
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.redirectToHome ?
                    <Redirect to = '/home' />
                : null}
                <Row className="page-title align-items-center">
                    <Col sm={4} xl={6}>
                        <h4 className="mb-1 mt-0">Organisation Members</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Job Position</th>
                                            <th>Role</th>
                                            <th>Status</th> 
                                            {this.state.userInfo.group === 'Admin' ? 
                                                <th></th> : null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userList.map((user) => {
                                            return (
                                                <tr>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.position}</td>
                                                    <td>
                                                        {user.isClient ? (
                                                            <Badge color="primary">
                                                                <span className="font-size-13">Client</span>
                                                            </Badge>
                                                        ) : (
                                                            <Badge color="info">
                                                                <span className="font-size-13">User</span>
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {user.isActive ? (
                                                            <Badge color="success">
                                                                <span className="font-size-13">Active</span>
                                                            </Badge>
                                                        ) : (
                                                            <Badge color="danger">
                                                                <span className="font-size-13">Inactive</span>
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    {this.state.userInfo.group === 'Admin' && user.role === "202" ? 
                                                    <td> 
                                                        {
                                                            user.isActive ?  <Button className="btn btn-xs" color="outline-danger" onClick={() => {
                                                                this.setState({ isDeleteModal: !this.state.isDeleteModal, selectedUserId: user._id})
                                                            }}>
                                                                Remove
                                                            </Button> : null
                                                        }
                                                       
                                                    </td> : null }
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    this.state.isDeleteModal ?
                        <DeleteModal modal={this.state.isDeleteModal} submitAction={(e) => this.onDeleteUser()} closeModal={(e) => e ? this.setState({
                            isDeleteModal: false
                        }) : ''} />
                        : null
                }
            </React.Fragment>
        );
    }
}

export default OrgMembers;
