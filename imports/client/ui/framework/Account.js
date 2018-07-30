import React from 'react'
import { Row, Col} from 'react-bootstrap'

import PrivateHeader from '/imports/client/ui/framework/PrivateHeader'
import ChangePassword from '/imports/client/ui/framework/account/ChangePassword'
import Profile from '/imports/client/ui/framework/account/Profile'

export default () => {
  return (
    <div>
      <PrivateHeader title="Account Settings"/>
      <Row>
        <Col smOffset={3} sm={9} mdOffset={2} md={10}>
          <Profile title="Profile"/>
          <ChangePassword title="Change Password"/>
        </Col>
      </Row>
    </div>
  )
}
