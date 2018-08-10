import {Samples, Users} from '/imports/db';

Samples.addLinks({
  owner: {
    type: 'one',
    collection: Users,
    field: 'ownerId'
  }
})

