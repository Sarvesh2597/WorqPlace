import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import 'react-perfect-scrollbar/dist/css/styles.css';

import ChatBoard from '../components/ChatBoard';

import avatarImg4 from '../assets/images/users/avatar-4.jpg';
import avatarImg7 from '../assets/images/users/avatar-7.jpg';
import API_KEY from '../api';

const GroupChat = (props) => {
    const [chatMessages, setChatMessages] = useState([]);
    console.log(props);
    const {
    id
    } = props;
    // const id = "60583fec2e19fa1ca04b8714";
    useEffect(() => {
        getChatDetails();
    })
    const getChatDetails = async () => {
        const result = await API_KEY.url.get(`${API_KEY.path.listChat}${id}`);
        console.log(result);
    }
    // const chatMessages = [
    //     { id: 1, userPic: avatarImg4, userName: 'Geneva', text: 'Hello!', postedOn: '10:00' },
    //     {
    //         id: 2,
    //         userPic: avatarImg7,
    //         userName: 'Shreyu',
    //         text: 'Hi, How are you? What about our next meeting?',
    //         postedOn: '10:01',
    //     },
    //     { id: 3, userPic: avatarImg4, userName: 'Geneva', text: 'Yeah everything is fine', postedOn: '10:02' },
    //     { id: 4, userPic: avatarImg7, userName: 'Shreyu', text: "Wow that's great!", postedOn: '10:03' },
    //     { id: 5, userPic: avatarImg7, userName: 'Shreyu', text: 'Cool!', postedOn: '10:03' },
    // ];

    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
                <Col sm={4} xl={6}>
                    <h4 className="mb-1 mt-0">Group Chat</h4>
                </Col>
            </Row>
            <div>
                <ChatBoard messages={chatMessages} height="789px"></ChatBoard>
            </div>
        </React.Fragment>
    );
};

export default GroupChat;
