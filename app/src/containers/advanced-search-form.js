import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//import { load as loadAccount } from ''


let InitializeFromStateForm = props => {
    const { handleSubmit, initialValue } = props
    return (
        <div className="search-bar col-sm-12">
            <form onSubmit={ handleSubmit }>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">With all of the words:</label>
                    <div className="col-sm-10">
                        <Field style={{width: "100%"}}  name="ANDquery" value="data" component="input" type="text" placeholder=""/>
                    </div>
                </div>

                {/* the scopes */}
                <div className="form-group row">
                    <div className="col-sm-2">
                        <b>Where my words must all occur:</b>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="must_title" id="must_title" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In title</label>
                        </div>
                        <div className="col-sm-3">
                            <div className="col-sm-2">
                                <Field name="must_keywords" id="must_keywords" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In keywords</label>
                        </div>
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="must_tags" id="must_tags" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In tags</label>
                        </div>
                    </div>
                </div>
                 {/* end of the scopes */}

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">With at least one of the words:</label>
                    <div className="col-sm-10">
                        <Field style={{width: "100%"}} name="ORquery" component="input" type="text" placeholder="" />
                    </div>
                </div>

                {/* the scopes */}
                <div className="form-group row">
                    <div className="col-sm-2">
                        <b>Where my words should at least occur:</b>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="should_title" id="should_title" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In title</label>
                        </div>
                        <div className="col-sm-3">
                            <div className="col-sm-2">
                                <Field name="should_keywords" id="should_keywords" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In keywords</label>
                        </div>
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="should_tags" id="should_tags" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In tags</label>
                        </div>
                    </div>
                </div>
                 {/* end of the scopes */}

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Without the words:</label>
                    <div className="col-sm-10">
                        <Field style={{width: "100%"}}  name="NOTquery" component="input" type="text" placeholder="" />
                    </div>
                </div>

                {/* the scopes */}
                <div className="form-group row">
                    <div className="col-sm-2">
                        <b>Where my words must not all occur:</b>
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="mustnot_title" id="mustnot_title" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In title</label>
                        </div>
                        <div className="col-sm-3">
                            <div className="col-sm-2">
                                <Field name="mustnot_keywords" id="mustnot_keywords" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In keywords</label>
                        </div>
                        <div className="col-sm-2">
                            <div className="col-sm-2">
                                <Field name="mustnot_tags" id="mustnot_tags" component="input" type="checkbox"/>
                            </div>
                            <label className="col-sm-8">In tags</label>
                        </div>
                    </div>
    
                </div>
                {/* end of the scopes */}
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        </div>
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