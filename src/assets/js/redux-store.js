//redux state 
import appReducer from './store/reducers'
import { createStore } from 'redux'
import initialstate from './initialState.json'

const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };
  
const loadFromLocalStorage = () => {
    try {
      const stateStr = localStorage.getItem('state');
      return stateStr ? JSON.parse(stateStr) : initialstate;
    } catch (e) {
      console.error(e);
      return initialstate;
    }
  };

const persistedStore = loadFromLocalStorage();
const store = createStore(appReducer, persistedStore);
// const render = (state)=>{
//     return `<div class="col-sm-4"><div class="card" style="width: 18rem;">
//     <div class="card-header">
//         Latest Repositories
//       </div>
//       <ul class="list-group list-group-flush">
//       ${lodash.takeRight(state.allRepositories,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
//       </ul>
//     </div></div>
//     <div class="col-sm-4"><div class="card" style="width: 18rem;">
//     <div class="card-header">
//         Latest Issues
//       </div>
//       <ul class="list-group list-group-flush">
//       ${lodash.takeRight(state.allIssues,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
//       </ul>
//     </div></div>
//     <div class="col-sm-4"><div class="card" style="width: 18rem;">
//     <div class="card-header">
//         Latest Actions
//       </div>
//       <ul class="list-group list-group-flush">
//       ${lodash.takeRight(state.allCommands,5).reverse().map(item => `<li class="list-group-item">${item}</li>`).join('')}
//       </ul>
//     </div></div>`
// }

store.subscribe(() => {
  saveToLocalStorage(store.getState());
})



export {store, loadFromLocalStorage}
