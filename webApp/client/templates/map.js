import { Template } from 'meteor/templating';

Template.mapping.helpers({
	id:function(code) {
		return ('#' + code);
	},

	number:function(code) {
		return (code);
	}
});