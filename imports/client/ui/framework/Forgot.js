import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import { Alert } from 'react-bootstrap'

export class Forgot extends React.Component {
  constructor(props){
    super(props)
    this.state={
      msg:'',
      btn:{
        text: 'Reset Password',
        disabled: false
      }
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email =this.refs.email.value.trim()
    if (email.length <= 0) {
      return this.setState({
        msg: {
          text:'You must enter an email',
          style:'danger'
        }
      })
    }
    this.setState({
      btn:{
        text: 'Sending Reset Email',
        disabled: true
      }
    })
    this.props.forgotPassword({email},(err)=>{
      if (err) {
        this.setState({
          msg: {
            text: err.reason,
            style:'danger'
          },
          btn:{
            text: 'Reset Password',
            disabled: false
          }
        })
      } else {
        this.setState({
          msg:{
            text:'Your password will be sent.',
            style:'success'
          },
          btn:{
            text: 'Reset Password',
            disabled: false
          }
        })
      }
    }) 
  }
  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Forgot Password</h1>
          {this.state.msg ? <Alert bsStyle={this.state.msg.style}>{this.state.msg.text}</Alert> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <p>Enter your email to recieve a password reset email.</p>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <button className="button" disabled={this.state.btn.disabled}>{this.state.btn.text}</button>
          </form>

          <Link to="/">return home</Link>
        </div>
      </div>
    )
  }
}

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    forgotPassword: Accounts.forgotPassword
  }
}) (Forgot)