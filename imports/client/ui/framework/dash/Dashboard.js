import React from 'react'
import { Row, Col} from 'react-bootstrap'

import PrivateHeader from '/imports/client/ui/framework/PrivateHeader'

export const DashboardComponent = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <Row>
        <Col smOffset={3} sm={9} mdOffset={2} md={10}>
          <p>Dashboard Content</p>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardComponent
