import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Tasks from './TaskComponent';
import TaskInfo from './TaskInfoComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTask, postTask, putTask, deleteTask, fetchTasks, loginUser, logoutUser } from '../redux/ActionCreators';

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
    fetchTask: (taskId) => (fetchTask(taskId)),
    putTask: (taskId) => (putTask(taskId)),
    deleteTask: (taskId) => (deleteTask(taskId))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {        

        const HomePage = () => {
            return (
                <Home />
            );
        }

        const TaskWithId = ({match}) => {
            return (
                this.props.auth.isAuthenticated
                ?
                <TaskInfo
                    task={this.props.tasks.tasks.filter(task => task._id === match.params.taskId)[0]} 
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
                  pathname: '/home',
                  state: { from: props.location }
                }} />
          )} />
        );
        
        //const arr = this.props.tasks.tasks;
        //alert(arr);

        return (
            <div>
                <Header auth={this.props.auth} 
                  loginUser={this.props.loginUser} 
                  logoutUser={this.props.logoutUser} 
                />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <PrivateRoute exact path='/tasks' component={() => <Tasks tasks={this.props.tasks} postTask={this.props.postTask} putTask={this.props.putTask} deleteTask={this.props.deleteTask} />} />
                    <PrivateRoute path='/tasks/:taskId' component={TaskWithId} />
                    <Redirect to='/home' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));