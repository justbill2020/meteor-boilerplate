import Samples from '../collection'

export default Samples.createQuery('getSample', {
  $filter({filters, params}) {
    filters._id = params._id
  },
  description:1,
  organizationId: 1,
  user: {profile: 1},
  steps: {
    $options: {
      sort: {
        order: 1
      }
    },
    _id:1,
    description:1,
    sampleId: 1,
    order:1,
    tasks: {
      $options: {
        sort: {
          order: 1
        }
      },
      _id:1,
      description:1,
      stepId: 1,
      order:1,
      type:1,
      data: 1,
    }
  }
})