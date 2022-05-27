import React, { Component } from 'react';
import { Card, Col, Media, Row } from 'reactstrap';
import avatarImg from '../../../assets/images/users/avatar-2.jpg';
import PageTitle from '../../../components/PageTitle';
import { emails } from './Data';
import LeftSide from './LeftSide';





// EmailDetail
class EmailDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			totalUnreadEmails: emails.filter(e => e.is_read === false).length,
			email: {
				avatar: avatarImg,
				subject: 'Your elite author Graphic Optimization reward is ready!',
				from_name: 'Steven Smith',
				from_email: 'jonathan@domain.com',
				recieved_on: 'Jul 24, 2019, 5:17 AM',
				attachments: [
					{ id: 1, name: 'Hyper-admin-design.zip', size: '2.3MB', ext: '.zip' },
					{ id: 2, name: 'Dashboard-design.jpg', size: '0.3MB', ext: '.jpg' },
					{ id: 3, name: 'Admin-bug-report.mp4', size: '4.1MB', ext: '.mp4' },
				],
			},
			newReplyContent: null
		};
		this.onEditorContentChange = this.onEditorContentChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

    /**
     * On onEditorContentChange
     */
	onEditorContentChange = editorContent => {
		this.setState({ newReplyContent: editorContent });
	}

    /**
     * Handles the save
     * @param {*} event 
     * @param {*} values 
     */
	handleSave(event, values) {
		console.log(values, this.state.newReplyContent);
	}

	render() {

		return (
			<React.Fragment>
				<Row className="page-title">
					<Col md={12}>
						<PageTitle
							title={'Attachments'}
						/>
					</Col>
				</Row>

				<Row>
					<Col className="col-12">
						<div className="email-container">
							<Card className="inbox-leftbar">
								<LeftSide totalUnreadEmails={this.state.totalUnreadEmails} />
							</Card>
							<div className="inbox-rightbar p-4">
								<Row>
									<Col sm={3}>
										<h5><i className='uil uil-paperclip mb-2'></i> Sent <span>(3)</span></h5>
									</Col>
									<Col sm={9}>
										<div className="float-sm-right mt-3 mt-sm-0">
											<div className="task-search d-inline-block mb-3 mb-sm-0 mr-sm-3">
												<form>
													<div className="input-group">
														<input
															type="text"
															className="form-control search-input"
															placeholder="Search..."
														/>
														<span className="uil uil-search icon-search"></span>
														<div className="input-group-append">
															<button
																className="btn btn-soft-primary"
																type="button">
																<i className="uil uil-file-search-alt"></i>
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</Col>
								</Row>




								<Row className="mt-4">
									{this.state.email.attachments.map((f, idx) => {
										return (
											<Col xl={4} md={6} key={idx}>
												<Card className="p-2 border rounded mb-2">
													<Media>
														<div className="avatar-sm font-weight-bold mr-3">
															<span className="avatar-title rounded bg-soft-primary text-primary">
																<i className="uil-file-plus-alt font-size-18"></i>
															</span>
														</div>
														<Media body>
															<a href="/" className="d-inline-block mt-2 text-muted font-weight-bold">{f.name}</a>
														</Media>
														<div className="float-right mt-1">
															<a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
														</div>
													</Media>
												</Card>
											</Col>
										)
									})}
								</Row>
							</div>

							<div className="inbox-rightbar mt-5 p-4">
								<Row>
									<Col sm={3}>
										<h5><i className='uil uil-paperclip mb-2'></i> Recieved <span>(3)</span></h5>
									</Col>
									<Col sm={9}>
										<div className="float-sm-right mt-3 mt-sm-0">
											<div className="task-search d-inline-block mb-3 mb-sm-0 mr-sm-3">
												<form>
													<div className="input-group">
														<input
															type="text"
															className="form-control search-input"
															placeholder="Search..."
														/>
														<span className="uil uil-search icon-search"></span>
														<div className="input-group-append">
															<button
																className="btn btn-soft-primary"
																type="button">
																<i className="uil uil-file-search-alt"></i>
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</Col>
								</Row>


								<Row className="mt-4">
									{this.state.email.attachments.map((f, idx) => {
										return (
											<Col xl={4} md={6} key={idx}>
												<Card className="p-2 border rounded mb-2">
													<Media>
														<div className="avatar-sm font-weight-bold mr-3">
															<span className="avatar-title rounded bg-soft-primary text-primary">
																<i className="uil-file-plus-alt font-size-18"></i>
															</span>
														</div>
														<Media body>
															<a href="/" className="d-inline-block mt-2 text-muted font-weight-bold">{f.name}</a>
														</Media>
														<div className="float-right mt-1">
															<a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
														</div>
													</Media>
												</Card>
											</Col>

										)
									})}
								</Row>
							</div>


						</div>
					</Col>
				</Row>

			</React.Fragment >
		);
	}
}

export default EmailDetail;
