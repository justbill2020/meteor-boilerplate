import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Alert } from 'react-bootstrap'

export class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state={
      error:''
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email =this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (password.length < 9){
      return this.setState({
        error: 'Password must be more than 8 characters long'
      })
    }
    this.props.createUser({email, password},(err)=>{
      if (err) {
        this.setState({
          error: err.reason
        })
      } else {
        this.setState({
          error:''
        })
      }
    }) 
  }
  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign Up</h1>
          {this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">return home</Link>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    createUser: (userId)=>{
      Meteor.call('u.new', userId)
    }
  }
}) (Signup)