import React from 'react';
import ReactDOM from 'react-dom';
const { octokit, owner } = require('../assets/js/octokit-rest-service');
import C from '../assets/js/constants';
const { store } = require('../assets/js/redux-store');

export default class IssueForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          issueTitle: '',
          repository:'' ,
          issueComment:'',
          repositories: [],
          requested: false,
          responseMessage: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value, requested: false});
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

    handleSubmit(event) {
      event.preventDefault();
      const obj = {
        owner: owner,
        repo:  this.state.repository,
        title: this.state.issueTitle,
        body:  this.state.issueComment
    };
    octokit.issues.create(obj).then(result => {
             console.log(result);
            if (result.status == 201) {
                //redux dispatch
                store.dispatch({
                    type: C.ADD_ISSUE,
                    payload: obj.title
                });
                this.props.onBotChange();
                this.setState({
                issueTitle: '',
                repository:'' ,
                issueComment:'',
                requested: true,
                responseMessage: "Issue created successfully!"
            });
            }
        })
        .catch(error => {
            $("#alert-div").html("Error");
            $("#alert-div").show();
        });
    }
  
    render() {
      const requested = this.state.requested;
      return (
        <div id="gitform" className="jumbotron justify-content-center">
        { requested &&  
            <div id="alert-div" role="alert" className="alert alert-success">
             {this.state.responseMessage}
             </div>
        }
        <form id="create-issue" onSubmit={this.handleSubmit} >
        <h2>New issue</h2>
        <p>Create new issue</p>
        <hr/><br/>
        <div className="form-group">
        <label htmlFor="issuetitle">Title: </label>
        <input type="text" value = {this.state.issueTitle} onChange={this.handleChange} name="issueTitle" id="issuetitle" placeholder="Enter Title" className="form-control" />    
        </div><br/>
        <div className="form-group">
        <label htmlFor="repository-list">Select Repository : </label>
        <select name="repository" value = {this.state.repository} onChange={this.handleChange} id="repository-list" className="form-control form-control-sm">
        <option value= "">Select repository</option>
        {this.state.repositories.map((item) => {
        return <option key={item.id} value={item.name}>{item.name}</option>;
        })}
        </select>
        </div>
        <div className="form-group">
        <label htmlFor="comment">Comment : </label>
        <textarea name="issueComment" value = {this.state.issueComment} onChange={this.handleChange} id="comment" rows="3" className="form-control">
        </textarea>
        </div><br/>
        <input type="submit" className="btn btn-primary" value="Create Issue" />    
        </form>
        </div>
      );
    }
  }