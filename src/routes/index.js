import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const UpdatePassword = React.lazy(() => import('../pages/auth/UpdatePassword'));
const VerifyInvitedUser = React.lazy(() => import('../pages/auth/verifyInvitedUser'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const TermsConditions = React.lazy(() => import('../pages/auth/TermsConditions'));

// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
//const CreateTasks = React.lazy(() => import('../pages/CreateTask'));
const ChatLists = React.lazy(() => import('../pages/chat-lists'));
const Docs = React.lazy(() => import('../pages/docs/Docs'));
const CreateDoc = React.lazy(() => import('../pages/docs/CreateDoc'));
//const DocsEditor = React.lazy(() => import('../pages/forms/DocsEditor'));
// apps
// const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailAttachments = React.lazy(() => import('../pages/apps/Email/Attachments'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const EmailDrafts = React.lazy(() => import('../pages/apps/Email/Drafts'));
const EmailSent = React.lazy(() => import('../pages/apps/Email/Sent'));
const EmailTrash = React.lazy(() => import('../pages/apps/Email/Trash'));
const Config = React.lazy(() => import('../pages/apps/Email/Config'));
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// pages
const Starter = React.lazy(() => import('../pages/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
// const Invoice = React.lazy(() => import('../pages/other/Invoice'));
// const Pricing = React.lazy(() => import('../pages/other/Pricing'));
// const Error404 = React.lazy(() => import('../pages/other/Error404'));
// const Error500 = React.lazy(() => import('../pages/other/Error500'));

// // ui
// const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
// const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
// const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
// const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// // charts
// const Charts = React.lazy(() => import('../pages/charts/'));

// // forms
// const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
// const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
// const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
// const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
// const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
// const Editor = React.lazy(() => import('../pages/forms/Editor'));

// // tables
// const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
// const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// boards
const Boards = React.lazy(() => import('../pages/boards/Boards'));
// const BoardDetails = React.lazy(() => import('../pages/boards/BoardDetails'));
const BoardDetails = React.lazy(() => import('../pages/boards/boardDetails/BoardDetails'));

const OrgMembers = React.lazy(() => import('../pages/OrgMembers'));

const userOnboardingform = React.lazy(() => import('../pages/userOnboardingForm'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.group) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    header: 'Navigation',
    component: Dashboard,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

const userOnBoardingRoutes = {
    path: '/user-onboarding',
    name: 'User Onboarding',
    component: userOnboardingform,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

const homeRoutes = {
    path: '/home',
    name: 'Starter',
    component: Starter,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

const OrgMembersRoutes = {
    path: '/members',
    name: 'Members',
    component: OrgMembers,
    icon: FeatherIcon.Clipboard,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

// boards route

const BoardsRoutes = {
    path: '/boards',
    name: 'Boards',
    icon: FeatherIcon.Clipboard,
    header: 'Boards',
    component: Boards,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

const BoardDetailsRoute = {
    path: '/boards/board-details/:id',
    name: 'Board Details',
    component: BoardDetails,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};

const CreateDocRoute = {
    path: '/CreateDocs',
    name: 'Create Docs',
    component: CreateDoc,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};

const GroupChatRoutes = {
    path: '/chats',
    name: 'Chats',
    icon: FeatherIcon.Send,
    header: 'Navigation',

    component: ChatLists,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

const DocsRoutes = {
    path: '/docs',
    name: 'Docs',
    icon: FeatherIcon.BookOpen,
    header: 'Navigation',

    component: Docs,
    roles: ['Admin', 'User'],
    route: PrivateRoute,
};

// apps

// const calendarAppRoutes = {
//     path: '/apps/calendar',
//     name: 'Calendar',
//     header: 'Apps',
//     icon: FeatherIcon.Calendar,
//     component: CalendarApp,
//     route: PrivateRoute,
//     roles: ['Admin', 'User'],
// };

const emailAppRoutes = {
    path: '/apps/email/inbox',
    name: 'Email',
    icon: FeatherIcon.Inbox,
    component: EmailInbox,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
    children: [
        {
            path: '/apps/email/Config',
            name: 'Email Config',
            component: Config,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
        {
            path: '/apps/email/Inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
    ],
};

const EmailDetailRoutes = {
    path: '/apps/email/details',
    name: 'Details',
    component: EmailDetail,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};
const EmailComposeRoutes = {
    path: '/apps/email/compose',
    name: 'Compose',
    component: EmailCompose,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};
const EmailDraftsRoutes = {
    path: '/apps/email/drafts',
    name: 'drafts',
    component: EmailDrafts,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};
const EmailSentRoutes = {
    path: '/apps/email/sent',
    name: 'sent',
    component: EmailSent,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};

const EmailAttachmentsRoutes = {
    path: '/apps/email/Attachments',
    name: 'Attachments',
    component: EmailAttachments,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};

const EmailTrashRoutes = {
    path: '/apps/email/Trash',
    name: 'Trash',
    component: EmailTrash,
    route: PrivateRoute,
    roles: ['Admin', 'User'],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: ProjectList,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
        {
            path: '/apps/projects/detail',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
    ],
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    icon: FeatherIcon.Bookmark,
    children: [
        {
            path: '/apps/tasks/list',
            name: 'List',
            component: TaskList,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
        {
            path: '/apps/tasks/board',
            name: 'Board',
            component: TaskBoard,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
    ],
};

const appRoutes = [emailAppRoutes, projectAppRoutes, taskAppRoutes];

// pages
const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    children: [
        // {
        //     path: '/pages/starter',
        //     name: 'Starter',
        //     component: Starter,
        //     route: PrivateRoute,
        //     roles: ['Admin', 'User'],
        // },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['Admin', 'User'],
        },
        // {
        //     path: '/pages/invoice',
        //     name: 'Invoice',
        //     component: Invoice,
        //     route: PrivateRoute,
        //     roles: ['Admin', 'User'],
        // },
        // {
        //     path: '/pages/pricing',
        //     name: 'Pricing',
        //     component: Pricing,
        //     route: PrivateRoute,
        //     roles: ['Admin', 'User'],
        // },
        // {
        //     path: '/pages/error-404',
        //     name: 'Error 404',
        //     component: Error404,
        //     route: Route,
        // },
        // {
        //     path: '/pages/error-500',
        //     name: 'Error 500',
        //     component: Error500,
        //     route: Route,
        // },
    ],
};

// components
// const componentsRoutes = {
//     path: '/ui',
//     name: 'UI Elements',
//     header: 'Components',
//     icon: FeatherIcon.Package,
//     children: [
//         {
//             path: '/ui/bscomponents',
//             name: 'Bootstrap UI',
//             component: BSComponents,
//             route: PrivateRoute,
//             roles: ['Admin', 'User'],
//         },
//         {
//             path: '/ui/icons',
//             name: 'Icons',
//             children: [
//                 {
//                     path: '/ui/icons/feather',
//                     name: 'Feather Icons',
//                     component: FeatherIcons,
//                     route: PrivateRoute,
//                     roles: ['Admin', 'User'],
//                 },
//                 {
//                     path: '/ui/icons/unicons',
//                     name: 'Unicons Icons',
//                     component: UniconsIcons,
//                     route: PrivateRoute,
//                     roles: ['Admin', 'User'],
//                 },
//             ],
//         },
//         {
//             path: '/ui/widgets',
//             name: 'Widgets',
//             component: Widgets,
//             route: PrivateRoute,
//             roles: ['Admin', 'User'],
//         },
//     ],
// };

// charts
// const chartRoutes = {
//     path: '/charts',
//     name: 'Charts',
//     component: Charts,
//     icon: FeatherIcon.PieChart,
//     roles: ['Admin', 'User'],
//     route: PrivateRoute,
// };

// forms
// const formsRoutes = {
//     path: '/forms',
//     name: 'Forms',
//     icon: FeatherIcon.FileText,
//     children: [
//         {
//             path: '/forms/basic',
//             name: 'Basic Elements',
//             component: BasicForms,
//             route: PrivateRoute,
//         },
//         {
//             path: '/forms/advanced',
//             name: 'Advanced',
//             component: FormAdvanced,
//             route: PrivateRoute,
//         },
//         {
//             path: '/forms/validation',
//             name: 'Validation',
//             component: FormValidation,
//             route: PrivateRoute,
//         },
//         {
//             path: '/forms/wizard',
//             name: 'Wizard',
//             component: FormWizard,
//             route: PrivateRoute,
//         },
//         {
//             path: '/forms/editor',
//             name: 'Editor',
//             component: Editor,
//             route: PrivateRoute,
//         },
//         {
//             path: '/forms/upload',
//             name: 'File Upload',
//             component: FileUpload,
//             route: PrivateRoute,
//         },
//     ],
// };

// const tableRoutes = {
//     path: '/tables',
//     name: 'Tables',
//     icon: FeatherIcon.Grid,
//     children: [
//         {
//             path: '/tables/basic',
//             name: 'Basic',
//             component: BasicTables,
//             route: PrivateRoute,
//         },
//         {
//             path: '/tables/advanced',
//             name: 'Advanced',
//             component: AdvancedTables,
//             route: PrivateRoute,
//         },
//     ],
// };

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
        {
            path: '/account/update-password',
            name: 'Update Password',
            component: UpdatePassword,
            route: Route,
        },
        {
            path: '/account/add-user',
            name: 'Invite user verify',
            component: VerifyInvitedUser,
            route: Route,
        },
        {
            path: '/account/terms-conditions',
            name: 'Terms and Conditions',
            component: TermsConditions,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);
        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    homeRoutes,
    ...appRoutes,
    // emailAppRoutes,
    // EmailComposeRoutes,
    // EmailAttachmentsRoutes,
    // EmailTrashRoutes,
    // EmailSentRoutes,
    // EmailDraftsRoutes,
    // EmailDetailRoutes,
    BoardDetailsRoute,
    pagesRoutes,
    // componentsRoutes,
    CreateDocRoute,
    // chartRoutes,
    // formsRoutes,
    // tableRoutes,
    GroupChatRoutes,
    DocsRoutes,
    authRoutes,
    OrgMembersRoutes,
    userOnBoardingRoutes,
    BoardsRoutes,
];

const authProtectedRoutes = [
    dashboardRoutes,
    // homeRoutes,
    // GroupChatRoutes,
    ...appRoutes,
    pagesRoutes,
    BoardsRoutes,
    DocsRoutes,
    GroupChatRoutes,
    
    OrgMembersRoutes,
    userOnBoardingRoutes,
    // componentsRoutes,
    // chartRoutes,
    // formsRoutes,
    // tableRoutes,
];

//
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
