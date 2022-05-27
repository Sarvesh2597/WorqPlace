import React from 'react';
import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

//import PageTitle from '../../components/PageTitle';

const Config = () => {
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
                <Col sm={4} xl={6}>
                    <h4 className="mb-1 mt-0">Configure your email</h4>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={6}>
                            <Form>
                                <FormGroup>
                                    <Label for="text">Full Name</Label>
                                    <Input type="text" name="text" id="text" placeholder="Sarvesh Rembhotkar" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" placeholder="xyz@xyz.com" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" value="1234"></Input>
                                </FormGroup>

                                {/* <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="password placeholder"
                                        defaultValue="12345"
                                    />
                                </FormGroup> */}
                            </Form>
                        </Col>

                        <Col lg={6}>
                            <Form>
                                <FormGroup>
                                    <Label for="smtp">Host</Label>
                                    <Input type="number" name="host" id="host" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="smtp">Port</Label>
                                    <Input type="number" name="port" id="port" />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Config;
