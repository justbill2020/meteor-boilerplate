import {Mongo} from 'meteor/mongo';
import SampleSchema from './schema'

export const Samples = new Mongo.Collection('samples')

Samples.attachSchema(SampleSchema)

export default Samples;