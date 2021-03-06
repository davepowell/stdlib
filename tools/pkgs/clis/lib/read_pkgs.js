'use strict';

// MODULES //

var debug = require( 'debug' )( 'pkgs:clis:read-pkgs' );
var resolve = require( 'path' ).resolve;
var getKeys = require( 'object-keys' ).shim();
var readJSON = require( '@stdlib/fs/read-json' );
var isString = require( '@stdlib/utils/is-string' ).isPrimitive;
var hasOwnProp = require( '@stdlib/utils/has-own-property' );


// MAIN //

/**
* Reads `package.json` files and resolves paths to referenced package command-line interfaces.
*
* @private
* @param {StringArray} files - list of `package.json` files
* @param {Callback} clbk - callback to invoke upon completion
*/
function readPkgs( files, clbk ) {
	var total;
	var out;
	var i;

	total = files.length;
	i = -1;
	out = [];

	next();

	/**
	* Reads the next `package.json` file.
	*
	* @private
	*/
	function next() {
		i += 1;
		debug( 'Reading package %d of %d: %s', i+1, total, files[ i ] );
		readJSON( files[ i ], onRead );
	} // end FUNCTION next()

	/**
	* Callback invoked upon reading a `package.json` file.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Object} json - JSON object
	*/
	function onRead( error, json ) {
		var fpath;
		var keys;
		var j;
		var k;

		j = i + 1;
		if ( error ) {
			debug( 'Encountered an error reading file: %s (%d of %d). Error: %s', files[ i ], j, total, error.message );
			return done( error );
		}
		debug( 'Successfully read file: %s (%d of %d).', files[ i ], j, total );

		if ( isString( json.bin ) ) {
			fpath = resolve( files[ i ], json.bin );
			debug( 'Resolved %s.', fpath );
			out.push( fpath );
		} else if ( hasOwnProp( json, 'bin' ) ) {
			debug( 'Resolving CLI paths...' );
			keys = getKeys( json.bin );
			for ( k = 0; k < keys.length; k++ ) {
				fpath = json.bin[ keys[k] ];
				fpath = resolve( files[ i ], fpath );
				debug( 'Resolved %s.', fpath );
				out.push( fpath );
			}
			debug( 'Finished resolving CLI paths.' );
		}
		if ( j < total ) {
			debug( 'Read %d of %d files.', j, total );
			return next();
		}
		debug( 'Successfully read all files.' );
		return done();
	} // end FUNCTION onRead()

	/**
	* Callback invoked upon reading all files.
	*
	* @private
	* @param {(Error|null)} error - error object
	*/
	function done( error ) {
		if ( error ) {
			return clbk( error );
		}
		clbk( null, out );
	} // end FUNCTION done()
} // end FUNCTION readPkgs()


// EXPORTS //

module.exports = readPkgs;
