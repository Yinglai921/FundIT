import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function(ComposedComponent) {

    class Authentication extends Component {

        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount(){
            if (!this.props.authenticated){
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps){ // whenever the component will be rerendered, check the next props
            if (!nextProps.authenticated){
                this.props.history.push('/');
            }
        }

        render(){
            return <ComposedComponent {...this.props} /> // load the props from whatever parents, pass through
        }
    }

    function mapStateToProps(state){
        return{ authenticated: state.auth.authenticated};
    }

    return withRouter(connect(mapStateToProps)(Authentication));
}

