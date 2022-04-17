import C from '../constants'
import {combineReducers} from 'redux'


export const repository = (state = null, action) =>
    (action.type === C.ADD_REPO) ?
    action.payload :
    state


export const allRepositories = (state = [], action) => {

    switch (action.type) {

        case C.ADD_REPO:
            return [
                ...state,
                repository(null, action)
            ]
        default:
            return state
    }

}

export const issue = (state = null, action) =>
    (action.type === C.ADD_ISSUE) ?
    action.payload :
    state


export const allIssues = (state = [], action) => {

    switch (action.type) {

        case C.ADD_ISSUE:
            return [
                ...state,
                issue(null, action)
            ]
        case C.REMOVE_ISSUE:
            return state.filter((issue) => issue !== action.payload)
        default:
            return state
    }

}

export const command = (state = null, action) =>
    (action.type === C.ADD_COMMAND) ?
    action.payload :
    state


export const allCommands = (state = [], action) => {

    switch (action.type) {

        case C.ADD_COMMAND:
            return [
                ...state,
                command(null, action)
            ]
        default:
            return state
    }

}

export default combineReducers({
    allRepositories,
    allIssues,
    allCommands
})