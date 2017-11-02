import React, { Component } from 'react';
import { reduxForm, Fields } from 'redux-form';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { signinUser } from '../../actions/index';

class Signin extends Component {

    renderFields(fields){
        return(
            <div>
                <fieldset className="form-group">
                    <label> Email: </label>
                    <input className="form-control" {...fields.email.input} />
                    {/* {fields.email.meta.touched && fields.email.meta.error && 
                    <span className="error">{fields.email.meta.error}</span>} */}
                </fieldset>
                <fieldset className="form-group">
                    <label> Password: </label>
                    <input className="form-control" {...fields.password.input} type="password" />
                    {/* {fields.password.meta.touched && fields.password.meta.error && 
                    <span className="error">{fields.password.meta.error}</span>} */}
                </fieldset>
            </div>
        )
    }

    handleFormSubmit( {email, password} ){
        console.log(email, password);
        // Need to do something to log user in
        this.props.signinUser({ email, password}, this.props.history);
    }

    renderAlert(){
        if (this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong> Oops! </strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render(){

        const { handleSubmit } = this.props;
 
        return(
            <div className="container-fluid">
        
                <div className="row">
                    <Navigation active={"signin"}/>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Fields names={[ 'email', 'password' ]} component={this.renderFields}/>
                        {this.renderAlert()}
                        <button type="submit" className="btn btn-primary"> Sign in </button>
                    </form>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}


export default reduxForm({
    form: 'signin'
})(
    connect(mapStateToProps, { signinUser })(Signin)
);