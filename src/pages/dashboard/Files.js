import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Media, Row, UncontrolledDropdown } from 'reactstrap';
import { BASE_URL } from '../../constants/endpoint';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import moment from 'moment';

const Member = ({ image, name, fileName, time, className, icon }) => {

    const userInfo = getLoggedInUser()

    const downloadFile = () => {
        fetch(BASE_URL + '/document/downloadfile?file=' + fileName, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                return res.blob();
            })
            .then((response) => {
                if (response) {
                    let url = window.URL.createObjectURL(response);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = name;
                    a.click();
                }
            })
            .catch((err) => {

            });
    }

    return (
        <Media className="mt-1 border-top pt-3">
            <Media body>
                <h6 onClick={() => fileName && downloadFile()} className="mt-1 mb-0 font-size-15" style={{ cursor: fileName ? 'pointer' : '' }}>{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{time}</h6>
            </Media>
        </Media>

        // <Media className="mt-1 border-top pt-3">
        //     <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
        //     <Media body>
        //         <Row>
        //             <Col>
        //                 <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col sm={6}>
        //                 <h6 className="text-muted font-weight-normal mt-1 ">{description}</h6>
        //             </Col>
        //             <Col sm={6}>
        //                 <h6 className="text-muted font-size font-weight-normal mb-3">{time}</h6>
        //             </Col>
        //         </Row>
        //     </Media>
        // </Media>
    );
};

const Performers = () => {

    const selectedTeam = getSelectedTeam()
    const userInfo = getLoggedInUser()

    const [searchTerm, setSearchTerm] = useState('');
    const [files, setFiles] = useState([]);

    const getFilesList = () => {
        const params = searchTerm ? '&searchterm=' + searchTerm : '';
        fetch(BASE_URL + '/document/listall?teamId=' + selectedTeam._id + params, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response) {
                    setFiles(response)
                }
            })
            .catch((err) => {

            });
    }

    useEffect(() => {
        getFilesList()
    }, [searchTerm])

    return (
        <Card className="grid-cards">
            <CardBody className="pb-0 pt-2">
                <Row>
                    <Col lg={6}>
                        <h5 className="mb-3 header-title">Files & Docs</h5>
                    </Col>
                    <Col lg={6}>
                        <div className="float-sm-right mt-3 mt-sm-0">
                            <div className="task-search d-inline-block mb-3 mb-sm-0 mr-sm-2">
                                <form>
                                    <div className="input-group">
                                        <DebounceInput
                                            minLength={1}
                                            className="form-control search-input"
                                            placeholder="Search..."
                                            debounceTimeout={300}
                                            onChange={event => {
                                                setSearchTerm(event.target.value)
                                            }}
                                        />
                                        <span className="uil uil-search icon-search"></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>

                </Row>
                <PerfectScrollbar style={{ maxHeight: '376px', minHeight: '376px' }}>
                    {files.map((file, index) => (
                        <div style={{display: 'flex', flexDirection: 'row'}} key={index}>
                            <div lg={1} className="mt-4 mr-2">
                                {file.fileUrl
                                    ? <i className="uil uil-archive icon-height icon-size"></i>
                                    : <i className="uil uil-file icon-height icon-size"></i>}
                            </div>
                            <div lg={11}>
                                <Member name={file.fileUrl ? file.originalFileName : file.fileName} fileName={file.fileUrl ? file.fileName : ''} time={moment(file.timestamp).format('DD MMM, hh:mm a')} />
                            </div>
                        </div>
                    ))}

                </PerfectScrollbar>
                {/* <i className="uil uil-archive icon-height icon-size"></i>	<Member name="Word.exe" description="xd file" /> */}
                {/* <Member name="Project	" description="Requirements" /><i className="uil uil-archive float-right icon-height icon-size"></i>
				<Member name="API Details	" description="End points for testing API's" /><i className="uil uil-file float-right icon-height icon-size"></i>
				<Member name="Authentication system design	" description="OAuth 2.0 POC" /><i className="uil uil-file float-right icon-height icon-size"></i> */}
            </CardBody>
        </Card>
    );
};

export default Performers;
