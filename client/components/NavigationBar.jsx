import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, NavItem } from 'react-materialize';
import { logout } from '../actions/authActions'; 

/**
 * @description - NavigationBar component
 * 
 * @export {Object}
 * 
 * @class NavigationBar
 * 
 * @extends {Component}
 */
class NavigationBar extends Component {

  /**
	 * 
	 * @description - Logout user out of the app
	 * 
	 * @memberOf NavigationBar
	 */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Navigation
	 */
  render() {
    let role;
    const isAuthenticated = this.props.auth.authenticated;
    if (isAuthenticated) {
      if (this.props.auth.user.currentUser.isAdmin === 1) {
        role = '/admin';
      }
      else {
        role = '/dashboard'
      }
    }
    
    return (
      <div className="Navwrapper">
        {isAuthenticated?
        (
          <Link to={role}><Navbar brand="Hello-Books" fixed right>
            <NavItem><Link to={role}>Home</Link></NavItem>
            <NavItem><Link to={this.props.route}>{this.props.link}</Link></NavItem>
            <NavItem><Link to={this.props.route1}>{this.props.link1}</Link></NavItem>
            <NavItem><Link onClick={ this.logout.bind(this) }>Logout</Link></NavItem>
          </Navbar></Link>
        ):
        (
          <Link to="/"><Navbar brand='Hello-Books' right fixed>
            <NavItem><Link to='/'>Home</Link></NavItem>
            <NavItem><Link to='/about'>About</Link></NavItem>
            <NavItem><a href='https://github.com/babadee001/HelloBooks#readme'>Check on Github</a></NavItem>
          </Navbar></Link>
        )
        }
        
      </div>
    );
  }
}
NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
