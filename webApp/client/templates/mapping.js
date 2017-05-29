import { Template } from 'meteor/templating';
 
import { Modules } from '../../collections/modules.js';

import { Meteor } from 'meteor/meteor';

Template.results.onCreated(function(){
	Meteor.subscribe('modules');
});

Template.results.helpers({
  modules() {
  	console.log(Modules.find({}));
    return Modules.find({});
  },

  number:function(module){
  	console.log("hihi");
  	console.log(module.NUSModuleCode);
  	return '\"' + module.NUSModuleCode + '\"';
  },

  id:function(module){
  	return ('\"#' + module.NUSModuleCode + '\"');
  },

  print:function(module){
  	console.log(module);
  	console.log(module.NUSModuleCode);
  }
});