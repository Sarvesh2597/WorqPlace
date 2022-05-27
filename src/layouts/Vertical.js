// @flow
import React, { Suspense, useRef } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeSidebarTheme, changeSidebarType } from '../redux/actions';
import * as layoutConstants from '../constants/layout';

import ThemeCustomizer from '../components/ThemeCustomizer';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const LeftSidebar = React.lazy(() => import('../components/LeftSidebar'));
const Topbar = React.lazy(() => import('../components/Topbar'));
const Footer = React.lazy(() => import('../components/Footer'));
const RightSidebar = React.lazy(() => import('../components/RightSidebar'));

// loading
const emptyLoading = () => <div></div>;
const loading = () => <div className="text-center"></div>;

const VerticalLayout = (props) => {
    /**
     * Opens the left menu - mobile
     */
    const openLeftMenu = () => {
        if (document.body) {
            if (document.body.classList.contains('sidebar-enable')) {
                document.body.classList.remove('sidebar-enable');
                props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
            } else {
                if (document.body.classList.contains('left-side-menu-condensed'))
                    document.body.classList.remove('left-side-menu-condensed');
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    React.useEffect(() => {
        if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
            props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
        }
    }, []);

    // get the child view which we would like to render
    const children = props.children || null;

    const isCondensed = props.layout.leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
    const isLight = props.layout.leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT;

    return (
        <div className="app">
            <div id="wrapper">
                <Suspense fallback={emptyLoading()}>
                    <Topbar openLeftMenuCallBack={openLeftMenu} {...props} />
                </Suspense>
                {props.location.pathname !== '/home' && (
                    <Suspense fallback={emptyLoading()}>
                        <LeftSidebar isCondensed={isCondensed} isLight={isLight} {...props} />
                    </Suspense>
                )}

                <div
                    className={`content-page ${props.location.pathname !== '/home' ? '' : 'ml-0'}`}
                    style={{ height: 'calc(100vh - 72px)', overflowY: 'auto' }}>
                    <div className="content">
                        <Container fluid>
                            <Suspense fallback={loading()}>{children}</Suspense>
                        </Container>
                    </div>

                    {/* <Suspense fallback={emptyLoading()}>
                            <Footer {...props} />
                        </Suspense> */}
                </div>
            </div>

            <Suspense fallback={emptyLoading()}>
                <RightSidebar title="Customize" {...props}>
                    <ThemeCustomizer />
                </RightSidebar>
            </Suspense>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        layout: state.Layout,
    };
};
export default withRouter(connect(mapStateToProps, { changeSidebarTheme, changeSidebarType })(VerticalLayout));
