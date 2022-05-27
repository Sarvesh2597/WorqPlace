import React, { Component } from 'react';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
// Themes
// default
import './assets/scss/theme.scss';
import Routes from './routes/Routes';

import './App.css';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';

// configure fake backend
// configureFakeBackend();

/**
 * Main app component
 */
class App extends Component {
    render() {
        return <Routes></Routes>;
    }
}

export default App;
