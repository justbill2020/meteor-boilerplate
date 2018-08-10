import React from 'react'
import { Row, Col, PageHeader} from 'react-bootstrap'

import PrivateHeader from '/imports/client/ui/framework/PrivateHeader'
import InviteDetails from '/imports/client/ui/framework/invites/InviteDetails'
export default () => {
  return (
    <div>
      <PrivateHeader title="Invitation Management"/>
      <Row>
        <Col smOffset={3} sm={6} mdOffset={2} md={8}>
          <PageHeader>Current Users</PageHeader>
          <InviteDetails/>
        </Col>
      </Row>
    </div>
  )
}
