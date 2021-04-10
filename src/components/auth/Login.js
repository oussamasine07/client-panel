import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { notifyAction } from "../../actions/notifyAction";

// load components
import Alert from "../layouts/Alert";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    onChange = e => this.setState({ [ e.target.name ] : e.target.value });
    
    onSubmit = e => {
        e.preventDefault();

        const { firebase, notifyAction } = this.props;
        const { email, password } = this.state;

        firebase.login({ email, password }).catch(err => notifyAction("invalid user or password", "error"));

    }

    render () {

        const { email, password } = this.state;
        const { message, messageType } = this.props.notify;

        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            { message ? (
                                <Alert message={message} messageType={messageType} />
                            ) : null }
                            <h1 className="text-center">
                                <span className="text-primary">
                                <i className="fas fa-user-lock"></i> {" "} Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email: </label>
                                    <input
                                        placeholder="Login"
                                        name="email"
                                        type="text"
                                        value={email}
                                        className="form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password: </label>
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        className="form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input value="Login" type="submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyAction: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), {notifyAction})
)(Login);