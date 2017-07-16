import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';


Meteor.publish('modules', function(limit, PUField, regionField, search) {
  check(search, Match.OneOf(String, null, undefined));
  check(regionField, Match.OneOf(String, null, undefined));
  check(PUField, Match.OneOf(String, null, undefined));

  let query = {};
  const projection = {limit: limit, sort: {PrevMatch: -1, Similarity: -1, created: 1}};
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
  }

  return Modules.find(query, projection);
});
