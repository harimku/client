import React, { Component } from 'react';
import Header from './HeaderComponent';
import Tasks from './TaskComponent';
import TaskInfo from './TaskInfoComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postTask, putTask, deleteTask, fetchTasks, loginUser, logoutUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    loginUser: creds => (loginUser(creds)),
    logoutUser: () => (logoutUser()),
    fetchTasks: () => (fetchTasks()),
    postTask: (name, description, type, status) => (postTask(name, description, type, status)),
    putTask: (taskId) => (putTask(taskId)),
    deleteTask: (taskId) => (deleteTask(taskId))
};

class Main extends Component {
    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {        
        const TaskWithId = ({match}) => {
            return (
                <TaskInfo
                    task={this.props.tasks.tasks.filter(task => task._id === match.params.taskId)[0]}
                    isLoading={this.props.tasks.isLoading}
                    errMess={this.props.tasks.errMess}
                    postTask={this.props.postTask}
                />
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
                  loginUser={this.props.loginUser} 
                  logoutUser={this.props.logoutUser} 
                />
                <Switch>
                    <PrivateRoute exact path="/tasks" component={() => <Tasks tasks={this.props.tasks} postTask={this.props.postTask} putTask={this.props.putTask} deleteTask={this.props.deleteTask} />} />
                    <PrivateRoute path='/tasks/:taskId' component={TaskWithId} />
                    <Redirect to='/' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));