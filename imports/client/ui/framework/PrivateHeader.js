import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import { browserHistory, Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Overlay, 
  Row, Col, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap'

export class PrivateHeader extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.trackers = {}
    this.state = {
      user: '',
      subject:'',
      body:''
    }
  }
  componentWillMount() {
    this.trackers.PrivateHeader_user = Tracker.autorun(() => {
      Meteor.subscribe('userData')
      if (Meteor.user()) {
        let user = Meteor.user()
        let {name} = user.profile || {name: "Please Update Your Name"}
        this.setState({
          user,
          name
        })
      }
    })
  }
  componentWillUnmount() {
    Object.keys(this.trackers).forEach((tracker)=>{
      this.trackers[tracker].stop()
    })
  }
  handleChange(e) {
    let key = e.target.id
    let value = e.target.value
    this.setState({ [key]: value });

  }
  isFormValid(){
    let t1 = this.state.body.length > 0
    let t2 = this.state.subject.length > 0
    return t1 && t2
  }
  handleSubmit() {
    if (!this.isFormValid()) {
      return this.setState({
        msg: {
          style:'danger',
          text:'You must make sure that all fields are filled out prior to submitting.'
        },
      })
    }
    let {body, name, user, subject} = this.state
    this.props.call('sendIssueToGitHub',{
      body: body + `\n\n\n Submitted by ${name} <${user.emails[0].address}>`,
      subject,
      from: `${name} <${user.emails[0].address}>`
    }, (err)=>{
      if (err) {
        this.setState({
          msg: {
            text: err.reason,
            style: 'danger'
          }
        })
      } else {
        this.setState({
          msg: {
            text: "Your issue has been submitted successfully",
            style: 'success'
          },
          body:'',
          subject:''
        })
      }
      setTimeout(()=> this.setState({newIssue: false}), 2000)    
    })
  }
  renderUserDropDown(){
    let {user, name} = this.state
    if (!user || !user.emails[0].address) {
      return undefined
    }
    return (
      <NavDropdown eventKey={2} title={`${name} <${user.emails[0].address}>` } id="basic-nav-dropdown">
        <MenuItem onClick={() => {
          browserHistory.push('/account')  
        }} eventKey={2.1}>User Account Settings</MenuItem>
        <MenuItem onClick={() => {
          browserHistory.push('/invites')  
        }} eventKey={2.2}>Invite Users</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={()=>{
          this.props.handleLogout()
        }} eventKey={2.4}>Log Out</MenuItem>
      </NavDropdown>
    )
  }
  renderNewIssue({style, bind}){
    return (
      <div
        style={{
          ...style,
          position: 'absolute',
          backgroundColor: '#EEE',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          border: '1px solid #CCC',
          borderRadius: 3,
          marginLeft: -5,
          marginTop: 5,
          padding: 10,
          width: '50%'
        }}
      >
        <Form horizontal>
          {bind.state.msg ? <Row><Col smOffset={2} sm={8}> <Alert bsStyle={bind.state.msg.style}>{bind.state.msg.text}</Alert> </Col> </Row> : undefined}    
          <FormGroup 
            controlId="subject"
          >
            <Col smOffset={1} sm={10}>
              <FormControl 
                type="text"
                placeholder="Issue Title"
                value={bind.state.subject}
                onChange={bind.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup 
            controlId="body"
          >
            <Col smOffset={1} sm={10}>
              <FormControl 
                componentClass="textarea" 
                placeholder="Issue Description" 
                value = { bind.state.body }
                onChange = { bind.handleChange }
              />
            </Col>
          </FormGroup>
          <Col smOffset={4} sm={4}>
            <Button bsStyle="primary" onClick={bind.handleSubmit}>Submit Issue</Button>        
          </Col>
        </Form>
      </div>
    )
  }
  render(){
    return (
      <Navbar inverse fixedTop collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/dashboard">{this.props.title}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            { window.location.origin.includes('local') || window.location.origin.includes('heroku') ? <NavItem className="btn-danger" disabled eventKey="dev Notice">This is a Dev Environment Do not use REAL customer Details</NavItem> : undefined }
            <NavItem eventKey={1} onClick={() => {
              browserHistory.push('/settings')  
            }}><Glyphicon glyph="cog"/></NavItem>
            <NavItem eventKey={1} ref={(r)=>{
              this.overlay = r
            }}onClick={() => {
              let {newIssue} = this.state
              this.setState({newIssue:!newIssue})
            }}><Glyphicon glyph="question-sign"/>
              <Overlay
                show={this.state.newIssue}
                onHide={() => {
                  this.setState({newIssue:false})
                }}
                placement="bottom"
                container={this}
                rootClose={true}
                target={()=>{
                  return this.overlay
                }}
              >
                <this.renderNewIssue bind={this}/>
              </Overlay>
            </NavItem>
            {this.renderUserDropDown()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  call: PropTypes.func.isRequired
}

export default withTracker(()=>{
  return {
    handleLogout: () => Accounts.logout(),
    call: Meteor.call
  }
}) (PrivateHeader)