import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var requestedLimit = 10;
var incr = 10;

Template.search.onCreated(function() {

  const template = Template.instance();

  template.searchQuery = new ReactiveVar(); // holds current value of search input
  template.searching = new ReactiveVar(false);
  template.regionField = new ReactiveVar();
  template.PUField = new ReactiveVar();
  template.limit = new ReactiveVar(requestedLimit);
  template.startUp = new ReactiveVar(true);
  template.hasMods = new ReactiveVar();
  template.visibility = new ReactiveVar(true);

  template.autorun(function() {
    template.subscribe('modules', template.startUp.get(), template.limit.get(), template.PUField.get(), template.regionField.get(), template.searchQuery.get(), function() {
      setTimeout(function() {
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
  noSearch() {
    return Template.instance().startUp.get();
  },
  nusmods() {
    const NUSModule = NUSMods.find();
    if (NUSModule) {
      return NUSModule;
    }
    return null;
  },
  hasModules() {
    return Template.instance().hasMods.get();
  },
  notToLoadMore() {
    Template.instance().hasMods.set(false);
  },
  toLoadMore() {
    Template.instance().hasMods.set(true);
  },
  filterVisibility() {
    return Template.instance().visibility.get();
  }
});

Template.search.events({
  'keyup [name="search"]'(event, template) {
    const value = event.target.value.trim();
    event.preventDefault();

    if (value !== '' && event.keyCode === 13) {
      template.searchQuery.set(value);
      template.searching.set(true);
      template.startUp.set(false);
    }

    if (value === '') {
      template.searchQuery.set(value);
      template.startUp.set(true);
    }

    requestedLimit = 10;
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
    let count = Counts.get('results-counter');
    
    if (count % 10 != 0) {
        count = count - (count % 10) + 10;
    }
    if (count > requestedLimit) {
      requestedLimit += incr;
      template.limit.set(requestedLimit);
    }
    else {
      template.hasMods.set(false);
    }
  },
  'click .toggleFilter': function(event, template){
      template.visibility.set(!template.visibility.get());
  },
});

