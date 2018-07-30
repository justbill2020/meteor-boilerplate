import {Samples, Users} from '/imports/db';

Users.addLinks({
  samples: {
    collection: Samples,
    inversedBy: 'owner'
  }
})

