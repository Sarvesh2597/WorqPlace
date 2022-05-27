import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { BASE_URL } from '../../constants/endpoint';
import { fetchJSON } from '../../helpers/api';
import { isUserAuthenticated } from '../../helpers/authUtils';


class Confirm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            otp:'',
            userData:this.props.location.state,
            verificationSuccess:false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
        const options = {
            body: JSON.stringify({ token: decodeURI(this.props.location.search).split('=')[1]}),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = fetchJSON(`${BASE_URL}/users/verifyotp`,options);
        if(response){
            console.log('success');
            this.setState({verificationSuccess:true});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        // const isAuthTokenValid = isUserAuthenticated();
        if (this.state.verificationSuccess) {
            return <Redirect to='/' />
        }
    }

    verifyOtp = (e) =>{
        this.props.OTPVerification(this.state.userData.email,this.state.otp);
    }

    getOtp = (e) =>{
        if(e){
            this.setState({otp:e.target.value});
            console.log(this.state);
            
        }
    }


    render() {
        const isAuthTokenValid = isUserAuthenticated();
        console.log(this.props.user);
        
        return (
            <React.Fragment>

                {/* {this.state.verificationSuccess && this.renderRedirectToRoot()} */}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="text-center">
                                    <CardBody className="p-4">
                                        <div className="mx-auto mb-5">
                                            <a href="/">                                              
                                                <h3 className="d-inline align-middle ml-1 text-logo">WORQPLACE</h3>
                                            </a>
                                        </div>

                                        <h6 className="h5 mb-0 mt-4">Your email has been verified successfully.</h6>
                                        <Link to="/account/login">
                                        <Button  color="primary" className="mt-5" id="btn-new-event">
                                            Login
                                        </Button> 
                                        </Link> 

                                    
                                        {/* <p className="text-muted mt-3 mb-3">Your account has been successfully registered. To
                                            complete the verification process, please check your email for a validation request and enter the OTP sent in your mail.</p> */}


                                        {/* <AvGroup className="">
                                            <Label for="fullname">Full Name</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <span className="input-group-text">
                                                        <User className="icon-dual" />
                                                    </span>
                                                </InputGroupAddon>
                                                <AvInput type="text" name="fullname" id="fullname" placeholder="Shreyu N" required />
                                            </InputGroup>

                                            <AvFeedback>This field is invalid</AvFeedback>
                                        </AvGroup> */}
                                        {/* <FormGroup className="text-left">
                                            <Input type="text" name="otp" id="otp" placeholder="Enter the OTP" onChange={e=>this.getOtp(e)} />
                                        </FormGroup>
                                        <Button color="primary" id="btn-new-event" onClick={e=>this.verifyOtp(e)}>Submit</Button> */}

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                        {/* <Row className="mt-3">
                            <Col className="text-center">
                                <p className="text-muted">Return to <Link to="/account/login" className="text-primary font-weight-bold ml-1">Login</Link></p>
                            </Col>
                        </Row> */}
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user:state.Auth.user
    }  
};
export default connect(mapStateToProps)(Confirm);