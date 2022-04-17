import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from './footer'
import { Header } from './header'
import RepositoryList from './repository/repository'
import IssuesList from './issue/issue'
import RepositoryForm from './repository/repositoryForm';
import IssueForm from './issue/issueForm';
import DisplayIssueForm from './issue/displayIssueForm';
import CloseIssueForm from './issue/closeIssueForm';
const lodash  = require('lodash/array');
const { loadFromLocalStorage } = require('./assets/js/redux-store');

export default class GitBot extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        command: '',
        bot: loadFromLocalStorage(), 
        found: true
      };
      this.handleCommandChange = this.handleCommandChange.bind(this);
      this.handleBotChange = this.handleBotChange.bind(this);
    }

    handleBotChange(){
        this.setState({bot: loadFromLocalStorage()});
    }
    
    handleCommandChange(com, found){
        this.setState({command: com, found : found});
    }

    render() {
      const command = this.state.command;
      const isCommandFound = this.state.found;
      return (
        <>
        <Header onCommandChange = {this.handleCommandChange} />
       
        <div className="container" id="container" style= {{ marginTop: "90px", minHeight: "71.5vh" }}>
        { !isCommandFound &&  
            <div id="alert-div" role="alert" className="alert alert-success">
            You Entered a wrong Command
             </div>
        }
        { (this.state.command === "git-repository") &&
        <RepositoryForm onBotChange = {this.handleBotChange} /> }

        { (this.state.command === "create-issue") &&
        <IssueForm onBotChange = {this.handleBotChange} /> }

        { (this.state.command === "display-issue") &&
        <DisplayIssueForm onBotChange = {this.handleBotChange} /> }

        { (this.state.command === "close-issue") &&
        <CloseIssueForm requested = {this.state.requested} formOpen = {this.state.formOpen} onBotChange = {this.handleBotChange} /> }

        <div className="row" id="history">
        <RepositoryList repositories = {this.state.bot.allRepositories} />
        <IssuesList issues=  {this.state.bot.allIssues} />
        <div className="col-sm-4"><div className="card" style= {{ width: "18rem" }}>
        <div className="card-header">
         Latest Actions
         </div>
        <ul className="list-group list-group-flush">
        { lodash.takeRight(this.state.bot.allCommands,5).reverse().map((item,i) => <li key={i} className="list-group-item">{item}</li>)}
        </ul>
        </div></div>
        </div>
        </div>
        <Footer/>
        </>
      );
    }
  }