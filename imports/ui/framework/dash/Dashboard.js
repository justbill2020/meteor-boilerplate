import React from 'react'
import { Row, Col} from 'react-bootstrap'

import PrivateHeader from '/imports/ui/framework/PrivateHeader'

export default () => {
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
