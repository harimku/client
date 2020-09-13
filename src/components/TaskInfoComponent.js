import React, { Component } from 'react';
import { Media, Button, Label  } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


class TaskInfo extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.putTask(this.props.id, values.description, values.type, values.status);
    }

    render() {
        if (this.props.id) {
            return (
                <div className="container">
                    <div className="row-content">
                        <div className="col-12">
                            <h3>Edit Task : {this.props.id} </h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row-content">
                        <Media>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
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
                                    Update Task
                                </Button>
                                <Button onClick={() => this.props.deleteTask(this.props.id)}>
                                    Delete Task
                                </Button>
                            </LocalForm>
                        </Media>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    d
                </div>
            );
        }
    }
}

export default TaskInfo;