import { Template } from 'meteor/templating';

Template.startUp.helpers({
	sample() {
		var data = {
    "NUSModuleCode": "ss1234",
    "PUModuleCode": "ModuleCode",
    "ModuleName": "Module Name",
    "Link": "https://nusmodulus.herokuapp.com/",
    "UniversityName": "University Name",
    "Region": "Region",
    "PUSyllabus": "Module syllabus/description",
    "Similarity": 50,
    "PrevMatch": true
  }
  return data;
	}
});