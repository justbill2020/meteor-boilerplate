import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'

import { Random } from 'meteor/random'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Alert, Button, Glyphicon, Label } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class InviteDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {msg:[]}
    this.timers = {}
    this.selectedCheckboxes = new Set();
  }
  componentWillUnmount(){
    Object.keys(this.timers).forEach((timer)=>{
      if (this.timers[timer]) {
        delete this.timers[timer]
      }
    })
  }
  autoId (){
    return Random.id()
  }
  addRole (row) {
    let { email, name } = row
    this.props.call(
      'u.new',
      email,
      name,
      (err)=>{
        let {msg} = this.state 
        if (err) {
          msg.push({
            text: err.reason + '\n\n' +
              'Check below to see if the user was created. If so, please resend the invitation.',
            style:'danger',
            msgId: 'msg_'+ row._id+'_'+msg.length
          })
        } else {
          msg.push({
            text:'User Created Successfully! \n\n'+
              'An invitation has been sent.',
            style:'success',
            msgId: 'msg_'+ row._id+'_'+msg.length
          })
        }
        this.setState({msg})
        this.timers['msg_'+ row._id+'_'+msg.length] = setTimeout(this.onAlertDismiss.bind(this,'msg_'+ row._id+'_'+msg.length),5000)
      }
    )
  }
  dismiss(_id){
    if (this.state[_id]) {
      this.setState({[_id]:undefined})
    }
    if (this.timers[_id]) {
      delete this.timers[_id]
    }
  }
  handleResend(row){
    if (this.timers[row._id]) return null
    this.setState({
      [row._id]: {
        style: 'info',
        msg: 'loading...',
      }
    })
    this.props.call('u.reinvite', row._id, row.email, (err)=>{
      if (err) {
        this.setState({
          [row._id]: {
            style: 'danger',
            msg:err.reason,
          }
        })
        this.timers[row._id] = setTimeout(this.dismiss.bind(this,row._id),5000)
      } else {
        this.setState({
          [row._id]: {
            style: 'success',
            msg: 'Invitation Sent',
          }
        })
        this.timers[row._id] = setTimeout(this.dismiss.bind(this,row._id),5000)
      }
    })
  }

  handleReset(row){
    if (this.timers[row._id]) return null
    this.setState({
      [row._id]: {
        style: 'info',
        msg: 'loading...',
      }
    })
    this.props.call('u.reset', row._id, row.email, (err)=>{
      if (err) {
        this.setState({
          [row._id]: {
            style: 'danger',
            msg:err.reason,
          }
        })
        this.timers[row._id] = setTimeout(this.dismiss.bind(this,row._id),5000)
      } else {
        this.setState({
          [row._id]: {
            style: 'success',
            msg: 'Invitation Sent',
          }
        })
        this.timers[row._id] = setTimeout(this.dismiss.bind(this,row._id),5000)
      }
    })
  }

  verifiedFormat(cell,row){
    let style={
      paddingTop: '4px'
    }
    if (cell) {
      return (
        <span>
          <div>
            <Label bsStyle="success">
              <Glyphicon glyph="ok"/>
            </Label>
          </div>
          <div style={style}>
            <Button 
              bsStyle={ this.state[row._id] ? this.state[row._id].style : 'default' } 
              block 
              bsSize="small" 
              onClick={this.handleReset.bind(this, row)}
            >
              { this.state[row._id] ? this.state[row._id].msg : 'Send Password Reset' }
            </Button>
          </div>
        </span>
      )
    }
    return (
      <span>
        <div>
          <Label bsStyle="danger">
            <Glyphicon glyph="remove"/>
          </Label>
        </div>
        <div style={style}>
          <Button 
            bsStyle={ this.state[row._id] ? this.state[row._id].style : 'default' }  
            block 
            bsSize="smmall" 
            onClick={this.handleResend.bind(this, row)}
          >
            { this.state[row._id] ? this.state[row._id].msg : 'Re-Send Invite' }
          </Button>
        </div>
      </span>
    )
  }


  onAfterSaveCell (row, cellName, cellValue){
    this.props.call('u.updateUser', 
      row._id, 
      {
        [cellName]: cellValue
      }, (err)=>{
        let {msg} = this.state    
        if (err) {
          msg.push({
            style: 'danger',
            text: 'User Update Failed \n\n' +
              'could not update ' + cellName + err.reason,
            msgId: 'msg_'+ row._id+'_'+msg.length
          })
        } else {
          msg.push({
            style: 'success',
            text: 'User Update Complete',
            msgId: 'msg_'+ row._id+'_'+msg.length
          })
        }
        this.setState({msg})
        this.timers['msg_'+ row._id+'_'+msg.length] = setTimeout(this.onAlertDismiss.bind(this,'msg_'+ row._id+'_'+msg.length),5000)
      }
    )
  }
  onAlertDismiss(i){
    let {msg} = this.state
    if (this.timers[i]) {
      delete this.timers[i]
    }
    msg.splice( msg.indexOf(i), 1 );
    this.setState({msg})
  }
  renderAlerts() {
    return (
      <FlipMove duration={750} easing="ease-out">
        {this.state.msg.map((alert)=>{
          return (
            <Alert 
              key={'Alert_'+alert.msgId}
              bsStyle={alert.style} 
              onDismiss={this.onAlertDismiss.bind(this,alert.msgId)}
            >
              {alert.text}
            </Alert>
          )
        })}
      </FlipMove>
    )
  }
  render(){
    let style={
      paddingTop: '4px'
    }
    return ( 
      <div style={style}>
        {this.state.msg.length > 0 ? this.renderAlerts() : undefined}
        <BootstrapTable
          data={this.props.userList}
          keyField='_id'
          options={{
            insertText: 'Invite New User',
            afterInsertRow: this.addRole.bind(this),
            clearSearch: true,
            sizePerPageList: [ 
              {
                text:'10',
                value:10
              }, {
                text:'20',
                value:20
              }, {
                text:'50',
                value:50
              }, {
                text: 'All',
                value: this.props.userList.length
              }],
            sizePerPage: 10

          }}
          cellEdit={{
            mode: 'dbclick',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell.bind(this)
          }}
          search={ true }
          insertRow={ true }
          deleteRow={ false }
          pagination={ true }
          hover
        >   
          <TableHeaderColumn dataField='_id' autoValue={this.autoId} hidden hiddenOnInsert>userId</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataAlign='center' editable={(...args)=>{ return !args[1].verified }}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email' dataAlign='center' editable={(...args)=>{ return !args[1].verified }}>Email Address</TableHeaderColumn>
          <TableHeaderColumn dataField='verified' dataAlign='center' dataFormat={this.verifiedFormat.bind(this)} hiddenOnInsert editable={false}>Accepted Invite</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )

  }
}

InviteDetails.propTypes = {
  userList: PropTypes.array.isRequired,
  call: PropTypes.func.isRequired 
}
const getName = (user) => {
  let profile = user.profile || {name: user.emails[0].address}
  let {name} = profile
  return name
}
export default withTracker (() => {
  Meteor.subscribe('invites')
  return {
    userList: Meteor.users.find().fetch().map((item)=>{
      let name = getName(item)
      let {verified,address} = item.emails[0]
      return {
        _id: item._id,
        name,
        email: address,
        verified
      }
    }),
    call: Meteor.call
  }
}) (InviteDetails)