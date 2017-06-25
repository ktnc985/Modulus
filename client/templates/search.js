Template.search.onCreated(() => {
  let template = Template.instance();

  template.searchQuery = new ReactiveVar(); //holds current value of search input
  template.searching = new ReactiveVar(false);
  template.regionField = new ReactiveVar();
  template.PUField = new ReactiveVar();

  template.autorun(() => {
    template.subscribe('modules', template.PUField.get(), template.regionField.get(), template.searchQuery.get(), () => {
      setTimeout(() => {
        template.searching.set(false);
      }, 300, );
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
    let modules = Modules.find();
    if (modules) {
      return modules;
    }
    return null;
  },

});

Template.search.events({
  'keyup [name="search"]'(event, template) {
    let value = event.target.value.trim();
    event.preventDefault();

    if (value !== '' && event.keyCode === 13) {
      template.searchQuery.set(value);
      template.searching.set(true);
    }

    if (value === '') {
      template.searchQuery.set(value);
    }
  },
  
  'change #regionID': function(event, template) {
    let selectedField = template.$("#regionID").val();
    template.regionField.set(selectedField);
  },
  'change #partnerUniID': function(event,template) {
    let selectedField = template.$("#partnerUniID").val();
    template.PUField.set(selectedField);
  },
});
