import React, { Component } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import Loader from '../../components/Loader';
import { getLoggedInUser, getSelectedTeam } from '../../helpers/authUtils';
import Activity from './Activity';
import Chat from './Chat';
import Files from './Files';
import PersonalNotes from './PersonalNotes';
import MeetingNotes from './MeetingNotes';
import Tasks from './Tasks';
import DailyStandup from './Daily-Standup';
import API_KEY from '../../api';
import Card from 'reactstrap/lib/Card';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
            chatsList: [],
        };
        this.getChatListing();
    }

    getChatListing = async () => {
        const selectedTeam = getSelectedTeam();
        const result = await API_KEY.url.get(`${API_KEY.path.listChat}?teamid=${selectedTeam._id}`);
        if (result['data'] && result['data'].length) {
            this.setState({ chatsList: result['data'] });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div style={{ userSelect: 'none' }}>
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            {/* <h4 className="mb-1 mt-0">Dashboard</h4> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={4}>
                            <Tasks />
                        </Col>
                        <Col xl={8}>
                            {this.state.chatsList.length ? (
                                <Chat
                                    id={this.state.chatsList[0]._id}
                                    chatName={this.state.chatsList[0].conversationName}
                                />
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={4}>
                            <PersonalNotes />
                        </Col>
                        <Col xl={4}>
                            <DailyStandup />
                        </Col>
                        <Col xl={4}>
                            <Files />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={4}>
                            <MeetingNotes />
                        </Col>
                        <Col xl={8}>
                            {this.state.chatsList.length && this.state.chatsList[1] ? (
                                <Chat
                                    id={this.state.chatsList[1]._id}
                                    chatName={this.state.chatsList[1].conversationName}
                                />
                            ) : // <Card className="grid-cards">
                            //     <CardBody className="pt-2 pb-1">
                            //         Chat with client is not created yet.
                            //     </CardBody>
                            // </Card>
                            null}
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col xl={4}>
                            <PersonalNotes />
                        </Col>
                        <Col xl={4}>
                            <MeetingNotes />
                        </Col>
                    </Row> */}
                    {/* <Row>
                        <Col xl={12}>
                            <Activity />
                        </Col>
                    </Row> */}
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
