import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Nav from './NavigationBar';
import '../style/style.scss';

/**
 * @description - Home
 * 
 * @export {Object}
 * 
 * @class Home
 * 
 * @extends {Component}
 */
class Home extends Component {
  render() {
    const isAuthenticated = this.props.auth.authenticated;
    let role, profile;
    if (isAuthenticated) {
      if (this.props.auth.user.currentUser.isAdmin === 1) {
        role = '/admin';
        profile = '/adminprofile'
      }
      else {
        role = '/dashboard'
        profile = '/profile'
      }
    }
    return (
      <div>
        <Nav route1={profile} link1="Profile" route2="/dashboard" link2="All books" />
        <div className="background container-fluid">
          <div className="row row-centered">
            <div className="col-md-6 col-centered">
            {isAuthenticated?
            (
              <div>
              <h1>This is HelloBooks</h1>
              <Link to={role} className="btn">Dashboard</Link>
              </div>
            ):
            (
              <div>
              <h1>Welcome to HelloBooks</h1>
              <Link to="/signup" className="btn">Signup</Link>
              <Link to="/signin" className="btn">Signin</Link>
              </div>
            )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, {})(Home);
