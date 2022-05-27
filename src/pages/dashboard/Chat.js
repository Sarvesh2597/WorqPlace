import moment from 'moment';
import React, { useState, useEffect } from 'react';
import API_KEY from '../../api';
import ChatList from '../../components/ChatList';
import { getLoggedInUser } from '../../helpers/authUtils';
import io from 'socket.io-client';
import img1 from '../../assets/images/users/avtar.png';
// import socketClient  from "socket.io-client";

const Chat = (props) => {
    const userInfo = getLoggedInUser();
    const socket = io('https://chat.worqplace.io', {
        'polling duration': 1,
    });
    socket.on('RECEIVE_MESSAGE', function (data) {
        getChatDetails();
        console.log('here bvjjj');
    });

    // var socket = socketClient (SERVER);
    const [chatMessages, setChatMessages] = useState([]);
    const { id } = props;

    const getChatDetails = async () => {
        const result = await API_KEY.url.get(`${API_KEY.path.message}/${id}`);
        // if (result['data']['conversationName'])
        // setChatName(result['data']['conversationName'])
        if (result['data'] && result['data'].length) {
            const chat = [];
            result['data'].map((ele) => {
                const message = {
                    id: ele._id,
                    userPic: img1,
                    userName: userInfo.fullName === ele.userName ? 'me' : ele.userName,
                    text: ele.message,
                    postedOn: moment(ele.timestamp).format('h:mm A'),
                };
                chat.push(message);
            });
            setChatMessages(chat);
        }
    };
    useEffect(() => {
        // if (chatMessages.length === 0) {
        getChatDetails();
        // }
        return () => {
            socket.disconnect();
        };
    }, [id]);

    // useEffect(() => {
    //     console.log(chatName);
    // }, [chatMessages])

    return (
        <ChatList
            messages={chatMessages}
            chatId={id}
            chatName={props.chatName}
            messagePosted={() => {
                socket.emit('SEND_MESSAGE', {
                    author: 'test',
                });
                getChatDetails();
            }}
            notDashboard={props.notDashboard}
            height={props.notDashboard ? props.height : null}
        />
    );
};

export default Chat;
