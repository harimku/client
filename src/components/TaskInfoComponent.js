import React from 'react';
import { Card, CardText, CardBody, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderTask({task, taskId, postTask, putTask, deleteTask}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardBody>
                    <CardText>{taskId}</CardText>
                    <CardText>{task.name}</CardText>
                    <CardText>{task.description}</CardText>
                </CardBody>
            </Card>
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
                        taskId={props.task._id}
                        postTask={props.postTask}
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