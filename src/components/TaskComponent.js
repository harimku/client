import React, { Component } from 'react';
import { Media, Button, Label  } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderTask({ task, deleteTask }) {
    return (
        <Media>
            <Media body className="ml-5">
                <Media heading>{task.name}</Media>
                <p>taskID: {task._id}</p>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>Due: {task.duedate}</p>
                <span>
                    <Link to={`/tasks/${task._id}`}>Update Task</Link>
                </span>
                <Button onClick={() => deleteTask(task._id)}>
                    Delete Task
                </Button>
            </Media>
        </Media>
    );
}


class Tasks extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postTask(values.name, values.description, values.type, values.status);
    }

    render() {
        if (this.props.tasks.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (this.props.tasks.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.tasks.errMess}</h4>
                    </div>
                </div>
            )
        }
        if (this.props.tasks.tasks && this.props.tasks.tasks.length > 0) {
            const tasks = this.props.tasks.tasks.map(task => {
                return (
                    <div key={task._id} className="col-12 mt-5">
                        <RenderTask task={task} updateTask={this.props.putTask} deleteTask={this.props.deleteTask} />
                    </div>
                );
            });

            return (
                <div className="container">
                    <div className="row-content">
                        <div className="col-12">
                            <h3>My Tasks</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row-content">
                        <Media list>
                            {tasks}
                        </Media>
                    </div>
                    <div className="row-content">
                        <Media>
                            <br/>
                            <h4>Add Tasks </h4>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <Label htmlFor="name">Name</Label>
                                        <Control.textarea model=".name" id="name" name="name"
                                            rows="1"
                                            className="form-control"
                                        />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="description">Description</Label>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="1"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="type">Type</Label>
                                    <Control.textarea model=".type" id="type" name="type"
                                        rows="1"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="status">Status</Label>
                                    <Control.textarea model=".status" id="status" name="status"
                                        rows="1"
                                        className="form-control"
                                    />
                                </div>
                                <Button type="submit" color="primary">
                                    Create Task
                                </Button>
                            </LocalForm>
                        </Media>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row-content">
                        <div className="col-12">
                            <h4>You have no saved tasks.</h4>
                        </div>
                    </div>
                    <div className="row-content">
                        <div>
                            <h4>Add Tasks Here </h4>
                            <Media>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                    <Label htmlFor="name">Name</Label>
                                        <Control.textarea model=".name" id="name" name="name"
                                            rows="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="description">Description</Label>
                                        <Control.textarea model=".description" id="description" name="description"
                                            rows="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="type">Type</Label>
                                        <Control.textarea model=".type" id="type" name="type"
                                            rows="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="status">Status</Label>
                                        <Control.textarea model=".status" id="status" name="status"
                                            rows="1"
                                            className="form-control"
                                        />
                                    </div>
                                    <Button type="submit" color="primary">
                                        Create Task
                                    </Button>
                                </LocalForm>
                            </Media>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Tasks;