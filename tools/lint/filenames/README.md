# Lint Filenames

> Lint filenames.


<section class="usage">

## Usage

``` javascript
var lint = require( '@stdlib/tools/lint/filenames' );
```

#### lint( \[options,\] clbk )

Asynchronously lints filenames.

``` javascript
lint( onLint );

function onLint( error, names ) {
    if ( error ) {
        throw error;
    }
    console.log( JSON.stringify( filenames ) );
}
```

The function accepts the following `options`:

* __dir__: root directory from which to search for files. May be either an absolute or relative directory path. Default: current working directory.
* __pattern__: filename pattern. Default: `'**/*'`.

To search from a specific directory, set the `dir` option.

``` javascript
var opts = {
    'dir': './'
};

lint( opts, onLint );

function onLint( error, names ) {
    if ( error ) {
        throw error;
    }
    console.log( JSON.stringify( names ) );
}
```

To limit the filename search to a subset of files, set the `pattern` option.

``` javascript
var opts = {
    'pattern': '**/*.js'
};

lint( opts, onLint );

function onLint( error, names ) {
    if ( error ) {
        throw error;
    }
    console.log( JSON.stringify( names ) );
}
```


#### lint.sync( \[options\] )

Synchronously lints filenames.

``` javascript
var names = lint.sync();
// returns [...]
```

The function accepts the same `options` as `lint()` above.

</section>

<!-- /.usage -->


<section class="notes">

## Notes

* If all filenames are valid, the returned result is an empty `array`.

* Each failure is returned as an `object` with the following properties:

  - __name__: filename.
  - __error__: reason for failure.

  ``` text
  {
      "name": "path/to/failing/filename.abc",
      "error": "filename must be lowercase."
  }
  ```

* Only filenames which fail are returned.


</section>

<!-- /.notes -->


<section class="examples">

## Examples

``` javascript
var lint = require( '@stdlib/tools/lint/filenames' );

lint( onLint );

function onLint( error, names ) {
    if ( error ) {
        throw error;
    }
    console.log( JSON.stringify( names ) );
}
```

</section>

<!-- /.examples -->


---

<section class="cli">

## CLI

<section class="usage">

### Usage

``` bash
Usage: lint-filenames [options]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --dir dirname         Root directory from which to search.
         --pattern pattern     Pattern to match files for linting.
```

</section>

<!-- /.usage -->


<section class="notes">

### Notes

* Filenames which fail are printed to `stderr` as newline-delimited JSON ([NDJSON][ndjson]).

</section>

<!-- /.notes -->


<section class="examples">

### Examples

``` bash
$ lint-filenames
{...}
{...}
...
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->


<section class="links">

[ndjson]: http://ndjson.org/

</section>

<!-- /.links -->
