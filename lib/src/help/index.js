var help = function () {
    'use strict';
    var i;

    if ( this._options && this._options.length > 0 ) {
        var helpText = this._config.help[ this._options[ 0 ] ];
        if ( helpText ) {
            console.log( helpText );
        } else {
            console.log( 'No help for that command' );
        }
        return;
    }

    var keys = Object.keys( this._config.help );

    for ( i = 0; i < keys.length; i++ ) {
        console.log( '%s:\n' + this._config.help[ keys[ i ] ] + '\n', keys[ i ] );
    }
};

module.exports = help;