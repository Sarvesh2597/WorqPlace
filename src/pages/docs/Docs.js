import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledTooltip,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
import { Loader } from 'react-feather';
import { File } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import DeleteModal from '../../components/DeleteModal';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import { BASE_URL } from '../../constants/endpoint';
import UploadFiles from './UploadFiles';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from 'editor-todolist-codeblocks/build/ckeditor'
import docImg from '../../assets/images/doc_img.png';

const moment = require('moment');

class Docs extends Component {
    constructor(props) {
        super(props);
        const selectedTeam = getSelectedTeam();
        const userInfo = getLoggedInUser();
        this.state = {
            activeTab: '1',
            isDeleteModal: false,
            apiLoader: [],
            isfileModal: false,
            items: [],
            files: [],
            selectedTeam,
            userInfo,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getDocsList();
        this.getFlaggedDocsList();
        this.getFilesList();
    }

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    modalSubmitted = () => {
        this.setState({
            isfileModal: false,
        });
        this.getFilesList();
    };

    getFlaggedDocsList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        fetch(BASE_URL + '/document/list/draft?teamId=' + this.state.selectedTeam._id, {
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                if (response) {
                    this.setState({
                        items: [...this.state.items, ...response],
                        isLoading: false,
                        apiLoader,
                    });
                }
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    }

    getDocsList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        const params = this.state.serachTerm ? '&searchterm=' + this.state.serachTerm : '';
        fetch(BASE_URL + '/document/list?teamId=' + this.state.selectedTeam._id + params, {
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                if (response) {
                    this.setState({
                        items: [...this.state.items, ...response],
                        isLoading: false,
                        apiLoader,
                    });
                }
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    }

    getFilesList() {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        const params = this.state.serachTerm ? '&searchterm=' + this.state.serachTerm : '';
        fetch(BASE_URL + '/document/filelist?teamId=' + this.state.selectedTeam._id + params, {
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                if (response) {
                    this.setState({
                        files: [...this.state.files, ...response],
                        isLoading: false,
                        apiLoader,
                    });
                }
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    }

    deleteDoc = (e) => {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        fetch(BASE_URL + '/document/deletefile/' + this.state.selectedDocId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
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
                        selectedDocId: null,
                        items: [],
                        files: [],
                    });
                    setTimeout(() => {
                        this.getDocsList();
                        this.getFlaggedDocsList();
                        this.getFilesList();
                    }, 100);
                }
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    };

    downlaodFile = (fileName, originalFileName) => {
        let apiLoader = this.state.apiLoader;
        apiLoader.push(true);
        this.setState({ apiLoader: apiLoader });
        fetch(BASE_URL + '/document/downloadfile?file=' + fileName, {
            headers: {
                Authorization: `Bearer ${this.state.userInfo.token}`,
            },
        })
            .then((res) => {
                return res.blob();
            })
            .then((response) => {
                apiLoader = this.state.apiLoader;
                apiLoader.pop();
                this.setState({
                    apiLoader,
                });
                if (response) {
                    let url = window.URL.createObjectURL(response);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = originalFileName;
                    a.click();
                }
            })
            .catch((err) => {
                apiLoader = [];
                this.setState({
                    apiLoader,
                });
            });
    };

    render() {
        // const colors = ['primary'];
        const tabContents = [
            {
                id: '1',
                title: 'Docs',
                icon: 'uil-home-alt',
            },
            {
                id: '2',
                title: 'Files',
                icon: 'uil-user',
            },
        ];
        if (this.state.isUpdatefile) {
            return <Redirect to="/CreateDocs" />;
        }

        return (
            <React.Fragment>
                <Row>
                    {this.state.apiLoader.length !== 0 && <Loader className="api-loader" />}

                    <Col lg={12}>
                        <Card className="mt-3" style={{ minHeight: '35rem' }}>
                            <CardBody>
                                <Nav tabs>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <NavItem key={index}>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                                    onClick={() => {
                                                        this.toggle(tab.id);
                                                    }}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-sm-none',
                                                            'd-block',
                                                            'mr-1'
                                                        )}></i>
                                                    <span className="d-none d-sm-block">{tab.title}</span>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <TabPane tabId={tab.id} key={index}>
                                                {this.state.activeTab === '1' ? (
                                                    <div>
                                                        <Row>
                                                            {/* <Col lg={8}>
                                                            </Col> */}
                                                            <Col lg={10}>
                                                                <div className=" mt-sm-0">
                                                                    <div className="task-search d-inline-block mb-4">
                                                                        <div className="input-group">
                                                                            <DebounceInput
                                                                                minLength={1}
                                                                                className="form-control search-input"
                                                                                placeholder="Search..."
                                                                                debounceTimeout={300}
                                                                                onChange={(event) => {
                                                                                    this.setState({
                                                                                        serachTerm: event.target.value,
                                                                                        isDoc: true,
                                                                                    });
                                                                                    setTimeout(() => {
                                                                                        this.setState({ items: [] });
                                                                                        this.getDocsList();
                                                                                        this.getFlaggedDocsList();
                                                                                    }, 100);
                                                                                }}
                                                                            />
                                                                            <span className="uil uil-search icon-search"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2}>
                                                                <Link to="/CreateDocs">
                                                                    <Button
                                                                        color="primary"
                                                                        className="float-right mb-4"
                                                                        id="btn-new-event">
                                                                        Create Document
                                                                    </Button>
                                                                </Link>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            {this.state.items.map((item, index) => {
                                                                return (
                                                                    <Col lg={3}>
                                                                        <Card>
                                                                            <CardBody className="doc-box">
                                                                                <div>
                                                                                    {this.state.activeTab === '1' ? (
                                                                                        <UncontrolledDropdown className="float-right ml-1 mt-2">
                                                                                            <DropdownToggle
                                                                                                tag="a"
                                                                                                className="dropdown-toggle p-0 arrow-none cursor-pointer">
                                                                                                <i className="uil uil-ellipsis-v font-size-14"></i>
                                                                                            </DropdownToggle>
                                                                                            <DropdownMenu right>
                                                                                                <DropdownItem
                                                                                                    className="text-success"
                                                                                                    onClick={(e) => {
                                                                                                        window.localStorage.setItem(
                                                                                                            'docs',
                                                                                                            JSON.stringify(
                                                                                                                item
                                                                                                            )
                                                                                                        );
                                                                                                        this.setState({
                                                                                                            isUpdatefile: true,
                                                                                                        });
                                                                                                    }}>
                                                                                                    <i className="uil uil-edit mr-2"></i>
                                                                                                    Edit
                                                                                                </DropdownItem>
                                                                                                <DropdownItem
                                                                                                    className="text-danger"
                                                                                                    onClick={(e) =>
                                                                                                        this.setState({
                                                                                                            isDeleteModal:
                                                                                                                !this
                                                                                                                    .state
                                                                                                                    .isDeleteModal,
                                                                                                            selectedDocId:
                                                                                                                item._id,
                                                                                                        })
                                                                                                    }>
                                                                                                    <i className="uil uil-trash mr-2"></i>
                                                                                                    Delete
                                                                                                </DropdownItem>
                                                                                            </DropdownMenu>
                                                                                        </UncontrolledDropdown>
                                                                                    ) : null}
                                                                                    <div
                                                                                        className={classnames(
                                                                                            'badge',
                                                                                            'mt-2',
                                                                                            'float-right',
                                                                                            {
                                                                                                'badge-warning':
                                                                                                    item.isDraftFlaged,
                                                                                                'badge-success':
                                                                                                    !item.isDraftFlaged,
                                                                                            }
                                                                                        )}>
                                                                                        {item.isDraftFlaged
                                                                                            ? 'Draft'
                                                                                            : 'Published'}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="img-box"
                                                                                    onClick={(e) => {
                                                                                        window.localStorage.setItem(
                                                                                            'docs',
                                                                                            JSON.stringify(item)
                                                                                        );
                                                                                        this.setState({
                                                                                            isUpdatefile: true,
                                                                                        });
                                                                                    }}
                                                                                    style={{ cursor: 'pointer' }}>
                                                                                    <img
                                                                                        src={docImg}
                                                                                        height="80"
                                                                                        alt="doc image"
                                                                                    />
                                                                                </div>
                                                                                {/* <div className="custom-elipsis-doc" onClick={(e) => {
                                                                                    window.localStorage.setItem('docs', JSON.stringify(item));
                                                                                    this.setState({
                                                                                        isUpdatefile: true
                                                                                    })
                                                                                }}>
                                                                                    <CKEditor
                                                                                        editor={ClassicEditor}
                                                                                        config={{
                                                                                            removePlugins: 'toolbar',
                                                                                        }}
                                                                                        data={''}
                                                                                        onInit={editor => {
                                                                                            editor.editing.view.change(writer => {
                                                                                                writer.setStyle(
                                                                                                    "height",
                                                                                                    "5rem",
                                                                                                    editor.editing.view.document.getRoot()
                                                                                                );
                                                                                            });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                             */}
                                                                                <div className="card-bottom-text">
                                                                                    <h6
                                                                                        onClick={(e) => {
                                                                                            window.localStorage.setItem(
                                                                                                'docs',
                                                                                                JSON.stringify(item)
                                                                                            );
                                                                                            this.setState({
                                                                                                isUpdatefile: true,
                                                                                            });
                                                                                        }}>
                                                                                        <a>{item.fileName}</a>
                                                                                    </h6>
                                                                                </div>

                                                                                {/* <CardBody className="border-top card-title">
                                                                                    <Row className="align-items-center">
                                                                                        <Col className="col-sm-auto">
                                                                                            <ul className="list-inline" onClick={this.toggle}>
                                                                                                <li className="list-inline-item pr-2">
                                                                                                    <i className="uil uil-calender mr-1" id={`dueDate-${item._id}`}></i> {moment(item.timestamp).format("DD-MM-YYYY")}
                                                                                                 
                                                                                                    <UncontrolledTooltip placement="top" target={`dueDate-${item._id}`}>
                                                                                                        Created Date
                                                                                            </UncontrolledTooltip>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </CardBody> */}
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                );
                                                            })}
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <Row>
                                                            {/* <Col lg={8}>
                                                            </Col> */}
                                                            <Col lg={10}>
                                                                <div className="mt-sm-0">
                                                                    <div className="task-search d-inline-block mb-4">
                                                                        <div className="input-group">
                                                                            <DebounceInput
                                                                                minLength={1}
                                                                                className="form-control search-input"
                                                                                placeholder="Search..."
                                                                                debounceTimeout={300}
                                                                                onChange={(event) => {
                                                                                    this.setState({
                                                                                        serachTerm: event.target.value,
                                                                                        isDoc: true,
                                                                                    });
                                                                                    setTimeout(() => {
                                                                                        this.setState({ files: [] });
                                                                                        this.getFilesList();
                                                                                    }, 100);
                                                                                }}
                                                                            />
                                                                            <span className="uil uil-search icon-search"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2}>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={(e) =>
                                                                        this.setState({
                                                                            isfileModal: !this.state.isfileModal,
                                                                        })
                                                                    }
                                                                    className="float-right mb-4"
                                                                    id="btn-new-event">
                                                                    Upload Files
                                                                </Button>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            {this.state.files.map((item, i) => {
                                                                return (
                                                                    <Col lg={3}>
                                                                        <Card className="project-border">
                                                                            <CardBody>
                                                                                <UncontrolledDropdown className="float-right ml-1 mt-2">
                                                                                    <DropdownToggle
                                                                                        tag="a"
                                                                                        className="dropdown-toggle p-0 arrow-none cursor-pointer">
                                                                                        <i className="uil uil-ellipsis-v font-size-14"></i>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu right>
                                                                                        <DropdownItem
                                                                                            className="text-danger"
                                                                                            onClick={(e) =>
                                                                                                this.setState({
                                                                                                    isDeleteModal:
                                                                                                        !this.state
                                                                                                            .isDeleteModal,
                                                                                                    selectedDocId:
                                                                                                        item._id,
                                                                                                })
                                                                                            }>
                                                                                            <i className="uil uil-trash mr-2"></i>
                                                                                            Delete
                                                                                        </DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </UncontrolledDropdown>
                                                                                <div className="d-flex justify-content-space-around mt-1 file-card">
                                                                                    <File className="text-dark mr-2" />
                                                                                    <div
                                                                                        className="font-size-16 text-primary pointer file-card-text"
                                                                                        onClick={() =>
                                                                                            this.downlaodFile(
                                                                                                item.fileName,
                                                                                                item.originalFileName
                                                                                            )
                                                                                        }>
                                                                                        {item.originalFileName}
                                                                                    </div>
                                                                                </div>
                                                                                {/* <a href={file.filePath} target="_blank">See Photo </a>  */}
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                );
                                                            })}
                                                        </Row>
                                                    </div>
                                                )}
                                            </TabPane>
                                        );
                                    })}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    {this.state.isfileModal ? (
                        <UploadFiles
                            modal={this.state.isfileModal}
                            modalSubmitted={this.modalSubmitted}
                            closeModal={(e) =>
                                e
                                    ? this.setState({
                                          isfileModal: false,
                                      })
                                    : ''
                            }></UploadFiles>
                    ) : null}
                    {this.state.isDeleteModal ? (
                        <DeleteModal
                            modal={this.state.isDeleteModal}
                            submitAction={(e) => this.deleteDoc(e)}
                            closeModal={(e) =>
                                e
                                    ? this.setState({
                                          isDeleteModal: false,
                                      })
                                    : ''
                            }
                        />
                    ) : null}

                    {/* tab pills */}
                </Row>
            </React.Fragment>
        );
    }
}

export default Docs;
