import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import RichTextEditor from '../pages/forms/Editor';

/* Chat Item Avatar */
const ChatItemAvatar = ({ userAvatar }) => {
    return (
        <div className="chat-avatar">
            <img src={userAvatar} alt={userAvatar} />
        </div>
    );
};

/* Chat Item Text */
const ChatItemText = ({ userName, text, postedOn }) => {
    return (
        <div className="conversation-text">
            <div className="ctext-wrap">
                <div>
                    <i style={{ color: colorText, display: 'inline-block', marginRight: '1rem' }}>{userName}</i>
                    <span>{postedOn}</span>
                </div>
                <p>{text}</p>
            </div>
        </div>
    );
};

/* Chat Item */
const chatItemDefaultProps = {
    placement: '',
    children: PropTypes.object,
    className: '',
};

const ChatItem = ({ children, placement, className }) => {
    return <li className={classNames('clearfix', { odd: placement === 'left' }, className)}>{children}</li>;
};

ChatItem.defaultProps = chatItemDefaultProps;

/**
 * Renders the ChatList
 */
class ChatForm extends Component {
    constructor(props) {
        super(props);

        //  this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleValidMessageSubmit = this.handleValidMessageSubmit.bind(this);
    }

    /**
     * Handle valid form submission
     */
    handleValidMessageSubmit = (event, values) => {
        this.props.onNewMessagesPosted(values);
    };

    render() {
        const initialContent =
            '<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>';
        return (
            <React.Fragment>
                <RichTextEditor onEditorContentChange={() => {}} initialContent={initialContent} />

                <button type="submit" className="btn btn-primary float-right mb-3 mr-3 chat-send button-height">
                    Send
                </button>
            </React.Fragment>
        );
    }
}

/**
 * ChatList
 */

class ChatBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
        };
        this.handleNewMessagePosted = this.handleNewMessagePosted.bind(this);
    }

    /**
     * Handle new message posted
     */
    handleNewMessagePosted = (message) => {
        // save new message
        this.setState({
            messages: this.state.messages.concat({
                id: this.state.messages.length + 1,
                userName: 'Shreyu',
                text: message.text,
                postedOn: '10:00',
            }),
        });
    };

    render() {
        const height = this.props.height || '320px';
        return (
            <Card>
                <CardBody className="pt-2 pb-1">
                    <UncontrolledDropdown className="mt-2 float-right mb-2 ml-2">
                        <DropdownToggle tag="button" className="btn btn-link arrow-none p-0 text-muted">
                            <i className="uil uil-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <i className="uil uil-edit-alt mr-2"></i>Edit
                            </DropdownItem>
                            <DropdownItem>
                                <i className="uil uil-exit mr-2"></i>Remove from Team
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="text-danger">
                                <i className="uil uil-trash mr-2"></i>Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <div className="text-primary">
                        <i className="uil uil-video icon-size float-right mt-1"></i>
                    </div>

                    {/* <i className="uil uil-video icon-size float-right mt-1"></i> */}

                    {/* <h5 className="mb-4 header-title">Group Chat</h5> */}

                    <div className="chat-conversation">
                        <PerfectScrollbar style={{ maxHeight: 'height', width: '100%' }}>
                            <ul className={classNames('conversation-list', this.props.className)}>
                                {this.state.messages.map((message, i) => {
                                    return (
                                        <ChatItem key={i} placement={i > 0 ? (i % 2 === 0 ? '' : 'left') : 'right'}>
                                            {message.userPic && <ChatItemAvatar userAvatar={message.userPic} />}
                                            <ChatItemText
                                                userName={message.userName}
                                                postedOn={message.postedOn}
                                                text={message.text}
                                            />
                                        </ChatItem>
                                    );
                                })}
                            </ul>
                        </PerfectScrollbar>

                        {/* chat form */}
                        <ChatForm onNewMessagesPosted={this.handleNewMessagePosted} />
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ChatBoard;
