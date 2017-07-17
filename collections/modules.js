import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Modules = new Mongo.Collection('modules');
NUSMods = new Mongo.Collection('nusmods');

if (Meteor.isServer) {
  Modules._ensureIndex({ NUSModuleCode: 1 });
  NUSMods._ensureIndex({ ModuleCode: 1 });
}

NUSMods.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

NUSMods.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

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

const NUSModsSchema = new SimpleSchema({
  ModuleCode: {
    type: String,
    defaultValue: '',
    label: 'NUS Module Code',
  },
  ModuleTitle: {
    type: String,
    defaultValue: '',
    label: 'NUS Module Title',
  },
  ModuleDescription: {
    type: String,
    defaultValue: '',
    label: 'NUS Module Description',
  },
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

NUSMods.attachSchema(NUSModsSchema);
Modules.attachSchema(ModulesSchema);

if (Modules.find().count() === 0) {
  const data = JSON.parse(Assets.getText('NTUComparisons.json'));
  data.forEach((module) => { Modules.insert(module); });
}

if (NUSMods.find().count() === 0) {
  const data = JSON.parse(Assets.getText('NUS_SOC_MODS.json'));
  data.forEach((module) => { NUSMods.insert(module); });
}