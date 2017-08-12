import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';

// limit number of results loaded each time to requestedLimit
let requestedLimit = 10;
// increase number of results displayed by incr each time 'Load more' button is clicked
const incr = 10;

Template.search.onCreated(function() {
  const template = Template.instance();

  template.searchQuery = new ReactiveVar(); // stores current value of search input
  template.searching = new ReactiveVar(false);
  template.regionField = new ReactiveVar(); // stores value of option selected in the Region filter
                                            // field
  template.PUField = new ReactiveVar(); // stores value of option selected in the PU filter field
  template.limit = new ReactiveVar(requestedLimit);
  template.startUp = new ReactiveVar(true); // stores the state of the site to decide when to load
                                            // start up page with instructions
  template.hasMods = new ReactiveVar();
  template.visibility = new ReactiveVar(false);
  template.module = new ReactiveVar(null);  // stores module information of the NUS module selected
                                            // in the search box

  template.autorun(function() {
    template.subscribe('modules', template.startUp.get(), template.limit.get(), template.PUField.get(), template.regionField.get(), template.searchQuery.get(), function() {
      setTimeout(function() { // ensure that loading icon is displayed for at least
                              // 300 milliseconds before results list is revealed
        template.searching.set(false);
      }, 300);
    });
    template.subscribe('nusmods');
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
  },
  settings() {
    return {
      position: 'bottom', // display autocomplete menu at the bottom of search box
      limit: 5, // limit number of options displayed in autocomplete menu
      rules: [
        {
          collection: NUSMods,
          field: 'ModuleCode',
          template: Template.eachItem,
          noMatchTemplate: Template.noMatch,
        },
      ],
    };
  },
  getMod() {
    return Template.instance().module.get();
  },
});

Template.search.events({
  'autocompleteselect input'(event, template, doc) {
    if (doc !== undefined) {
      const value = doc.ModuleCode;
      if (value !== '' && !_.isEqual(doc, template.module.get())) { // starts a search when text is entered and prevents infinite loading
        template.searchQuery.set(value);
        template.searching.set(true);
        template.startUp.set(false);
        template.module.set(doc);
      }

      if (value === '') {
        template.searchQuery.set(value);
        template.startUp.set(true);
      }

      requestedLimit = 10;
      template.limit.set(requestedLimit);
    }
  },
  'change #regionID'(event, template) {
    const selectedField = template.$('#regionID').val();
    template.regionField.set(selectedField);
  },
  'change #partnerUniID'(event, template) {
    const selectedField = template.$('#partnerUniID').val();
    template.PUField.set(selectedField);
  },
  'click .btn-block'(event, template) {
    let count = Counts.get('results-counter');

    if (count % 10 !== 0) {
      count = count - (count % 10) + 10;
    }

    if (count > requestedLimit) { // if there are more results to display
      requestedLimit += incr;
      template.limit.set(requestedLimit);
    }
    else {
      template.hasMods.set(false);
    }
  },
  'click .toggleFilter'(event, template) {
    template.visibility.set(!template.visibility.get());
  },
});

