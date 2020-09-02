import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return(
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row-center">
                            <div className="col-sm-4">
                                <img src="/assets/images/logo.png" height="100" width="100" alt="Melomato Logo" />
                            </div>
                            <div className="col-sm-8">
                                <h2>Melomato To-do App</h2>
                                <h4>a better way to manage your tasks</h4>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Navbar light sticky="top" expand="sm">
                    <div className="container">
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/tasks">
                                    <i className="fa fa-check-circle fa-sm" />My Tasks
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                { !this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <i className="fa fa-sign-in fa-lg" /> Login
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                    <div className="navbar-text mr-3">Username: {this.props.auth.user.username}</div>
                                    <Button outline onClick={this.handleLogout}>
                                        <span className="fa fa-sign-out fa-lg"></span> Logout
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    </div>
                                }
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;