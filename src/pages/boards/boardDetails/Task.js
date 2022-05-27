import React from 'react';
import classNames from 'classnames';
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function Task({ item }) {
    const concatUserName = (user) => {
        var splitString = user.userName.split(' ');
        if (splitString.length > 1) {
            return splitString[0][0] + splitString[1][0];
        }
        return splitString;
    };
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h6 className="mt-0 mb-2 font-size-15 skeleton-loader">{item?.title}</h6>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="dropdown-toggle p-0 arrow-none cursor-pointer">
                        <i className="uil uil-ellipsis-v text-dark font-size-14"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem className="text-danger">
                            <i className="uil uil-trash mr-2"></i>Delete Task
                        </DropdownItem>
                        <DropdownItem className="text-info">
                            <i className="uil uil-copy mr-2"></i>Copy
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            {item?.assignTo?.length > 0 && (
                <div>
                    <span className="text-wrap align-middle font-size-13 mr-2">
                        <strong>Assign To</strong>
                    </span>
                    {item?.assignTo.map((user) => (
                        <span
                            key={user?._id}
                            className="text-wrap align-middle"
                            style={{
                                margin: '5px',
                                backgroundColor: 'burlywood',
                                padding: '5px',
                                borderRadius: '14px',
                                fontSize: '12px',
                            }}>
                            {user ? concatUserName(user) : null}
                        </span>
                    ))}
                </div>
            )}

            <p className="mb-0 mt-4">
                <span className="text-nowrap align-middle font-size-13 mr-2 skeleton-loader">
                    {item.title && <i className="uil uil-comments-alt text-muted mr-1"></i>}
                    {item?.comments?.length}
                </span>

                <span
                    className={classNames('badge', {
                        'badge-soft-danger': item?.priority === 'High',
                        'badge-soft-info': item?.priority === 'Medium',
                        'badge-soft-success': item?.priority === 'Low',
                    })}>
                    {item?.priority}
                </span>

                <span className="text-nowrap align-middle font-size-13 mr-2 skeleton-loader">
                    {item.title && <i className="uil uil-file-alt text-muted mr-1"></i>}
                    {item?.attachments?.length}
                </span>
                <small className="float-right text-muted">{item?.createdDate?.slice(0, 10)}</small>
            </p>
        </div>
    );
}
