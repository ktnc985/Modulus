import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';


Meteor.publish('modules', function(startUp, limit, PUField, regionField, search) {
  check(search, Match.OneOf(String, null, undefined));
  check(regionField, Match.OneOf(String, null, undefined));
  check(PUField, Match.OneOf(String, null, undefined));
  check(limit, Match.OneOf(Number));
  check(startUp, Match.OneOf(Boolean, undefined));

  if (startUp === true) {
    return null;
  }
  
  let query = {}, regex = new RegExp('');
  const projection = {limit: limit, sort: {PrevMatch: -1, Similarity: -1, created: 1}};
  // sort in descending order according to Similarity field
  if (search) {
    regex = new RegExp(`^`+search+`$`, 'i'); //search for PU modules that are mapped exactly to the NUS module code entered by user

    if (PUField) {
      query['UniversityName'] = PUField;
    }

    if (regionField) {
      query['Region'] = regionField;
    }

    query['NUSModuleCode'] = regex;
  }

  Counts.publish(this, 'results-counter', Modules.find(query, projection));

  return [NUSMods.find({'ModuleCode': regex}), Modules.find(query, projection)];
});
