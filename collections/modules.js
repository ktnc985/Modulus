Modules = new Mongo.Collection('modules');

if (Meteor.isServer) {
  Modules._ensureIndex({ NUSModuleCode: 1});
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

let ModulesSchema = new SimpleSchema({
  'NUSModuleCode': {
    type: String,
    defaultValue: '',
    label: 'NUS Module Code',
  },
  'PUModuleCode': {
    type: String,
    defaultValue: '',
    label: 'PU Module Code',
  },
  'ModuleName': {
    type: String,
    defaultValue: '',
    label: 'Module Name',
  },
  'PUSyllabus': {
    type: String,
    defaultValue: '',
    label: 'PU Syllabus',
  },
  'Link': {
    type: String,
    defaultValue: '',
    label: 'Link',
  },
  'UniversityName': {
    type: String,
    defaultValue: '',
    label: 'University Name',
  },
  'Region': {
    type: String,
    defaultValue: '',
    label: 'Region',
  },
  'Similarity': {
    type: Number,
    defaultValue: 0,
    label: 'Similarity',
  },
  'PrevMatch': {
    type: Boolean,
    defaultValue: false,
    label: 'Previous Match',
  },
});

Modules.attachSchema(ModulesSchema);

/*
Meteor.startup(function() {
  if (Modules.find().count() === 0) {
    [{ NUSModuleCode: 'CS1010E', PUModuleCode: 'FE1008', ModuleName: 'A', PUSyllabus: 'a', Link: 'www.a.com', UniversityName: 'UniA', Region: 'Southeast Asia', Similarity: 50, PrevMatch: true },
     { NUSModuleCode: 'CS1010F', PUModuleCode: 'FE1009', ModuleName: 'B', PUSyllabus: 'b', Link: 'www.b.com', UniversityName: 'UniB', Region: 'Southeast Asia', Similarity: 65, PrevMatch: false },
     { NUSModuleCode: 'CS1010G', PUModuleCode: 'FE1010', ModuleName: 'C', PUSyllabus: 'c', Link: 'www.c.com', UniversityName: 'UniC', Region: 'Others', Similarity: 40, PrevMatch: true },
     { NUSModuleCode: 'CS1010H', PUModuleCode: 'FE1011', ModuleName: 'D', PUSyllabus: 'd', Link: 'www.d.com', UniversityName: 'UniD', Region: 'Others', Similarity: 0, PrevMatch: false }]
    .forEach((module) => { Modules.insert(module); });
  }
});
*/

if (Modules.find().count() === 0) {
  var data = JSON.parse(Assets.getText("NTUComparisons.json"));
  data.forEach((module) => { Modules.insert(module); });
}
