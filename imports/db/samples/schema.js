import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  _id: SimpleSchema.oneOf(String, SimpleSchema.RegEx.Id),
  description: String,
  createdAt: Date,
  updatedAt: Date,
  ownerId: SimpleSchema.RegEx.Id
})