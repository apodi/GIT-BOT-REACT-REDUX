import React from 'react';
import ReactDOM from 'react-dom';
const lodash  = require('lodash/array');
const { octokit, owner } = require('../assets/js/octokit-rest-service');


export default class RepositoryList extends React.Component {
    constructor(props) {
      super(props);
    }

    // async componentDidMount() {
    //   console.log(loadFromLocalStorage());
    //   try {
    //       const repos = await octokit.repos.listForUser({
    //         username: owner,sort: 'created',
    //       });
    //       const repositories = repos.data.map(item => {
    //         return {name : item.name, id: item.id};
    //       })
    //       this.setState({allRepositories: repositories});
    //        console.log(repositories);
    //   }
    //   catch(e) {
    //       console.log(e);
    //   }
    // }
  
    componentDidUpdate(prevProps) {
     console.log('list updated');
    }
    render() {
      return ( 
          <div className="col-sm-4">
          <div className="card" style= {{ width: "18rem" }}>
            <div className="card-header">
              Latest Repositories
            </div>
          <ul className="list-group list-group-flush">
              {lodash.takeRight(this.props.repositories, 5).reverse().map((item, i) => <li key={i} className="list-group-item">{item}</li>)}
          </ul>
        </div>
        </div>
      );
    }
  }