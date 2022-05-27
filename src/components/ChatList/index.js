import React, { Component } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import 'react-perfect-scrollbar/dist/css/styles.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import API_KEY from '../../api';
import { getSelectedTeam } from '../../helpers/authUtils';
import sendIcon from '../../assets/images/send.png';
import TextareaAutosize from 'react-textarea-autosize';
// This file need to be imported after ClassicEditor import in order to make it override default styles.
import { useResizeDetector } from 'react-resize-detector';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolBar';
import 'react-quill/dist/quill.snow.css';

const HtmlToReactParser = require('html-to-react').Parser;
/* Chat Item Avatar */
const ChatItemAvatar = ({ userAvatar }) => {
    return (
        <div className="chat-avatar">
            <img src={userAvatar} alt={userAvatar} />
        </div>
    );
};

/* Chat Item Text */
const ChatItemText = ({ userName, text, colorText, postedOn }) => {
    return (
        <div className="conversation-text">
            <div className="ctext-wrap" style={{ textAlign: 'start' }}>
                <div>
                    <i style={{ color: colorText, display: 'inline-block', marginRight: '1rem' }}>{userName}</i>
                    <span>{postedOn}</span>
                </div>
                <p style={{ color: 'black'}}dangerouslySetInnerHTML={{ __html: text }} />
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
const ChatForm = (props) => {
    const [message, setMessage] = React.useState('');
    const { width, height, ref: textAreaRef } = useResizeDetector();

    /**
     * Handle valid form submission
     */
    const handleValidMessageSubmit = (event, values) => {
        event.preventDefault();
        if (!message) return;
        const payload = {
            text: message,
        };
        props.onNewMessagesPosted(props.notDashboard ? payload : values);
        setMessage('');
    };

    const onHeightChange = React.useCallback(() => {
        textAreaRef.current?.offsetHeight && props.onIncTextArea(height);
    }, [height]);

    React.useEffect(() => {
        onHeightChange();
    }, [height]);

    return (
        <form onSubmit={handleValidMessageSubmit} className="needs-validation" name="chat-form" id="chat-form">
            {props.notDashboard ? (
                <section ref={textAreaRef} style={{ width: '100%', overflow: 'hidden', outline: 'none' }}>
                    <ReactQuill
                        theme="snow"
                        value={message}
                        onChange={setMessage}
                        onKeyDown={(e)=>e.keyCode === 13 && handleValidMessageSubmit(e)}
                        placeholder={'Message'}
                        modules={modules}
                        formats={formats}
                        className="border-0"
                        style={{ border: '0px solid #f2f2f2' }}
                    />
                    <EditorToolbar />
                </section>
            ) : (
                <section style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                        onHeightChange={props.onIncTextArea}
                        minRows={1}
                        placeholder="Message"
                        value={message}
                        style={{ width: '100%', outline: 'none' }}
                        onKeyDown={(e)=>e.keyCode === 13 && handleValidMessageSubmit(e, {text: e.target.value})}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        className="p-3 border-0"
                    />
                    <button type="submit" className={`btn`}>
                        <img src={sendIcon} style={{ height: 20 }} />
                    </button>
                </section>
            )}
        </form>
    );
};

/**
 * ChatList
 */

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.userList = getSelectedTeam();
        const chatUsers = [];
        this.userList.userId.map((ele) => {
            chatUsers.push({
                name: ele.fullName,
                color: this.getRandomColor(),
            });
        });
        this.state = {
            messages: this.props.messages,
            chatUsers: chatUsers,
            textAreaHeight: 0,
        };
    }

    componentDidMount() {
        this.handleNewMessagePosted = this.handleNewMessagePosted.bind(this);
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const objDiv = document.getElementById('chat-div');
        objDiv.scrollTop = objDiv.scrollHeight;
    };

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getChatUserColor(username) {
        const user = this.state.chatUsers.find((ele) => ele.name === username);
        return user ? user.color : 'blue';
    }

    handleNewMessagePosted = async (text) => {
        const message = {
            message: text.text,
            id: this.props.chatId,
        };
        API_KEY.url
            .put(`${API_KEY.path.message}`, message)
            .then((res) => {
                if (res['data']['success']) {
                    this.props.messagePosted();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    _onIncTextArea = (height = 0) => {
        this.setState({ textAreaHeight: height });
    };

    render() {
        const height = this.props.notDashboard ? this.props.height : 370;

        return (
            <div>
                {/* <UncontrolledDropdown className="mt-2 float-right ml-2">
                        <DropdownToggle tag="button" className="btn btn-link arrow-none p-0 text-muted">
                            <i className="uil uil-ellipsis-v "></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem className="text-info">
                                <i className="uil uil-pen mr-2"></i>Unpin
                            </DropdownItem>
                            <DropdownItem>
                                <i className="uil uil-exit mr-2"></i>Remove from Team
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="text-danger"><i className="uil uil-trash mr-2"></i>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> */}

                {/* <div className="text-primary">
                        <i className="uil uil-video icon-size float-right mt-1"></i>
                    </div> */}

                {/* <h5 className="mb-4 header-title">{this.props.chatName}</h5> */}

                <div
                    id="chat-div"
                    className="scrollbar-container-chat p-4"
                    style={{
                        height: this.props.notDashboard ? height - (this.state.textAreaHeight + 15) : height,
                        width: '100%',
                        overflowY: 'auto !important',
                        background: '#fff',
                    }}>
                    <ul className={classNames('conversation-list', this.props.className)}>
                        {this.props.messages.map((message, i) => {
                            return (
                                <ChatItem key={i} placement={message.userName === 'me' ? 'left' : 'right'}>
                                    {message.userPic && <ChatItemAvatar userAvatar={message.userPic} />}
                                    <ChatItemText
                                        colorText={this.getChatUserColor(message.userName)}
                                        userName={message.userName}
                                        text={message.text}
                                        postedOn={message.postedOn}
                                    />
                                </ChatItem>
                            );
                        })}
                    </ul>
                </div>
                {/* chat form */}

                <div
                    style={{
                        height: this.state.textAreaHeight,
                        border: this.props.notDashboard ? '1px solid #ccc' : 'none',
                        background: '#fff',
                        overflow: 'hidden',
                    }}
                    className={classNames({
                        'mx-0 my-0': !this.props.notDashboard,
                        'mx-4 my-2 rounded-sm': this.props.notDashboard,
                    })}>
                    <ChatForm
                        onNewMessagesPosted={this.handleNewMessagePosted}
                        notDashboard={this.props.notDashboard}
                        onIncTextArea={this._onIncTextArea}
                    />
                </div>
            </div>
        );
    }
}

export default ChatList;
