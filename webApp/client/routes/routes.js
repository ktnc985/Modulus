
/*
// NUSModCode and PUModCode are parameters of a single module
Router.route( 'modules/:modCode/PUModCode', function() {
  var modCode   = this.params.modCode,
      query  = this.request.query,
      fields = {};
  // taking the query parameters passed with the GET request (in this case, just one field) and 
  // dynamically creating a MongoDB projection to pass to our findOne query
  fields[ query.field ] = query.field;
  
  //have to change findOne mtd in later stages to find any mods abv 50% match 
  var getMod = Meteor.users.findOne( { "PUModCode.NUSModuleCode": modCode }, { fields: fields } ); 
  
  if ( getMod ) {
    this.response.statusCode = 200;
    this.response.end( getMod.PUModCode );
  } else {
    this.response.statusCode = 404;
    this.response.end( { status: "404", message: "Module not found." } );
  }
}, { where: "server" });

/*
//From meteor chef, doesn't work

Router.route( 'index', {
  path: '/',
  template: 'index',
  onBeforeAction: function(){
    Session.set( 'currentRoute', 'index' );
    this.next();
  }
});

*/

Router.route('/', {
  template: 'index'
});


Router.route('results', {
  template: 'results'
});

/*
From meteor tut, it works

Router.route('/', function () {
  this.render('index');
});


Router.route( '', {
  path: '/',
  template: '',
  onBeforeAction: function(){
    Session.set( 'currentRoute', '' );
    this.next();
  }
});
*/