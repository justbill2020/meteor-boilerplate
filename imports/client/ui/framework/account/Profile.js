import React from 'react'
import PropTypes from 'prop-types'

import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { withTracker } from 'meteor/react-meteor-data'
import { PageHeader } from 'react-bootstrap'
import { RIEInput } from 'riek'



export class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.trackers = {}
    this.state = {
      user: '',
      name: 'Please Update Your Name'
    }
    this.trackers.Profile_user = Tracker.autorun(() => {
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
  
  titleChange(updates){
    this.setState(updates)
    this.props.call('u.updateProfile', updates)
  }

  render(){
    return (
      <div>
        <PageHeader>
          {this.props.title}
        </PageHeader>
        Name: <RIEInput
          value={this.state.name}
          change={this.titleChange.bind(this)}
          propName='name' />
      </div>
    )
  }
}

Profile.propTypes = {
  call: PropTypes.func.isRequired
}

export default withTracker (() => {
  return {
    call: Meteor.call
  }
}) (Profile)