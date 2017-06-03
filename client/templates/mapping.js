import { Template } from 'meteor/templating';

Template.mapping.helpers({
  id(code) {
    return (`#${code}`);
  },

  number(code) {
    return (code);
  },
});
