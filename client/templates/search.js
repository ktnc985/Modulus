import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var requestedLimit = 10;

Template.search.onCreated(() => {

  const template = Template.instance();

  template.searchQuery = new ReactiveVar(); // holds current value of search input
  template.searching = new ReactiveVar(false);
  template.regionField = new ReactiveVar();
  template.PUField = new ReactiveVar();
  template.limit = new ReactiveVar(requestedLimit);

  template.autorun(() => {
    template.subscribe('modules', template.limit.get(), template.PUField.get(), template.regionField.get(), template.searchQuery.get(), () => {
      setTimeout(() => {
        template.searching.set(false);
      }, 300);
    });
  });
});

Template.search.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  modules() {
    const modules = Modules.find();
    if (modules) {
      return modules;
    }
    return null;
  },

});

Template.search.events({
  'keyup [name="search"]'(event, template) {
    const value = event.target.value.trim();
    event.preventDefault();

    if (value !== '' && event.keyCode === 13) {
      template.searchQuery.set(value);
      template.searching.set(true);
    }

    if (value === '') {
      template.searchQuery.set(value);
    }
    template.limit.set(requestedLimit);
  },
  'change #regionID': function(event, template) {
    const selectedField = template.$('#regionID').val();
    template.regionField.set(selectedField);
  },
  'change #partnerUniID': function(event, template) {
    const selectedField = template.$('#partnerUniID').val();
    template.PUField.set(selectedField);
  },
  'click .btn': function(event, template){
    template.limit.set(requestedLimit * 2);
  }
});
