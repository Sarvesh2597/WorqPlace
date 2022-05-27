import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledButtonDropdown } from 'reactstrap';

const ChatProfileUser = (props) => {
    return (
        <React.Fragment>
            <div className="">
                <h3 className="mb-3 mt-5 font-size-16">Reply Later</h3>
                <Media>
                    <div className="mr-2">
                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">S</span>
                        </div>
                    </div>
                    <Media body className="overflow-hidden">
                        <h5 className="font-size-14 mt-1 mb-0">Sanket</h5>
                        <small className="text-muted">Congrats for the launch... </small>
                    </Media>
                    <UncontrolledButtonDropdown className="float-right mt-2">
                        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
                            <i className="uil uil-ellipsis-v text-muted font-size-12"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem> Remove from Reply Later</DropdownItem>
                            {/* <DropdownItem>Delete</DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Media>
            </div>
            <div className="">
                <Media>
                    <div className="mr-2">
                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">S</span>
                        </div>
                    </div>
                    <Media body className="overflow-hidden">
                        <h5 className="font-size-14 mt-1 mb-0">Sarvesh</h5>
                        <small className="text-muted">Power Outage </small>
                    </Media>
                    <UncontrolledButtonDropdown className="float-right mt-2">
                        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
                            <i className="uil uil-ellipsis-v text-muted font-size-12"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem> Remove from Reply Later</DropdownItem>
                            {/* <DropdownItem>Delete</DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Media>
            </div>

            <div className="">
                <Media>
                    <div className="mr-2">
                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">A</span>
                        </div>
                    </div>
                    <Media body className="overflow-hidden">
                        <h5 className="font-size-14 mt-1 mb-0">Abhishek</h5>
                        <small className="text-muted">Case Manager Over Usa... </small>
                    </Media>
                    <UncontrolledButtonDropdown className="float-right mt-2">
                        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
                            <i className="uil uil-ellipsis-v text-muted font-size-12"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem> Remove from Reply Later</DropdownItem>
                            {/* <DropdownItem>Delete</DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Media>
            </div>

            <div className="">
                <Media>
                    <div className="mr-2">
                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">P</span>
                        </div>
                    </div>
                    <Media body className="overflow-hidden">
                        <h5 className="font-size-14 mt-1 mb-0">Pranav</h5>
                        <small className="text-muted">API Integration </small>
                    </Media>
                    <UncontrolledButtonDropdown className="float-right mt-2">
                        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
                            <i className="uil uil-ellipsis-v text-muted font-size-12"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem> Remove from Reply Later</DropdownItem>
                            {/* <DropdownItem>Delete</DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Media>
            </div>
        </React.Fragment>
    );
};

const LeftSide = (props) => {
    return (
        <React.Fragment>
            <Link to="/apps/email/compose">
                <button type="button" className="btn btn-danger btn-block" onClick={props.toggleComposeModal}>
                    Compose
                </button>
            </Link>

            <div className="mail-list mt-4 mb-8">
                <Link
                    to="/apps/email/inbox"
                    className="list-group-item border-0 text-danger font-weight-bold"
                    onClick={props.showAllEmails}>
                    <i className="uil uil-envelope-alt font-size-15 mr-1"></i>Inbox
                    <span className="badge badge-danger float-right ml-2 mt-1">{props.totalUnreadEmails}</span>
                </Link>
                <Link to="/apps/email/sent" className="list-group-item border-0">
                    <i className="uil uil-envelope-send font-size-15 mr-1"></i>Sent Mail
                </Link>
                <Link to="/apps/email/Drafts" className="list-group-item border-0">
                    <i className="uil uil-envelope-edit font-size-15 mr-1"></i>Draft
                    <span className="badge badge-info float-right ml-2 mt-1">2</span>
                </Link>
                <Link to="/apps/email/Attachments" className="list-group-item border-0">
                    <i className="uil uil-link-alt font-size-15 mr-1"></i>Attachments
                </Link>

                <Link to="/apps/email/Trash" className="list-group-item border-0">
                    <i className="uil uil-trash font-size-15 mr-1"></i>Trash
                </Link>
            </div>
            <ChatProfileUser />
        </React.Fragment>
    );
};

export default LeftSide;
