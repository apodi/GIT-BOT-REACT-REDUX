import './assets/scss/app.scss';
import 'popper.js';
import 'bootstrap';
import './assets/media/logo.png';
import React from 'react';
import ReactDOM from 'react-dom';
import GitBot  from './gitbot'

import initialstate from './assets/js/initialState.json';

import C from './assets/js/constants';

const helper = require('./assets/js/recast-service');


const displayIssue = require('./assets/js/issue/display-issue-view');


const addCollab = require('./assets/js/collaborator/add-collaborator-view');
const closeIssue = require('./assets/js/issue/close-issue-view');

ReactDOM.render(
  <GitBot/>,
  document.getElementById('root')
);