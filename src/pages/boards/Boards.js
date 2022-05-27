// @flow
import classNames from 'classnames';
import React, { Component } from 'react';
import { Loader } from 'react-feather';
import {
    Card,
    CardBody,
    Col,
    Row,
    UncontrolledTooltip,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from 'reactstrap';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import { BASE_URL } from '../../constants/endpoint';
import AddBoardModal from './AddBoardModal';
import DeleteModal from '../../components/DeleteModal';
import { Redirect, Link } from 'react-router-dom';

const moment = require('moment');

class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddBoard: false,
            items: [],
            apiLoader: [],
            logout: false,
            isLoading: false,
            isDeleteModal: false,
            isEdit: false,
            selectedBoard: null,
        };
    }

    componentDidMount = () => {
        this.getBoardsList();
    };

    getBoardsList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader, isLoading: true });
        const selectedTeam = getSelectedTeam();
        let userInfo = getLoggedInUser();
        fetch(BASE_URL + '/board/list?teamId=' + selectedTeam._id, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    apiLoader = this.state.apiLoader;
                    apiLoader.pop();
                    response.map((ele) => {
                        let taskCount = 0;
                        ele.taskList.map((task) => {
                            taskCount += task.todoId.length;
                        });
                        delete ele.taskList;
                        ele['taskCount'] = taskCount;
                    });
                    this.setState({
                        items: response,
                        isLoading: false,
                        logout: false,
                        apiLoader,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    deleteBoard = (e) => {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        let userInfo = getLoggedInUser();
        fetch(BASE_URL + '/board/' + this.state.selectedBoardId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                this.setState({
                    isLoading: false,
                    apiLoader,
                    selectedBoardId: null,
                    items: [],
                });
                this.getBoardsList();
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    };

    boardModalToggle = () => {
        this.setState({ isAddBoard: !this.state.isAddBoard, isEdit: false, selectedBoard: null });
    };

    modalSubmitted = () => {
        this.getBoardsList();
        this.boardModalToggle();
    };
    render() {
        const colors = ['primary'];

        if (this.state.logout) {
            return <Redirect to="/account/logout" />;
        }

        return (
            <React.Fragment>
                <Row>
                    <Col lg={10}>
                        <h4 className="mb-1 mt-3">Boards</h4>
                    </Col>
                    <Col lg={2}>
                        <button
                            type="button"
                            className="btn btn-primary mt-3 mb-1  mb-sm-0"
                            onClick={this.boardModalToggle}>
                            <i className="uil-plus mr-1"></i> Create Board
                        </button>
                    </Col>
                </Row>

                <Row>
                    {this.state.apiLoader.length !== 0 && (
                        <div style={{ width: '14rem', height: '9rem', backgroundColor: '#fff' }}>
                            <p style={{ display: 'flex', padding: '10px' }}>
                                <span className="skeleton-loader" style={{ marginRight: '10px' }} />
                                <span className="skeleton-loader" />
                            </p>
                            <p style={{ width: '70%', paddingLeft: '10px' }}>
                                <span className="skeleton-loader" />
                            </p>
                            <br />
                            <p style={{ width: '55%', paddingLeft: '10px' }}>
                                <span className="skeleton-loader" />
                            </p>
                        </div>
                    )}
                    <Col>
                        {/* {this.state.isLoading ?                 
                           <Loader className="api-loader"></Loader>
                            : */}
                        <Row>
                            {this.state.items.length > 0
                                ? this.state.items.map((item, i) => (
                                      <Col lg={3} key={item._id}>
                                          <Card className="mt-3">
                                              <Link
                                                  onClick={(e) => e.stopPropagation()}
                                                  to={`/boards/board-details/${item._id}`}
                                                  className="font-weight-bold text-muted ml-2">
                                                  <CardBody style={{ padding: '2px' }}>
                                                      <UncontrolledDropdown className="float-right ml-1 mt-2">
                                                          <DropdownToggle
                                                              tag="a"
                                                              className="dropdown-toggle p-0 arrow-none cursor-pointer">
                                                              <i
                                                                  onClick={(e) => e.preventDefault()}
                                                                  className="uil uil-ellipsis-v font-size-14"></i>
                                                          </DropdownToggle>
                                                          <DropdownMenu right>
                                                              <DropdownItem
                                                                  className="text-success"
                                                                  onClick={(e) => {
                                                                      e.preventDefault();
                                                                      this.setState({
                                                                          isEdit: true,
                                                                          selectedBoard: item,
                                                                          isAddBoard: true,
                                                                      });
                                                                  }}>
                                                                  <i className="uil uil-edit mr-2"></i>Edit
                                                              </DropdownItem>
                                                              <DropdownItem
                                                                  className="text-danger"
                                                                  onClick={(e) => {
                                                                      e.preventDefault();
                                                                      this.setState({
                                                                          isDeleteModal: !this.state.isDeleteModal,
                                                                          selectedBoardId: item._id,
                                                                      });
                                                                  }}>
                                                                  <i className="uil uil-trash mr-2"></i>Delete
                                                              </DropdownItem>
                                                          </DropdownMenu>
                                                      </UncontrolledDropdown>
                                                      <div
                                                          className={classNames('badge', 'mt-2', 'float-right', {
                                                              'badge-info': true,
                                                          })}>
                                                          {item.tag}
                                                      </div>
                                                      <h5>
                                                          {/* <a href="#" className="text-dark"> */}
                                                          {item.boardName}
                                                          {/* </a> */}
                                                      </h5>

                                                      <p
                                                          className="text-muted custom-elipsis"
                                                          style={{ marginBottom: '0px' }}>
                                                          {item.shortDesc}
                                                      </p>
                                                  </CardBody>
                                                  <Row
                                                      className="align-items-center"
                                                      style={{ padding: '0px 10px 10px 10px', fontSize: '12px' }}>
                                                      <Col className="col-sm-auto">
                                                          <ul className="list-inline mb-0">
                                                              <li className="list-inline-item pr-2">
                                                                  <span
                                                                      className="text-muted d-inline-block"
                                                                      id={`dueDate-${item.id}`}>
                                                                      <i
                                                                          className="uil uil-calender mr-1"
                                                                          id={`dueDate-${item._id}`}></i>{' '}
                                                                      {moment(item.timestamp).format('DD-MM-YYYY')}
                                                                  </span>
                                                                  <UncontrolledTooltip
                                                                      placement="top"
                                                                      target={`dueDate-${item.id}`}>
                                                                      Created date
                                                                  </UncontrolledTooltip>
                                                              </li>
                                                          </ul>
                                                      </Col>
                                                  </Row>
                                              </Link>
                                              {/* <CardBody className="border-top">
                                                
                                            </CardBody> */}
                                          </Card>
                                      </Col>
                                  ))
                                : null}
                        </Row>
                        {/* } */}

                        {this.state.isAddBoard ? (
                            <AddBoardModal
                                modal={this.state.isAddBoard}
                                toggle={this.boardModalToggle}
                                modalSubmitted={this.modalSubmitted}
                                isEdit={this.state.isEdit}
                                selectedBoard={this.state.selectedBoard}
                                closeModal={(e) => this.setState({ isAddBoard: e })}></AddBoardModal>
                        ) : null}

                        <DeleteModal
                            modal={this.state.isDeleteModal}
                            submitAction={(e) => this.deleteBoard(e)}
                            closeModal={(e) =>
                                e
                                    ? this.setState({
                                          isDeleteModal: false,
                                      })
                                    : ''
                            }></DeleteModal>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Boards;
