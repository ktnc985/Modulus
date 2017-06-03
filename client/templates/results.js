import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Modules } from '../../collections/modules.js';

Template.results.onCreated(function() {
  Meteor.subscribe('modules');
});

Template.results.helpers({
  modules() {
    return (Modules.find({}));
  },

  number(module) {
    return (`"${module.NUSModuleCode}"`);
  },

  id(module) {
    return (`"#${module.NUSModuleCode}"`);
  },

  print(module) {
    console.log(module);
    console.log(module.NUSModuleCode);
  },
});
