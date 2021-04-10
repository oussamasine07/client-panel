import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { 
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setallowRegistration
} from "../../actions/settingsAction"


class Settings extends Component {

    onAllowRegistrationChange = () => {
        const { setallowRegistration } = this.props;
        setallowRegistration();
    }

    onDisableBalanceOnAddChange = () => {
        const { setDisableBalanceOnAdd } = this.props;
        setDisableBalanceOnAdd();
    }

    onDisableBalanceOnEditChange = () => {
        const { setDisableBalanceOnEdit } = this.props;
        setDisableBalanceOnEdit();
    }

    render () {
        const { 
            disableBalanceOnAdd,
            disableBalanceOnEdit,
            allowRegistration
         } = this.props.settings
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> {' '} Back To Home Page
                        </Link> 
                    </div>      
                </div>

                <div className="card">
                    <h1 className="card-header">Edit Settings</h1>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Allow Registration</label> {" "}
                                <input 
                                    type="checkbox" 
                                    name="allowRegistration" 
                                    checked={!!allowRegistration} 
                                    onChange={this.onAllowRegistrationChange}    
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Add</label> {" "}
                                <input 
                                    type="checkbox" 
                                    name="disableBalanceOnAdd" 
                                    checked={!!disableBalanceOnAdd} 
                                    onChange={this.onDisableBalanceOnAddChange}    
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Edit</label> {" "}
                                <input 
                                    type="checkbox" 
                                    name="disableBalanceOnAdd" 
                                    checked={!!disableBalanceOnEdit} 
                                    onChange={this.onDisableBalanceOnEditChange}    
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setallowRegistration: PropTypes.func.isRequired
}

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}),
{ setallowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);