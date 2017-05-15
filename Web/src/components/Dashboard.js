/**
 * Created by anda on 5/14/17.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadToken} from './../actions';
import Header from './Header';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadToken();
  }

  render() {
    return (
      <div className="container">
        <Header user={this.props.user}/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    loadToken: loadToken
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppComponent);
