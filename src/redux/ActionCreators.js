import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchTasks());
            dispatch(receiveLogin(response));
        } else {
            const error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(tasksFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});

export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const tasksFailed = errMess => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errMess
});

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});

export const updateTask = task => ({
    type: ActionTypes.UPDATE_TASK,
    payload: task
});

export const removeTask = task => ({
    type: ActionTypes.REMOVE_TASK,
    payload: task
});

export const fetchTasks = () => dispatch => {
    dispatch(tasksLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tasks', {
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(tasks => dispatch(addTasks(tasks)))
    .catch(error => dispatch(tasksFailed(error.message)));
}

export const postTask = (name, description, type, status) => dispatch => {

    const newTask = {
        name: name,
        description: description,
        type: type,
        status: status
    };

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tasks', {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error }
    )
    .then(response => response.json())
    .then(response => dispatch(addTask(response)))
    .catch(error => {
        dispatch(tasksFailed(error.message));
    });
};

export const putTask = (id, description, type, status) => dispatch => {

    const newTask = {
        description: description,
        type: type,
        status: status
    };

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tasks/' + id, {
        method: "PUT",
        headers: {
          "Authorization": bearer,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask),
        credentials: "same-origin"
    })
    .then(response => {
            if (response.ok) {
                console.log(response);
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(task => {
        console.log('Task Updated', task);
        dispatch(updateTask(task));
    })
    .catch(error => dispatch(tasksFailed(error.message)));
}

export const deleteTask = taskId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tasks/' + taskId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(task => {
        console.log('Task Deleted', task);
        dispatch(removeTask(task));
    })
    .catch(error => dispatch(tasksFailed(error.message)));
};

export const fetchTask = taskId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'tasks/' + taskId, {
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                console.log('hi');
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(task => {
        console.log('Task: ', task);
        dispatch(getSingle(task));
    })
    .catch(error => dispatch(tasksFailed(error.message)));
};

export const getSingle = (task) => ({
    type: ActionTypes.GET_SINGLE,
    payload: task
});
