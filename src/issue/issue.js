import React from 'react';
import ReactDOM from 'react-dom';
const lodash  = require('lodash/array');
const { octokit, owner } = require('../assets/js/octokit-rest-service');


export default class IssuesList extends React.Component {
    constructor(props) {
      super(props);
    }

    // async componentDidMount() {
    //   console.log(owner);
    //   try {
    //       const issues = await octokit.issues.list({
    //         sort: 'created',
    //         state: 'all'
    //       });
    //       const issuesDeepCopy = JSON.parse(JSON.stringify(issues));
    //       console.log(issuesDeepCopy);
    //       const allIssues = issuesDeepCopy.data.map(item => {
    //         return {name : item.title, id: item.id};
    //       })
    //       this.setState({allIssues: allIssues});
    //   }
    //   catch(e) {
    //       console.log(e);
    //   }
    // }
  
    render() {
      return ( 
          <div className="col-sm-4">
          <div className="card" style= {{ width: "18rem" }}>
            <div className="card-header">
              Latest Issues
            </div>
          <ul className="list-group list-group-flush">
              {lodash.takeRight(this.props.issues, 5).reverse().map((item,i) => <li key={i} className="list-group-item">{item}</li>)}
          </ul>
        </div>
        </div>
      );
    }
  }