import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Fields } from 'redux-form';
//import {  } from '../../actions/index';
import Navigation from '../../components/navigation';

class Signup extends Component {

    renderFields(fields){
        return(
            <div>
                <fieldset className="form-group">
                    <label> Email: </label>
                    <input className="form-control" {...fields.email.input} />
                </fieldset>
                <fieldset className="form-group">
                    <label> Password: </label>
                    <input className="form-control" type="password" {...fields.password.input} />
                    {fields.password.meta.touched && fields.password.meta.error && 
                        <span className="error">{fields.password.meta.error}</span>}
                </fieldset>
                <fieldset className="form-group">
                    <label> Confirm Password: </label>
                    <input className="form-control" type="password" {...fields.confirmPassword.input} />
                </fieldset>
            </div>
        )
    }

    handleFormSubmit(){

    }
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <Navigation active={"signin"}/>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Fields names={[ 'email', 'password', 'confirmPassword' ]} component={this.renderFields}/>
                        <button type="submit" className="btn btn-primary"> Sign up </button>
                    </form>
                </div>
            </div>
        )
    }
}


function validate(formProps){
    const errors = {};

    if (formProps.password !== formProps.confirmPassword){
        errors.password = 'Passwords must match';
    }
    

    return errors;
}

export default reduxForm({
    validate, // validate: valudate
    form: 'signup'
})(Signup);