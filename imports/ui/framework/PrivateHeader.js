import React from 'react'
import PropTypes from 'prop-types'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

export class PrivateHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }
  componentWillMount() {
    Tracker.autorun(() => {
      if (Meteor.userId()) {
        this.setState({
          'user': Meteor.user()
        })
      }
    })
  }
  renderUserDropDown(){
    let user = this.state.user
    if (!user || !user.emails[0].address) {
      return undefined
    }

    return (
      <NavDropdown eventKey={2} title={user.emails[0].address} id="basic-nav-dropdown">
        <MenuItem eventKey={2.1}>Action</MenuItem>
        <MenuItem eventKey={2.2}>Another action</MenuItem>
        <MenuItem eventKey={2.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={()=>{
          this.props.handleLogout()
        }} eventKey={2.4}>Log Out</MenuItem>
      </NavDropdown>
    )
  }

  render(){
    return (
      <Navbar inverse fixedTop collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{this.props.title}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={() => {
              browserHistory.push('/settings')  
            }}><Glyphicon glyph="cog"/></NavItem>
            {this.renderUserDropDown()}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default createContainer(()=>{
  return {
    handleLogout: () => Accounts.logout()
  }
}, PrivateHeader)

// <div className="header">
//     <div className="header__content">
//         <h1 className="header__title">{props.title}</h1>
//         <button onClick={() => props.handleLogout()}
//         className="button button--link-text">
//             LogOut
//         </button>
//     </div>
// </div>