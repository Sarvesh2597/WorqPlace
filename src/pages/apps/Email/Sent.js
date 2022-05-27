import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Media, Row, UncontrolledButtonDropdown } from 'reactstrap';
import avatarImg2 from '../../../assets/images/users/avatar-2.jpg';
import avatarImg3 from '../../../assets/images/users/avatar-3.jpg';
import avatarImg4 from '../../../assets/images/users/avatar-4.jpg';
import avatarImg5 from '../../../assets/images/users/avatar-5.jpg';
import avatarImg6 from '../../../assets/images/users/avatar-6.jpg';
import PageTitle from '../../../components/PageTitle';
import { emails } from './Data';
import LeftSide from './LeftSide';




// const ChatProfileUser = (props) => {
// 	return (
// 		<React.Fragment>
// 			<div className="">
// 				<h3 className="mb-3 font-size-16">Reply Later</h3>
// 				<Media>
// 					<div className="mr-2">
// 						<div className="avatar-sm font-weight-bold d-inline-block m-1">
// 							<span className="avatar-title rounded-circle bg-soft-primary text-primary">S</span>
// 						</div>
// 					</div>
// 					<Media body className="overflow-hidden">
// 						<h5 className="font-size-14 mt-1 mb-0">Sanket</h5>
// 						<small className="text-muted">
// 							Congrats for the launch...                       </small>
// 					</Media>
// 					<UncontrolledButtonDropdown className="float-right mt-2">
// 						<DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
// 							<i className="uil uil-ellipsis-v text-muted font-size-12"></i>
// 						</DropdownToggle>
// 						<DropdownMenu>
// 							<DropdownItem> Remove from Reply Later</DropdownItem>
// 							{/* <DropdownItem>Delete</DropdownItem> */}
// 						</DropdownMenu>
// 					</UncontrolledButtonDropdown>
// 				</Media>
// 			</div>
// 			<div className="">
// 				<Media>
// 					<div className="mr-2">
// 						<div className="avatar-sm font-weight-bold d-inline-block m-1">
// 							<span className="avatar-title rounded-circle bg-soft-primary text-primary">S</span>
// 						</div>
// 					</div>
// 					<Media body className="overflow-hidden">
// 						<h5 className="font-size-14 mt-1 mb-0">Sarvesh</h5>
// 						<small className="text-muted">
// 							Power Outage                        </small>
// 					</Media>
// 					<UncontrolledButtonDropdown className="float-right mt-2">
// 						<DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
// 							<i className="uil uil-ellipsis-v text-muted font-size-12"></i>
// 						</DropdownToggle>
// 						<DropdownMenu>
// 							<DropdownItem> Remove from Reply Later</DropdownItem>
// 							{/* <DropdownItem>Delete</DropdownItem> */}
// 						</DropdownMenu>
// 					</UncontrolledButtonDropdown>
// 				</Media>
// 			</div>

// 			<div className="">
// 				<Media>
// 					<div className="mr-2">
// 						<div className="avatar-sm font-weight-bold d-inline-block m-1">
// 							<span className="avatar-title rounded-circle bg-soft-primary text-primary">A</span>
// 						</div>
// 					</div>
// 					<Media body className="overflow-hidden">
// 						<h5 className="font-size-14 mt-1 mb-0">Abhishek</h5>
// 						<small className="text-muted">
// 							Case Manager Over Usa...                        </small>
// 					</Media>
// 					<UncontrolledButtonDropdown className="float-right mt-2">
// 						<DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
// 							<i className="uil uil-ellipsis-v text-muted font-size-12"></i>
// 						</DropdownToggle>
// 						<DropdownMenu>
// 							<DropdownItem> Remove from Reply Later</DropdownItem>
// 							{/* <DropdownItem>Delete</DropdownItem> */}
// 						</DropdownMenu>
// 					</UncontrolledButtonDropdown>
// 				</Media>
// 			</div>

// 			<div className="">
// 				<Media>
// 					<div className="mr-2">
// 						<div className="avatar-sm font-weight-bold d-inline-block m-1">
// 							<span className="avatar-title rounded-circle bg-soft-primary text-primary">P</span>
// 						</div>
// 					</div>
// 					<Media body className="overflow-hidden">
// 						<h5 className="font-size-14 mt-1 mb-0">Pranav</h5>
// 						<small className="text-muted">
// 							API Integration                         </small>
// 					</Media>
// 					<UncontrolledButtonDropdown className="float-right mt-2">
// 						<DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
// 							<i className="uil uil-ellipsis-v text-muted font-size-12"></i>
// 						</DropdownToggle>
// 						<DropdownMenu>
// 							<DropdownItem> Remove from Reply Later</DropdownItem>
// 							{/* <DropdownItem>Delete</DropdownItem> */}
// 						</DropdownMenu>
// 					</UncontrolledButtonDropdown>
// 				</Media>
// 			</div>

// 		</React.Fragment>
// 	);
// };

const ChatUser = (props) => {
	return (
		<React.Fragment>
			<Media>
				<div className="text-center mr-3">
					<img src={props.image} alt="" className="avatar-sm rounded-circle" />
				</div>
				<Media body className="overflow-hidden">
					<h5 className="font-size-15 mt-0 mb-1">{props.name}</h5>
					<p className="text-muted font-size-13 text-truncate mb-0">{props.description}</p>
				</Media>
			</Media>
		</React.Fragment>
	);
};

// const ChatUserList = (props) => {
// 	return (
// 		<React.Fragment>
// 			<ul className="list-unstyled">
// 				<li className="py-2">
// 					<ChatUser name="Johnny" description="I wisht the world become so.." image={avatarImg2} />
// 				</li>
// 				<li className="py-2">
// 					<ChatUser name="Bryan" description="For science, music, sport, etc" image={avatarImg3} />
// 				</li>
// 				<li className="py-2">
// 					<ChatUser
// 						name="Tracy"
// 						description="To an English person, it will seem like simplified"
// 						image={avatarImg4}
// 					/>
// 				</li>
// 				<li className="py-2">
// 					<ChatUser name="Thomas" description="To achieve this, it would be necessary" image={avatarImg5} />
// 				</li>
// 				<li className="py-2">
// 					<ChatUser name="David" description="If several languages coalesce" image={avatarImg6} />
// 				</li>
// 			</ul>
// 		</React.Fragment>
// 	);
// };

// emails list
const EmailsList = (props) => {
	const emails = props.emails || [];

	return (
		<React.Fragment>
			<ul className="message-list">
				{emails.map((email, idx) => {
					return (
						<li className={classNames({ unread: !email.is_read })} key={idx}>
							<div className="col-mail col-mail-1">
								<div className="checkbox-wrapper-mail">
									<input type="checkbox" className="" id={'mail' + email.id} />
									<label className="" htmlFor={'mail' + email.id}></label>
								</div>
								<span
									className={classNames('star-toggle', 'uil', 'uil-star', {
										'text-warning': email.is_important,
									})}></span>
								<Link to="/apps/email/details" className="title">
									{email.from_name}
									{email.number_of_reply > 1 && <span> ({email.number_of_reply})</span>}
								</Link>
							</div>
							<div className="col-mail col-mail-2">
								<Link to="/apps/email/details" className="subject">
									{email.subject}
								</Link>
								<div className="date">{email.time}</div>
							</div>
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

// Inbox
class Inbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emails: emails.slice(0, 20),
			totalEmails: emails.length,
			pageSize: 20,
			page: 1,
			startIndex: 1,
			endIndex: 20,
			totalPages: emails.length / 20,
			totalUnreadEmails: emails.filter((e) => e.is_read === false).length,
			unreadEmails: emails.filter((e) => e.is_read === false).slice(1, 4),
			importantEmails: emails.filter((e) => e.is_important === true).slice(1, 5),
			otherEmails: emails.filter((e) => e.is_important !== true && e.is_read === false).slice(1, 12),
		};
		this.getNextPage = this.getNextPage.bind(this);
		this.getPrevPage = this.getPrevPage.bind(this);
		this.showAllEmails = this.showAllEmails.bind(this);
		this.showStarredEmails = this.showStarredEmails.bind(this);
	}

    /**
     * Gets the next page
     */
	getNextPage = () => {
		var nextPage = this.state.page + 1;
		if (nextPage > this.state.totalEmails / this.state.pageSize) {
			nextPage = this.state.totalEmails / this.state.pageSize;
		}
		var startIdx = nextPage * this.state.pageSize - this.state.pageSize + 1;
		var endIdx = nextPage * this.state.pageSize;
		this.setState({
			page: nextPage,
			startIndex: startIdx,
			endIndex: endIdx,
			emails: emails.slice(startIdx, endIdx),
		});
	};

    /**
     * Gets the prev page
     */
	getPrevPage = () => {
		var page = this.state.page - 1;
		if (page === 0) page = 1;
		var startIdx = page * this.state.pageSize - this.state.pageSize + 1;
		var endIdx = page * this.state.pageSize;
		this.setState({ page: page, startIndex: startIdx, endIndex: endIdx, emails: emails.slice(startIdx, endIdx) });
	};

    /**
     * Shows the starred emails only
     */
	showAllEmails = () => {
		this.setState({ emails: emails.slice(0, 20) });
	};

    /**
     * Shows the starred emails only
     */
	showStarredEmails = () => {
		this.setState({ emails: emails.filter((e) => e.is_important).slice(0, 20) });
	};

	render() {
		return (
			<React.Fragment>
				<Row className="page-title">
					<Col md={12}>
						<PageTitle title={'Email Inbox'} />
					</Col>
				</Row>

				<Row>
					<Col className="col-12">
						<div className="email-container bg-transparent">
							<Card className="inbox-leftbar">
								<Card>
									<LeftSide
										totalUnreadEmails={this.state.totalUnreadEmails}
										showAllEmails={this.showAllEmails}
										showStarredEmails={this.showStarredEmails}
										toggleComposeModal={this.toggleComposeModal}
									/>
								</Card>


							</Card>
						</div>

						<div className="email-container bg-transparent">
							<div className="inbox-rightbar">
								{/* pagination */}

								{/* email list */}
								<div className="mt-0">

									<h5 className="mt-4 mb-2 font-size-16">Sent Mail</h5>
									<EmailsList emails={this.state.otherEmails} />
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

export default Inbox;
