import React, { useRef } from 'react';
import * as FeatherIcon from 'react-feather';
import { HelpCircle, Lock, LogOut, Menu, Search, Settings, User, X } from 'react-feather';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import profilePic from '../assets/images/users/avatar-7.jpg';
import CompanyLogo from '../assets/images/users/worqplace-logo.png';
import { getLoggedInUser } from '../helpers/authUtils';
import { showRightSidebar, changeSelectedTeamName } from '../redux/actions';
import LanguageDropdown from './LanguageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Notifications = [
    {
        id: 1,
        text: 'New user registered',
        subText: '1 min ago',
        icon: 'uil uil-user-plus',
        bgColor: 'primary',
    },
    {
        id: 2,
        text: 'Karen Robinson',
        subText: 'Wow ! this admin looks good and awesome design',
        icon: 'uil uil-comment-message',
        bgColor: 'success',
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'uil uil-comment-message',
        bgColor: 'danger',
    },
    {
        id: 4,
        text: 'New user registered',
        subText: '1 day ago',
        icon: 'uil uil-user-plus',
        bgColor: 'info',
    },
];

const ProfileMenus = [
    {
        label: 'My Account',
        icon: User,
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: Settings,
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: HelpCircle,
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: Lock,
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: LogOut,
        redirectTo: '/account/logout',
        hasDivider: true,
    },
];

const UserProfile = (props) => {
    return (
        <React.Fragment>
            <div className="media user-profile mt-2 mb-2">
                <img src={profilePic} className="avatar-sm rounded-circle mr-2" alt="Shreyu" />
                {/* <img src={profilePic} className="avatar-xs rounded-circle mr-2" alt="Shreyu" /> */}

                <div className="media-body mr-4" style={{ marginTop: '0.5rem' }}>
                    <h6 className="pro-user-name mt-0 mb-0">{props.userName}</h6>
                    {/* <span className="pro-user-desc">Administrator</span> */}
                </div>

                <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="button"
                        className="btn btn-link p-0 dropdown-toggle mr-0">
                        <FeatherIcon.ChevronDown />
                    </DropdownToggle>
                    <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                        <Link to="/" className="dropdown-item notify-item">
                            <FeatherIcon.Settings className="icon-dual icon-xs mr-2" />
                            <span>My Account</span>
                        </Link>
                        <Link to="/members" className="dropdown-item notify-item">
                            <FeatherIcon.User className="icon-dual icon-xs mr-2" />
                            <span>Members</span>
                        </Link>
                        {/* <Link to="/" className="dropdown-item notify-item">
            <FeatherIcon.HelpCircle className="icon-dual icon-xs mr-2" />
            <span>Support</span>
          </Link>
          <Link to="/" className="dropdown-item notify-item">
            <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
            <span>Lock Screen</span>
          </Link> */}
                        <DropdownItem divider />
                        <Link to="/account/logout" className="dropdown-item notify-item">
                            <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
                            <span>Logout</span>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </React.Fragment>
    );
};

const Topbar = (props) => {
    const topBarRef = useRef();

    const [state, setState] = React.useState({
        user: {
            fullName: 'NO USER',
            email: 'NO EMAIL',
        },
        teamName: null,
    });

    const teams = useSelector((state) => state.Teams);

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        //showRightSidebar();
    };

    React.useEffect(() => {
        let userInfo = getLoggedInUser();
        setState({ user: userInfo });
    }, []);

    console.log(
        'topbar height----------------------------------------------------------------------------------------->',
        topBarRef.current?.offsetHeight
    );
    return (
        <React.Fragment>
            <div className="navbar navbar-expand flex-column flex-md-row navbar-custom" ref={topBarRef}>
                <Container fluid>
                    {/* logo */}
                    <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
                        <span className="logo-lg">
                            <img src={CompanyLogo} alt="" height="23" />
                            {/* <span className="d-inline h5 ml-2 text-logo">Shreyu</span> */}
                        </span>
                        {/* <span className="logo-sm">
                <img src={logo} alt="" height="24" />
              </span> */}
                    </Link>

                    {/* menu*/}
                    <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                        <li className="">
                            <button
                                className="button-menu-mobile open-left disable-btn"
                                onClick={props.openLeftMenuCallBack}>
                                <Menu className="menu-icon" />
                                <X className="close-icon" />
                            </button>
                        </li>
                    </ul>

                    <div className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu mb-0">
                        <h3>{teams.selectedTeam}</h3>
                    </div>

                    <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                        {/* <li className="d-none d-sm-block">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search..." />
                      <Search />
                    </div>
                  </form>
                </div>
              </li> */}

                        {/* <LanguageDropdown tag="li" />
              <NotificationDropdown notifications={Notifications} /> */}

                        {/* <li className="notification-list">
                <button className="btn btn-link nav-link right-bar-toggle" onClick={this.handleRightSideBar}>
                  <Settings />
                </button>
              </li> */}
                        <li>
                            <UserProfile userName={state.user.fullName} />
                        </li>

                        <ProfileDropdown
                            profilePic={profilePic}
                            menuItems={ProfileMenus}
                            username={state.user?.fullName}
                            description="Administrator"
                        />
                    </ul>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
