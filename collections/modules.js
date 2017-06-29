import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Modules = new Mongo.Collection('modules');

if (Meteor.isServer) {
  Modules._ensureIndex({ NUSModuleCode: 1 });
}

Modules.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Modules.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const ModulesSchema = new SimpleSchema({
  NUSModuleCode: {
    type: String,
    defaultValue: '',
    label: 'NUS Module Code',
  },
  PUModuleCode: {
    type: String,
    defaultValue: '',
    label: 'PU Module Code',
  },
  ModuleName: {
    type: String,
    defaultValue: '',
    label: 'Module Name',
  },
  PUSyllabus: {
    type: String,
    defaultValue: '',
    label: 'PU Syllabus',
  },
  Link: {
    type: String,
    defaultValue: '',
    label: 'Link',
  },
  UniversityName: {
    type: String,
    defaultValue: '',
    label: 'University Name',
  },
  Region: {
    type: String,
    defaultValue: '',
    label: 'Region',
  },
  Similarity: {
    type: Number,
    defaultValue: 0,
    label: 'Similarity',
  },
  PrevMatch: {
    type: Boolean,
    defaultValue: false,
    label: 'Previous Match',
  },
});

Modules.attachSchema(ModulesSchema);

if (Modules.find().count() === 0) {
  const data = JSON.parse(Assets.getText('NTUComparisons.json'));
  data.forEach((module) => { Modules.insert(module); });
}
