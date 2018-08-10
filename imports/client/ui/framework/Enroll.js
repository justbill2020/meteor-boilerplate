import React from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Alert } from 'react-bootstrap'
import { browserHistory } from 'react-router'

export class Enroll extends React.Component {
  constructor(props){
    super(props)
    this.state={
      msg:'',
      token: Session.get('pwToken')
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let password = this.refs.password1.value.trim()
    let password2 = this.refs.password2.value.trim()
    let {token} = this.props.routeParams
    if (password.length < 9){
      return this.setState({
        msg: {
          text:'Password must be more than 8 characters long',
          style: 'danger'
        }
      })
    }
    if (password !== password2){
      return this.setState({
        msg: {
          text:'Password must match',
          style: 'danger'
        }
      })
    }
    this.props.resetPassword(token,password,(err)=>{
      if (err) {
        this.setState({
          msg: {
            text:err.reason,
            style: 'danger'
          }
        })
      } else {
        this.props.verifyEmail(token,(err)=>{
          if (err) {
            this.setState({
              msg: {
                text:err.reason,
                style: 'danger'
              }
            })
          } else {
            this.setState({
              msg:''
            })
            browserHistory.push('/')
          }
        })    
      }
    }) 
  }
  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>{this.props.title}</h1>
          {this.state.msg ? <Alert bsStyle={this.state.msg.style}>{this.state.msg.text}</Alert> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="password" ref="password1" name="password1" placeholder="Password"/>
            <input type="password" ref="password2" name="password2" placeholder="Confirm Password"/>
            <button className="button">Save Password</button>
          </form>
        </div>
      </div>
    )
  }
}

Enroll.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
}

export default withTracker((props) => {
  return {
    verifyEmail: Accounts.verifyEmail,
    resetPassword: Accounts.resetPassword,
    title: props.route.title
  }
}) (Enroll)