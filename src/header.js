import React from 'react';
import ReactDOM from 'react-dom';
const helper = require('./assets/js/recast-service');
import C from './assets/js/constants';
const { store } = require('./assets/js/redux-store');
import errorPage from './assets/js/error';
const closeIssue = require('./assets/js/issue/close-issue-view');

class Header extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            commandText: '',
            gitSlug: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const obj = {
            "text": this.state.commandText,
            "language": "en"
          };
          helper.getIntent('https://api.recast.ai/v2', '/request', obj)
            .then(response => {
              let actionName;
              if (response.results.intents.length == 1 && response.results.entities.hasOwnProperty('repository')) {
                if (response.results.intents[0].slug == "git-repository") {
                  actionName = "create repository";
                  this.props.onCommandChange(response.results.intents[0].slug,true);
                   // redux dispatch
                store.dispatch({
                    type: C.ADD_COMMAND,
                    payload: actionName
                });
                }
            }
            else if (response.results.intents.length === 1 && response.results.entities.hasOwnProperty('issue')) {
              if (response.results.intents[0].slug === "create-issue") {
                this.props.onCommandChange(response.results.intents[0].slug,true);
                console.log(response.results.entities.issue[0].value);
                actionName = "create issue";
                    // redux dispatch
                    store.dispatch({
                      type: C.ADD_COMMAND,
                      payload: actionName
                  });
              }
            }
            else if (response.results.intents.length == 1) {
            if (response.results.intents[0].slug == "display-issue") {
              actionName = "display issues";
              // redux dispatch
              store.dispatch({
                type: C.ADD_COMMAND,
                payload: actionName
              });
              this.props.onCommandChange(response.results.intents[0].slug,true);
            }
            if (response.results.intents[0].slug == "close-issue") {
              actionName = "close issue";
              // redux dispatch
              store.dispatch({
                type: C.ADD_COMMAND,
                payload: actionName
              });
              this.props.onCommandChange(response.results.intents[0].slug,true);
            }
          }
            else {
                actionName = "wrong command";
                this.props.onCommandChange('',false)
              }
            }).catch(error => {
              console.log(error)
              this.props.onCommandChange('',false);
            });
        
    }
    
    handleChange(event) {
        this.setState({commandText: event.target.value});
    }

    render() {
        return (
            <header>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                 <a className="navbar-brand" href="/">
                            <img src="./assets/media/logo.png" alt="Logo" style= {{ width:"132px" }} />
                    </a>
                    <button id="navbarCollapse" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarCollapse"
                    aria-expanded="false" aria-label="Close">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                      <form id="command-form" className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input id="command-text" value={this.state.commandText} onChange={this.handleChange} className="form-control mr-sm-2" type="text" aria-label="Search" placeholder="Command" />
                        </div>    
                        <button type="submit" className="btn btn-primary">Go!</button>
                          </form>
                    </div>  
                 </nav>
                </header> 
        )
    }
    
}

export { Header };