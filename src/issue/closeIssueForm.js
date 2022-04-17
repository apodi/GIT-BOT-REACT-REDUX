import React from 'react';
import ReactDOM from 'react-dom';
const { octokit, owner } = require('../assets/js/octokit-rest-service');
import C from '../assets/js/constants';
const { store } = require('../assets/js/redux-store');

export default class CloseIssueForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          repository:'' ,
          issue:'',
          issuetitle: '',
          repositories: [],
          repoIssues: [],
          requested:false ,
          responseMessage: ''
      };
      this.handleIssueChange = this.handleIssueChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleIssueChange(event){
        this.setState({[event.target.name]: event.target.value,  issueTitle: event.target.options[event.target.selectedIndex].text});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const obj = {
            owner: owner,
            repo: this.state.repository,
            number: this.state.issue,
            state: 'closed'
        };
        octokit.issues.update(obj).then(result => {
            console.log(result);
            if (result.status == 200) {
                //redux dispatch
                store.dispatch({
                    type: C.REMOVE_ISSUE,
                    payload: this.state.issueTitle
                });
                this.props.onBotChange();
                this.setState({requested: true, responseMessage: 'Issue closed successfully!',formOpen: false});
        }
      }).catch(error => {
         console.log(error);
      });
      }

    async handleChange(event) {
      try {
        const obj = {
          owner: owner,
          repo: event.target.value,
          sort: 'comments'
        };
        this.setState({[event.target.name]: event.target.value});
        const issues = await octokit.issues.listForRepo(obj);
        const repoIssues = issues.data.map(item => {
          return {name : item.title, id: item.id, body: item.body, number: item.number};
        })
        console.log(repoIssues);
        this.setState({repoIssues: repoIssues});
    }
    catch(e) {
       this.setState({repoIssues: [], requested: false});
       console.log(e);
    }
    }

     async componentDidMount() {
      try {
          const repos = await octokit.repos.listForUser({
            username: owner,sort: 'created',
          });
          console.log(repos);
          const repositories = repos.data.map(item => {
            return {name : item.name, id: item.id};
          })
          this.setState({repositories: repositories, formOpen: true});
      }
      catch(e) {
          console.log(e);
      }
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.requested === nextState.requested) {
    //       return false;
    //     }
    //     return true;
    //   }

    // componentDidUpdate(prevProps) {
    //    console.log('updatettttt')
    //   }

    render() {
      const requested = this.state.requested;
      const formOpen =  this.state.formOpen;
      return (
      <div id="gitform" className="jumbotron justify-content-center">
         { requested &&  
            <div id="alert-div" role="alert" className="alert alert-success">
             {this.state.responseMessage}
            </div>
         }
        { true &&
        <form id="close-issue" onSubmit={this.handleSubmit} >
        <h2>List Issues</h2>
        <p>issues list</p>
        <hr/>
        <div className="form-group">
           <label htmlFor="repository-list-issue">Select Repository : </label>
           <select name="repository" value = {this.state.repository} onChange={this.handleChange} id="repository-list-issue" className="form-control form-control-sm">
           <option value= "">Select repository</option>
                { this.state.repositories.map((item) => {
                   return <option key={item.id} value={item.name}>{item.name}</option>;
                 })
                }
           </select>
        </div>
        { this.state.repoIssues.length > 0 && 
        <div className="form-group" id="issue-listing">
        <label htmlFor="list-issue">Select Issue : </label>
           <select name="issue" value = {this.state.issue} onChange={this.handleIssueChange} id="list-issue" className="form-control form-control-sm">
           <option value= "">Select issue</option>
                { this.state.repoIssues.map((item) => {
                   return <option key={item.id} value={item.number}>{item.name}</option>;
                 })
                }
           </select>
        </div>
        }
        <input type="submit"  className="btn btn-primary" value="close issue"></input>
      </form>
        }
      </div>
      );
    }
  }