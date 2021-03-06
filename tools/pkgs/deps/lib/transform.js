'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();


// MAIN //

/**
* Transforms raw package dependency results by de-duplicateing file package dependencies.
*
* @private
* @param {ObjectArray} results - dependency results
* @returns {Object} transformed results
*/
function transform( results ) {
	var deps;
	var out;
	var i;
	var j;

	out = {
		'files': [],
		'deps': {}
	};
	for ( i = 0; i < results.length; i++ ) {
		out.files.push( results[ i ].file );
		deps = results[ i ].deps;
		for ( j = 0; j < deps.length; j++ ) {
			out.deps[ deps[ j ] ] = true;
		}
	}
	out.deps = getKeys( out.deps ).sort();
	return out;
} // end FUNCTION transform()


// EXPORTS //

module.exports = transform;
