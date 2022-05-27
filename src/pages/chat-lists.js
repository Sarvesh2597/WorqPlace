import React, { Component } from 'react';
import { Loader } from 'react-feather';
import { Card, CardBody, Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { getSelectedTeam } from '../helpers/authUtils';
import API_KEY from '../api';
import Chat from './dashboard/Chat';

const ChatLists = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabContents, setTabContents] = React.useState([]);
    const messageArea = React.useRef();
    const getChatListing = async () => {
        const selectedTeam = getSelectedTeam();
        const result = await API_KEY.url.get(`${API_KEY.path.listChat}?teamid=${selectedTeam._id}`);
        console.log(result);
        if (result['data'] && result['data'].length) {
            const tabContents = [];
            result['data'].map((team, i) => {
                tabContents.push({
                    id: i + 1,
                    title: team.conversationName,
                    chatID: team._id,
                    icon: 'uil-home-alt',
                });
            });
            setTabContents(tabContents);
        }
    };

    React.useEffect(() => {
        getChatListing();
    }, []);

    return (
        <React.Fragment>
            <Row>
                {/* {this.state.apiLoader.length !== 0 && <Loader className="api-loader" />} */}
                <Col lg={12}>
                    <section
                        style={{ height: 'calc(100vh - 100px)', position: 'fixed', width: '85%' }}
                        className="relative my-3 bg-white"
                        ref={messageArea}>
                        <div
                            style={{
                                height: (messageArea.current?.offsetHeight * 8) / 100,
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: 20,
                                border: '0px solid #ededed',
                                borderBottomWidth: 1,
                            }}>
                            {tabContents.map((tab, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classnames(`border border-0 ml-4`, { background: '#fff' })}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                        }}>
                                        <span
                                            className="d-none d-sm-block"
                                            style={{
                                                color: activeTab === tab.id ? 'blue' : '#000',
                                                cursor: 'pointer',
                                            }}>
                                            {tab.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ height: (messageArea.current?.offsetHeight * 92) / 100, background: '#fff' }}>
                            {tabContents.length ? (
                                <Chat
                                    id={tabContents[Number(activeTab) - 1].chatID}
                                    notDashboard={true}
                                    height={(messageArea.current?.offsetHeight * 92) / 100}
                                />
                            ) : null}
                        </div>
                    </section>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ChatLists;
