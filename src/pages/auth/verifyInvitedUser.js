import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, InputGroup, Label, Row, UncontrolledAlert } from 'reactstrap';
import { isUserAuthenticated } from '../../helpers/authUtils';
import { BASE_URL, PASSWORD_REGEX } from '../../constants/endpoint';
import CompanyLogo from '../../assets/images/users/worqplace-logo.png';



class VerifyInvotedUser extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            passwordResetSuccessful: false,
            isLoading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * On error dismiss
     */
    onDismiss() {
        this.setState({ passwordResetSuccessful: false });
    }

    handleValidSubmit = (event, values) => {
        if (values.new_password && values.confirm_new_password)
        if (values['new_password'].match(PASSWORD_REGEX)) {
            if (values.new_password !== values.confirm_new_password) {
                this.setState({
                    err: true,
                    message: 'New password and confirm password does not match',
                });
            } else {
                this.updatePassword(values);
            }
        } else {
            this.setState({
                err: true,
                message: "Password required with Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }
    };

    updatePassword(values) {
        const payload = {
            password: values.new_password,
            token: decodeURI(this.props.location.search).split('=')[1],
        }
        fetch(BASE_URL + '/users/verify-invited-user', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    this.setState({
                        isLoaded: false,
                        err: true,
                        message: data.message,
                    });
                } else {    
                    this.setState({
                        err: false,
                        message: data.message,
                    });
                    setTimeout(()=> {
                        this.setState({
                            redirectLogin: true
                        })
                    }, 2000)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        if (this.state.redirectLogin) {
            return <Redirect to="/account/login" />
        }
        return (
            <React.Fragment>

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="text-center">
                                    <CardBody className="p-4">
                                        <div className="mx-auto mb-5">
                                        <a href="/">
                                            <img src={CompanyLogo} alt="" height="27" />                                                     
                                        </a>
                                        </div>

                                            {this.state.err && this.state.message ? (
                                                <UncontrolledAlert color="danger">{this.state.message}.</UncontrolledAlert>
                                            ) : this.state.message ? (
                                                <UncontrolledAlert color="success ">{this.state.message}.</UncontrolledAlert>
                                            ) : null}

                                            <AvForm
                                                onValidSubmit={this.handleValidSubmit}
                                                className="authentication-form">
                                                <AvGroup className="">
                                                    <Label for="password">Enter New Password</Label>
                                                    <InputGroup>
                                                        <AvInput
                                                            type="password"
                                                            name="new_password"
                                                            id="newpassword"
                                                            required
                                                        />
                                                    </InputGroup>

                                                    <AvFeedback>This field is invalid</AvFeedback>
                                                </AvGroup>

                                                <AvGroup className="">
                                                    <Label for="password">Confirm New Password</Label>
                                                    <InputGroup>
                                                        <AvInput
                                                            type="password"
                                                            name="confirm_new_password"
                                                            id="confirmnewpassword"
                                                            required
                                                        />
                                                    </InputGroup>
                                                    <AvFeedback>This field is invalid</AvFeedback>
                                                </AvGroup>
                                                <Button type="submit" color="primary" className="btn-block" id="btn-new-event">
                                                    Submit
                                                </Button> 
                                            </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}

export default VerifyInvotedUser;