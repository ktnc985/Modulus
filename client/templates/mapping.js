import { Template } from 'meteor/templating';

Template.mapping.helpers({
  id(code) {
    return (`#${code}`);
  },
  wasPrevMatch(boolValue) {
    if (boolValue) {
      return true;
    }
    return false;
  },
});
