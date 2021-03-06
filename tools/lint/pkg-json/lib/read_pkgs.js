'use strict';

// MODULES //

var debug = require( 'debug' )( 'lint:pkg-json:read-pkgs' );
var readJSON = require( '@stdlib/fs/read-json' );
var isValid = require( './../../../pkg-json/validate' );


// MAIN //

/**
* Reads and lints `package.json` files.
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
	out = [];
	i = -1;

	next();

	/**
	* Processes the next `package.json` file.
	*
	* @private
	*/
	function next() {
		i += 1;
		debug( 'Processing file %d of %d: %s', i+1, total, files[ i ] );
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
		var bool;
		var j;

		j = i + 1;
		if ( error ) {
			debug( 'Encountered an error reading file: %s (%d of %d). Error: %s', files[ i ], j, total, error.message );
			out.push({
				'file': files[ i ],
				'errors': [
					{
						'message': error.message
					}
				]
			});
		} else {
			debug( 'Successfully read file: %s (%d of %d).', files[ i ], j, total );

			debug( 'Validating file.' );
			bool = isValid( json );
			if ( bool ) {
				debug( 'File is valid.' );
			} else {
				debug( 'File is invalid: %s.', JSON.stringify( isValid.errors ) );
				out.push({
					'file': files[ i ],
					'errors': isValid.errors
				});
			}
		}
		if ( j < total ) {
			debug( 'Processed %d of %d files.', j, total );
			return next();
		}
		debug( 'Processed all files.' );
		return done();
	} // end FUNCTION onRead()

	/**
	* Callback invoked upon completion.
	*
	* @private
	*/
	function done() {
		if ( out.length ) {
			clbk( null, out );
		} else {
			clbk( null, null );
		}
	} // end FUNCTION done()
} // end FUNCTION readPkgs()


// EXPORTS //

module.exports = readPkgs;
