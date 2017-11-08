import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Fields } from 'redux-form';
import { signupUser } from '../../actions/index';
import Navigation from '../../components/navigation';

class Signup extends Component {

    renderFields(fields){
        return(
            <div>
                <fieldset className="form-group">
                    <label> Email: </label>
                    <input className="form-control" {...fields.email.input} />
                    {fields.email.meta.touched && fields.email.meta.error && 
                        <span className="error">{fields.email.meta.error}</span>}
                </fieldset>
                <fieldset className="form-group">
                    <label> Password: </label>
                    <input className="form-control" type="password" {...fields.password.input} />
                    {fields.password.meta.touched && fields.password.meta.error && 
                        <span className="error">{fields.password.meta.error}</span>}
                </fieldset>
                <fieldset className="form-group">
                    <label> Confirm Password: </label>
                    <input className="form-control" type="password" {...fields.passwordConfirm.input} />
                    {fields.passwordConfirm.meta.touched && fields.passwordConfirm.meta.error && 
                        <span className="error">{fields.passwordConfirm.meta.error}</span>}
                </fieldset>
            </div>
        )
    }

    handleFormSubmit(formProps){
        // Call action creator to sign up the user
        this.props.signupUser(formProps, this.props.history);
    }

    renderAlert(){
        if (this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
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
                        <Fields names={[ 'email', 'password', 'passwordConfirm' ]} component={this.renderFields}/>
                        {this.renderAlert()}
                        <button type="submit" className="btn btn-primary"> Sign up </button>
                    </form>
                </div>
            </div>
        )
    }
}


function validate(formProps){
    const errors = {};

    if (!formProps.email){
        errors.email = 'Please enter an email';
    }

    if (!formProps.password){
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm){
        errors.passwordConfirm =  'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm){
        errors.passwordConfirm = 'Passwords must match';
    }
    
    return errors;
}


function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'signup'
})(
    connect(mapStateToProps, { signupUser })(Signup)
);