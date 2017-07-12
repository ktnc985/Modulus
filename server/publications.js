import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';


Meteor.publish('modules', function(PUField, regionField, search) {
  check(search, Match.OneOf(String, null, undefined));
  check(regionField, Match.OneOf(String, null, undefined));
  check(PUField, Match.OneOf(String, null, undefined));

  let query = {};
  const projection = { limit: 10, sort: [['PrevMatch', 'desc'], ['Similarity', 'desc']] };
  // sort in descending order according to Similarity field
  if (search) {
    let regex = new RegExp(`^`+search+`$`, 'i'); //search for PU modules that are mapped exactly to the NUS module code entered by user

    if (PUField) {
      query['UniversityName'] = PUField;
    }

    if (regionField) {
      query['Region'] = regionField;
    }

    query['NUSModuleCode'] = regex;

    projection.limit = 100;
  }

  return Modules.find(query, projection);
});
