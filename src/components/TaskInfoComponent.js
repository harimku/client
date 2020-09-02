import React from 'react';
import { Media, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderTask({task, putTask, deleteTask}) {
    return (
        <div className="container">
            <div className="row-content">
                <div className="col-12">
                    <h3>Edit Task</h3>
                    <hr />
                </div>
            </div>
            <div className="row-content">
                <Media>
                    <Media body className="ml-5">
                        <Media heading>{task.name}</Media>
                        <p>taskID: {task._id}</p>
                        <p>Description: {task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Due: {task.duedate}</p>
                        <Button onClick={() => putTask(task._id)}>
                            Update Task
                        </Button>
                        <Button onClick={() => deleteTask(task._id)}>
                            Delete Task
                        </Button>
                    </Media>
                </Media>
            </div>
        </div>
    );
}

function TaskInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.task) {
        return (
            <div className="container">
                <div className="row">
                    <RenderTask 
                        task={props.task}
                        putTask={props.putTask}
                        deleteTask={props.deleteTask}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default TaskInfo;