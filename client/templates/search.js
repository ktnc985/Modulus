Template.search.events({
  'submit form': function (event) {
    event.preventDefault();

  // Get value from form element
  // const target = event.target;
  // const text = target.text.value;
  Router.go('results');
  }
});
/*

an example of form submission

Template.addList.events({
  'submit form': function(event){
    event.preventDefault();
    var listName = $('[name=listName]').val();
    Lists.insert({
      name: listName
    }, function(error, results){
      Router.go('listPage', { _id: results });
    });
    $('[name=listName]').val('');
  }
});

*/
