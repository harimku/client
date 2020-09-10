import * as ActionTypes from './ActionTypes';

export const Tasks = (state = {
        isLoading: true,
        errMess: null,
        tasks: []
    }, action) => {
    switch(action.type) {

        case ActionTypes.ADD_TASK:
            const newTask = action.payload;
            return {...state, tasks: state.tasks.concat(newTask)};

        case ActionTypes.ADD_TASKS:
            return {...state, isLoading: false, errMess: null, tasks: action.payload};
        
        case ActionTypes.GET_SINGLE:
            return {
                ...state,
                fetching: true,
                task: action.payload
            };
        case ActionTypes.UPDATE_TASK:
            return {...state, isLoading: false, errMess: null, task: action.payload};
    
        case ActionTypes.TASKS_LOADING:
            return {...state, isLoading: true, errMess: null, tasks: null};

        case ActionTypes.TASKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tasks: null};

        default:
            return state;
    }
};