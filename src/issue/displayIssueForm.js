import React from 'react';
import ReactDOM from 'react-dom';
const { octokit, owner } = require('../assets/js/octokit-rest-service');
import C from '../assets/js/constants';
const { store } = require('../assets/js/redux-store');

export default class DisplayIssueForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          repository:'' ,
          repositories: [],
          repoIssues: [],
          requested: false,
          responseMessage: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
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
          return {name : item.title, id: item.id, body: item.body};
        })
        this.props.onBotChange();
        console.log(repoIssues);
        this.setState({repoIssues: repoIssues, requested: false});
    }
    catch(e) {
       this.setState({[event.target.name]: event.target.value,repoIssues: [], requested: false});
        console.log(e);
    }
    }

     async componentDidMount() {
      try {
          const repos = await octokit.repos.listForUser({
            username: owner,sort: 'created',
          });
          const repositories = repos.data.map(item => {
            return {name : item.name, id: item.id};
          })
          this.setState({repositories: repositories});
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
      return (
      <div id="gitform" className="jumbotron justify-content-center">
         { requested &&  
            <div id="alert-div" role="alert" className="alert alert-success">
             {this.state.responseMessage}
            </div>
         }
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
           <div id="accordion">
               { this.state.repoIssues.map((item) => {
                 return <div key = {item.id} className="card">
                 <div className="card-header" id= {"heading_" + item.id} data-toggle="collapse" data-target={"#collapse_" + item.id}>
                    <h5 className="mb-0"><button className="btn btn-link">{item.name}</button></h5>
                 </div>
                 <div className="collapse" data-parent="#accordion" id={"collapse_"+ item.id}>
                    <div className="card-body"  dangerouslySetInnerHTML={{
                     __html: item.body
                     }}>
                     </div>
                 </div>
                </div>
                 })
                }
            
           </div>
        </div>
        }
      </div>
      );
    }
  }