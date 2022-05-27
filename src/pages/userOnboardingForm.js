import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class userOnboardingForm extends Component {
    render() {
        return (
            <React.Fragment>
                <Card className="mt-4">
                    <CardBody>
                        <h5 className="mb-4">User Onboarding Form</h5>
                        <Row>
                            <Col lg={6}>
                                <Form>
                                    <FormGroup>
                                        <Label for="text">Q. Where did you grow up?</Label>
                                        <Input type="textarea" name="text" id="text" rows="3" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">Q. Do you have any pets or favorite animals?</Label>
                                        <Input type="textarea" name="text" id="text" rows="3" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">Q. What's a book or movie you really enjoyed recently?</Label>
                                        <Input type="textarea" name="text" id="text" rows="3" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">Q. What's the most unique thing you've ever eaten?</Label>
                                        <Input type="textarea" name="text" id="text" rows="3" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">
                                            Q. Anything else you would like to share about yourself (Hobbies, favorite
                                            foods, travel aspirations, etc.)?
                                        </Label>
                                        <Input type="textarea" name="text" id="text" rows="3" />
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col lg={6}>
                                <Form>
                                    <FormGroup>
                                        <Label for="text">
                                            Q. Where on the spectrum of introvert to extrovert would you place yourself?
                                        </Label>
                                        <CustomInput
                                            type="radio"
                                            id="1"
                                            name="customRadio"
                                            label="Highly Extroverted"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="2"
                                            name="customRadio"
                                            label="Extroverted"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="3"
                                            name="customRadio"
                                            label="Equally both extroverted and introverted"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="4"
                                            name="customRadio"
                                            label="Introverted"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="5"
                                            name="customRadio"
                                            label="Highly Introverted"
                                            className="mb-1"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">
                                            Q. What's your preferred way to receive feedback, in terms of speed?
                                        </Label>
                                        <CustomInput
                                            type="radio"
                                            id="6"
                                            name="customRadio"
                                            label="Right away"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="7"
                                            name="customRadio"
                                            label="Please let me know later in the day, when I've got open time"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="8"
                                            name="customRadio"
                                            label="Please schedule a time to talk the next day, when I've had time to prepare"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="9"
                                            name="customRadio"
                                            label="Please schedule a time to talk later in the next week, when I've had time to prepare"
                                            className="mb-1"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">
                                            Q. What's your preferred way to receive feedback, in terms of format?
                                        </Label>
                                        <CustomInput
                                            type="radio"
                                            id="10"
                                            name="customRadio"
                                            label="In person / over video"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="11"
                                            name="customRadio"
                                            label="Over the phone"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="12"
                                            name="customRadio"
                                            label="In writing, via long form"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="13"
                                            name="customRadio"
                                            label="In writing, via chat"
                                            className="mb-1"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="text">Q. What's your orientation towards conflict?</Label>
                                        <CustomInput
                                            type="radio"
                                            id="14"
                                            name="customRadio"
                                            label="I relish a heated debate, and can sometimes be seen as aggressive"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="15"
                                            name="customRadio"
                                            label="I see conflict as mainly positively, and try to be proactive at times"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="16"
                                            name="customRadio"
                                            label="I tend to be neutral to conflict, and often play 'mediator' when it occurs"
                                            className="mb-1"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="17"
                                            name="customRadio"
                                            label="I'm not the biggest fan of conflict, and push hard for collaborative approaches"
                                            className="mb-1"
                                        />

                                        <CustomInput
                                            type="radio"
                                            id="18"
                                            name="customRadio"
                                            label="I'm terrified of conflict, and usually shut down if someone blows up at me"
                                            className="mb-1"
                                        />
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <div className="float-right">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default userOnboardingForm;
