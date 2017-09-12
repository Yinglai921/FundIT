import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//import { load as loadAccount } from ''


let InitializeFromStateForm = props => {
    const { handleSubmit, pristine, reset, submitting, initialValue } = props
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label>With all of the words</label>
                <div>
                    <Field name="ANDquery" value="data" component="input" type="text" placeholder=""/>
                </div>
            </div>
            <div>
                <label>With at least one of the words</label>
                <div>
                    <Field name="ORquery" component="input" type="text" placeholder="" />
                </div>
            </div>
            <div>
                <label>Without the words</label>
                <div>
                    <Field name="NOTquery" component="input" type="text" placeholder="" />
                </div>
            </div>
            <div>
                <label>In title</label>
                <div>
                    <Field name="title" id="title" component="input" type="checkbox"/>
                </div>
            </div>
            <div>
                <label>In keywords</label>
                <div>
                    <Field name="keywords" id="keywords" component="input" type="checkbox"/>
                </div>
            </div>
            <div>
                <label>In tags</label>
                <div>
                    <Field name="tags" id="tags" component="input" type="checkbox"/>
                </div>
            </div>
            <button type="submit" disabled={pristine || submitting}> Submit</button>
        </form>
    )
}


class AdvancedSearchForm extends Component{
    constructor(props){
        super(props);
        this.state ={
          
        }
      }
    
    render(props){
        return (
            <InitializeFromStateForm onSubmit={this.props.onSubmit} initialValues={this.props.initialData}/>
        )
    }
}

InitializeFromStateForm = reduxForm({
    form: "initializeFromState"

})(InitializeFromStateForm)


export default AdvancedSearchForm;