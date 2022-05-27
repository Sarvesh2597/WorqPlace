import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Codesandbox, Lock, Mail, User } from 'react-feather';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Col, Container, CustomInput, FormGroup, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import MemberLogo from '../../assets/images/users/telecommuting-concept-illustration_52683-36113.jpg';
import CompanyLogo from '../../assets/images/users/worqplace-logo.png';
import Loader from '../../components/Loader';
import { isUserAuthenticated } from '../../helpers/authUtils';
import { registerUser } from '../../redux/actions';

import { PASSWORD_REGEX } from '../../constants/endpoint';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData:{},
            err: false,
            message: null
        }
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
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
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        if (values['password'].match(PASSWORD_REGEX)) {
            this.setState({userData:event, err: false,message:''});
        
            this.props.registerUser(values.fullname, values.email, values.password, values.companyname);
        } else {
            this.setState({
                err: true,
                message: "Password required with Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }
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

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to={ {pathname:'/account/confirm',data:this.state}} />;
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}
                {/* {Object.keys(this.props.user || {}).length > 0 && this.renderRedirectToConfirm()} */}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages mt-5 mb-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={10}>
                                <Card className="">
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col md={6} className="p-5 position-relative">
                                                { /* preloader */}
                                                {this.props.loading && <Loader />}

                                                <div className="mx-auto mb-5">
                                                    <a href="/">
                                                        <img src={CompanyLogo} alt="Not Available" height="27" />
                                                        {/* <h3 className="d-inline align-middle ml-1 text-logo">Shreyu</h3> */}
                                                    </a>
                                                </div>

                                                <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                                                <p className="text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</p>

                                                {this.state.err && this.state.message ? (
                                                    <Alert color="danger">{this.state.message}.</Alert>
                                                ) : this.state.message ? (
                                                    <Alert color="success">{this.state.message}.</Alert>
                                                ) : null}
                                                {Object.keys(this.props.user || {}).length > 0 ? 
                                                        <Alert color="success">Verification link is sent to your email. Please check your email..</Alert>
                                                    : null
                                                }
                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <AvGroup className="">
                                                        <Label for="fullname">Full Name</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <User className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="fullname" id="fullname" placeholder="xyz" required />
                                                        </InputGroup>

                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>
                                                    <AvGroup className="">
                                                        <Label for="email">Email</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="email" name="email" id="email" placeholder="abc@companyname.com" required />
                                                        </InputGroup>

                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>
                                                    <AvGroup className="">
                                                        <Label for="fullname">Company Name</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Codesandbox className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="companyname" id="companyname" placeholder="xyz solutions" required />
                                                        </InputGroup>

                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>


                                                    <AvGroup className="mb-3">
                                                        <Label for="password">Password</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="password" name="password" id="password" placeholder="Enter your password" required />
                                                        </InputGroup>
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>



                                                    <AvGroup check className="mb-4">
                                                        <CustomInput type="checkbox" id="terms" defaultChecked="true" className="pl-1"  >I accept<Link to={"/account/terms-conditions"}> Terms and Conditions</Link></CustomInput>
                                                    </AvGroup>

                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">Sign Up</Button>
                                                    </FormGroup>
                                                </AvForm>
                                            </Col>

                                            <Col md={6} style={{  
                                                    backgroundImage: `url(${MemberLogo})`,
                                                     backgroundPosition: 'center',
                                                     backgroundSize: 'contain',
                                                     backgroundRepeat: 'no-repeat',
                                                     backgroundOrigin:'content-box',
                                                     paddingRight:"50px"
                                                    }} className="d-none d-md-inline-block">                                              
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-1">
                            <Col className="col-12 text-center">
                                <p className="text-muted">Already have an account? <Link to="/account/login" className="text-primary font-weight-bold ml-1">Sign In</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { registerUser })(Register);