import React from 'react';
import ReactDOM from 'react-dom';
const { octokit } = require('../assets/js/octokit-rest-service');
import C from '../assets/js/constants';
const { store } = require('../assets/js/redux-store');

export default class RepositoryForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rname: '',
          desc:'',
          requested: false,
          responseMessage: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value, requested: false});
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
        name: this.state.rname,
        description: this.state.desc
      };
      octokit.repos.createForAuthenticatedUser(obj).then(result => {
        if (result.status == 201) {
            //redux dispatch
            store.dispatch({
                type: C.ADD_REPO,
                payload: obj.name
            });
            this.props.onBotChange();
            console.log(result);
            this.setState({
                rname: '',
                desc:'' ,
                requested: true,
                responseMessage: "Repository created successfully!"
            });
        }
    }).catch(error => {
        this.setState({
            requested: true,
            responseMessage: JSON.parse(error).message
        });
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
        <form id="create-repo" onSubmit={this.handleSubmit}>
        <h2>Create a new repository</h2>
        <p>A repository contains all the files for your project, including the revision history.</p>
        <hr/><br/>
        <div className="form-group">
        <label htmlFor="reponame">Repository Name : </label>
        <input type="text" value={this.state.rname} id="reponame" name="rname" onChange={this.handleChange} placeholder="Enter Repository Name" className="form-control" />
        </div><br/>
        <div className="form-group">
        <label htmlFor="desc">Description : </label>
        <input type="text" value ={this.state.desc} id="desc" name="desc" onChange={this.handleChange} className="form-control"/>
        </div> <br/>
        <input type="submit" name="dsubmit" className="btn btn-primary" value="Create repository"/>
        </form>
        </div>
      );
    }
  }