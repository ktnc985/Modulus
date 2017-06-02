
import { Mongo } from 'meteor/mongo';

export const Modules = new Mongo.Collection('Modules');

if (Meteor.isServer) {
  if (Modules.find().count() < 1) {
    [{ NUSModuleCode: 'CS1010E', PUModuleCode: 'FE1008' },
     { NUSModuleCode: 'CS1010F', PUModuleCode: 'FE1009' },
     { NUSModuleCode: 'CS1010G', PUModuleCode: 'FE1010' },
     { NUSModuleCode: 'CS1010H', PUModuleCode: 'FE1011' }]
    .forEach((module) => Modules.insert(module));
  }
}
/*
Modules = new Meteor.Collection( 'modules');

// collection2 package will validate data against the rules defined here before insertion
var ModulesSchema = new SimpleSchema({
	"NUSModuleCode": {
		type: String,
		defaultValue: "",
		label: "NUS Module Code"
	},
	"PUModuleCode": {
		type: String,
		defaultValue: "",
		label: "PU Module Code"
	},
	"ModuleName": {
		type: String,
		defaultValue: "",
		label: "Module Name"
	},
	"PUSyllabus": {
		type: String,
		defaultValue: "",
		label: "PU Syllabus"
	},
	"Link": {
		type: String,
		defaultValue: "",
		label: "Link"
	},
	"UniversityName": {
		type: String,
		defaultValue: "",
		label: "University Name"
	},
	"Region": {
		type: String,
		defaultValue: "",
		label: "Region"
	},
	"Similarity": {
		type: Number,
		defaultValue: 0,
		label: "Similarity"
	},
	"PrevMatch": {
		type: Boolean,
		defaultValue: false,
		label: "Previous Match"
	}
});

Modules.attachSchema( ModulesSchema );
*/