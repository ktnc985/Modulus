import { Meteor } from 'meteor/meteor';
import { Modules } from '../collections/modules.js';

Meteor.publish('modules', function() {
  return Modules.find();
});