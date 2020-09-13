import React, { Component } from 'react';
import { Nav, Navbar, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleRegister(event) {
        this.toggleModal();
        this.props.registerUser({username: this.id.value, password: this.pw.value, firstname: this.fn.value, lastname: this.ln.value});
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
                            <div className="col-sm-2">
                                <img src="/assets/images/logo.png" height="100" width="100" alt="Melomato Logo" />
                            </div>
                            <div>
                                <h2>Melomato To-do App</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Navbar light sticky="top">
                    <div className="container">
                        <Nav navbar>
                            <NavLink className="nav-link" to="/tasks">
                                <h3>My Tasks</h3>
                            </NavLink>
                            <div>
                                { !this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <i className="fa fa-sign-in fa-lg" /> Login / Signup
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                    <div className="navbar-text">Username: {this.props.auth.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                    </div>
                                }
                            </div>
                        </Nav>
                    </div>
                </Navbar>
                <br/>

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

                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="id">Username</Label>
                                <Input type="text" id="id" name="id"
                                    innerRef={input => this.id = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="pw">Password</Label>
                                <Input type="text" id="pw" name="pw"
                                    innerRef={input => this.pw = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="fn">Firstname</Label>
                                <Input type="text" id="fn" name="fn"
                                    innerRef={input => this.fn = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="ln">Lastname</Label>
                                <Input type="text" id="ln" name="ln"
                                    innerRef={input => this.ln = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Sign Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;