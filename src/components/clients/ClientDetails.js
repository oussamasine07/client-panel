import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";

import Spinner from "../layouts/Spinner";

class ClientDetails extends Component {

    state = {
        showUpdateInput: false,
        updateBalanceInput: ""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onBalanceSubmit = (e) => {
        e.preventDefault();

        const { client, firestore } = this.props;
        const { updateBalanceInput } = this.state;

        const newBalance = {
            balance : parseFloat(updateBalanceInput)
        }

        firestore.update({ collection: "clients", doc: client.id }, newBalance);
        this.setState({ showUpdateInput: false, updateBalanceInput: "" })
    }

    onDeleteClick = () => {
        const { client, firestore, history } = this.props;

        firestore.delete({ collection: "clients", doc: client.id })
            .then(history.push("/"));

    }

    render () {
        const { client } = this.props;
        const { showUpdateInput, updateBalanceInput } = this.state;

        let updatedBalance = "";

        if (showUpdateInput) {
            updatedBalance = (
                <form onSubmit={this.onBalanceSubmit}>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            name="updateBalanceInput" 
                            value={updateBalanceInput} 
                            onChange={this.onChange} 
                        />

                        <div className="input-group-append">
                            <input 
                                type="submit" 
                                className="btn btn-outline-dark" 
                                value="Update"    
                            /> 
                        </div>
                    </div>
                </form> 
            );
        }

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="text-primary">
                                <i className="fas fa-arrow-circle-left"></i> Back To Home Page
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger" onClick={ this.onDeleteClick }>Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="card">
                        <h1 className="card-header"> {client.firstName} {" "} {client.lastName} </h1>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-ms-6">
                                    <h4> Client ID: {" "} <span className="text-secondary">{client.id}</span> </h4>
                                </div>
                                <div className="col-md-4 col-ms-6">
                                    <h4 className="pull-right"> Balance: <span className={
                                        classnames({
                                            "text-primary" : parseFloat(client.balance) > 0,
                                            "text-danger" : parseFloat(client.balance) === 0
                                        })
                                    }> ${parseFloat(client.balance).toFixed(2)} </span> {" "} <i className="fas fa-pencil-alt text-primary" style={{ cursor: "pointer" }} onClick={ e => this.setState({ showUpdateInput: !showUpdateInput }) }></i> </h4>
                                    
                                    { updatedBalance }
                                </div>
                            </div>
                            <hr/>
                            <ul className="list-group">
                                <li className="list-group-item"> Email: {client.email} </li>
                                <li className="list-group-item"> Phone: {client.phone} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<Spinner/>);
        }
        
    }
}

ClientDetails.propTypes = {
    client: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: "clients", storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({  firestore : { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);