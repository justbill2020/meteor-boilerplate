import React from 'react'
import PropTypes from 'prop-types'

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import { Alert, Button, Col, ControlLabel, Form, FormGroup, FormControl, PageHeader, Row } from 'react-bootstrap'

export class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.getCurrPassValidationState = this.getCurrPassValidationState.bind(this)
    this.getPass1ValidationState = this.getPass1ValidationState.bind(this)
    this.getPass2ValidationState = this.getPass2ValidationState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this._isMounted = false
    this.state = {
      formCurrPass: '',
      formPass1: '',
      formPass2: ''
    };
  }
  componentDidMount(){
    this._isMounted = true
  }
  componentWillUnmount(){
    this._isMounted = false    
  }

  getCurrPassValidationState() {
    if (!this._isMounted) return null
    const length = this.state.formCurrPass.length;
    let bsStyle = null
    if (length > 0 ) { 
      bsStyle = 'success'
    }
    return bsStyle;
  }
  getPass1ValidationState() {
    if (!this._isMounted) return null
    const length = this.state.formPass1.length;
    let bsStyle = null
    if (length >= 8) {
      bsStyle = 'success'
    } else if (length > 5) {
      bsStyle = 'warning'
    } else if (length > 0) { 
      bsStyle = 'error'
    }
    return bsStyle;
  }
  getPass2ValidationState() {
    if (!this._isMounted) return null
    let bsStyle = null
    if (this.state.formPass1 === this.state.formPass2 && this.state.formPass2 !== '') {
      bsStyle = 'success'
    } else if (this.state.formPass1 !== this.state.formPass2 && this.state.formPass2 !== '') { 
      bsStyle = 'error'
    }
    return bsStyle;
  }
  handleChange(e) {
    let key = e.target.id
    let value = e.target.value
    this.setState({ [key]: value.trim() });

  }
  isFormValid(){
    let t = 'success'
    return ( 
      this.getCurrPassValidationState() === t &&
      this.getPass1ValidationState() === t &&
      this.getPass2ValidationState() === t
    ) 
  }
  handleSubmit() {
    if (!this.isFormValid()) {
      return this.setState({
        msg: {
          style:'danger',
          text:'You must make sure that the form has green check marks prior to submitting.'
        }
      })
    }

    Accounts.changePassword(this.state.formCurrPass, this.state.formPass1, (err)=>{
      if (err) {
        this.setState({
          msg: {
            text:err.reason,
            style: 'danger'
          }
        })
      } else {
        this.setState({
          msg: {
            text: "Your password has been updated successfully",
            style: 'success'
          },
          formCurrPass:'',
          formPass1:'',
          formPass2:''
        })
      }
    })

  }

  render(){
    return (
      <div>
        <PageHeader>
          {this.props.title}
        </PageHeader>
        {this.state.msg ? <Row><Col sm={7}> <Alert bsStyle={this.state.msg.style}>{this.state.msg.text}</Alert> </Col> </Row> : undefined}
        <Form horizontal>
          <FormGroup 
            controlId="formCurrPass"
            validationState={this.getCurrPassValidationState()}
          >
            <Col componentClass={ControlLabel} sm={2}>
                    Current Password
            </Col>
            <Col sm={5}>
              <FormControl 
                type="password"
                placeholder=""
                value={this.state.formCurrPass}
                onChange={this.handleChange}
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <FormGroup 
            controlId="formPass1"
            validationState={this.getPass1ValidationState()}
          >
            <Col componentClass={ControlLabel} sm={2}>
                    New Password
            </Col>
            <Col sm={5}>
              <FormControl 
                type="password" 
                placeholder=""
                value={this.state.formPass1}
                onChange={this.handleChange}
              />
              <FormControl.Feedback/>              
            </Col>
          </FormGroup>
          <FormGroup 
            controlId="formPass2"
            validationState={this.getPass2ValidationState()}
          >
            <Col componentClass={ControlLabel} sm={2}>
                    Confirm Password
            </Col>
            <Col sm={5}>
              <FormControl 
                type="password" 
                placeholder="" 
                value = { this.state.formPass2 }
                onChange = { this.handleChange }
              />
              <FormControl.Feedback/>
            </Col>
          </FormGroup>
          <Col smOffset={2} sm={5}>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Change Password</Button>        
          </Col>
        </Form>
      </div>
    )
  }
}

Profile.propTypes = {
  Users: PropTypes.object,
  call: PropTypes.func.isRequired
}

export default withTracker (() => {
  return {
    Users: Meteor.users,
    call: Meteor.call
  }
}) (Profile)