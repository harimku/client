import React, { Component } from 'react';
import Header from './HeaderComponent';
import Tasks from './TaskComponent';
import TaskInfo from './TaskInfoComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTask, postTask, putTask, deleteTask, fetchTasks, registerUser, loginUser, logoutUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    registerUser: creds => (registerUser(creds)),
    loginUser: creds => (loginUser(creds)),
    logoutUser: () => (logoutUser()),
    fetchTasks: () => (fetchTasks()),
    postTask: (name, description, type, status) => (postTask(name, description, type, status)),
    fetchTask: (taskId) => (fetchTask(taskId)),
    putTask: (taskId, name, description, type, status) => (putTask(taskId, name, description, type, status)),
    deleteTask: (taskId) => (deleteTask(taskId))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTasks();
        //this.props.fetchTask("5f5064a57c32abda28460c29");
    }

    render() {     

        const TaskWithId = ({match}) => {
            return (
                this.props.auth.isAuthenticated
                ?
                <TaskInfo
                    id={match.params.taskId}
                    fetchTask={this.props.fetchTask}
                    putTask={this.props.putTask}
                    deleteTask={this.props.deleteTask}
                />
                :
                <div>
                    <h4>Not authorized!</h4>
                </div>
            );
        };

        const PrivateRoute = ({ component: Component, ...rest }) => (
          <Route {...rest} render={(props) => (
            this.props.auth.isAuthenticated
              ? <Component {...props} />
              : <Redirect to={{
                  pathname: '/',
                  state: { from: props.location }
                }} />
          )} />
        );
        
        return (
            <div>
                <Header auth={this.props.auth} 
                  registerUser={this.props.registerUser}
                  loginUser={this.props.loginUser} 
                  logoutUser={this.props.logoutUser} 
                />
                <Switch>
                    <PrivateRoute exact path='/tasks' component={() => <Tasks tasks={this.props.tasks} postTask={this.props.postTask} putTask={this.props.putTask} deleteTask={this.props.deleteTask} />} />
                    <PrivateRoute path='/tasks/:taskId' component={TaskWithId} />
                    <Redirect to='/' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));