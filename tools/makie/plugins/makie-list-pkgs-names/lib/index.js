'use strict';

// MODULES //

var spawn = require( 'child_process' ).spawn;


// FUNCTIONS //

/**
* Callback invoked upon encountering an error.
*
* @private
* @param {Error} error - error object
*/
function onError( error ) {
	process.stderr.write( error.message+'\n', 'utf8' );
	return process.exit( 1 );
} // end FUNCTION onError()

/**
* Callback invoked upon child process close.
*
* @private
* @param {number} code - exit code
*/
function onFinish( code ) {
	if ( code !== 0 ) {
		process.stderr.write( '`make` process exited with code `'+code + '.\n' );
		return process.exit( code );
	}
	// Cannot write to `stdout` and then immediately `exit` as `buffer` may not yet have drained https://github.com/nodejs/node/issues/6456.
	// process.exit( 0 );

	// HACK: workaround is to use `console.log` and no exit:
	console.log( '' );
} // end FUNCTION onFinish()

/**
* Callback invoked upon receiving data from `stdout`.
*
* @private
* @param {Buffer} data - standard output
*/
function stdout( data ) {
	process.stdout.write( data );
} // end FUNCTION stdout()

/**
* Callback invoked upon receiving data from `stderr`.
*
* @private
* @param {Buffer} data - standard error
*/
function stderr( data ) {
	process.stderr.write( data );
} // end FUNCTION stderr()


// PLUGIN //

/**
* `makie` plugin to list packages.
*
* @param {string} dir - Makefile directory
* @param {string} cwd - current working directory
* @param {string} subpath - subdirectory path
*/
function plugin( dir, cwd ) {
	var opts;
	var args;
	var proc;

	opts = {};
	opts.cwd = dir;

	args = [];
	args.push( 'PACKAGES_DIR='+cwd );

	// Target:
	args.push( 'list-pkgs-names' );

	proc = spawn( 'make', args, opts );
	proc.on( 'error', onError );
	proc.stdout.on( 'data', stdout );
	proc.stderr.on( 'data', stderr );
	proc.on( 'close', onFinish );
} // end FUNCTION plugin()


// EXPORTS //

module.exports = plugin;