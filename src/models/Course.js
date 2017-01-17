var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Course Model
 * ==========
 */

var Course = new keystone.List('Course');

Course.add({
    name: {
        type: String,
        required: true
    },
    published: {
        type: Types.Boolean,
    }
});

Course.register();
