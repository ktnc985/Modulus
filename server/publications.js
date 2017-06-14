Meteor.publish('modules', function(search) {
  check(search, Match.OneOf(String, null, undefined));

  let query = {};
  let projection = { limit: 10, sort: { NUSModuleCode: 1 } };

  if (search) {
    let regex = new RegExp(search, 'i');

    query = {
      $or: [
        { NUSModuleCode: regex },
        { PUModuleCode: regex },
        { UniversityName: regex },
      ],
    };

    projection.limit = 100;
  }

  return Modules.find(query, projection);
});
