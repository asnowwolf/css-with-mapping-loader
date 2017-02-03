/**
 * @see https://webpack.github.io/docs/loaders.html
 */
module.exports = function () {};

/**
 * @see https://webpack.github.io/docs/loaders.html#pitching-loader
 */
module.exports.pitch = function (remainingRequest) {
    this.cacheable && this.cacheable();

    var loaderUtils = require('loader-utils');
    return encode.toString() + '\n' +
        'var result = require(' + loaderUtils.stringifyRequest(this, "!!" + remainingRequest) + ');\n' +
        'if (typeof result === "string") {\n' +
        'module.exports = result;\n' +
        '} else {\n' +
        'module.exports = encode(result);\n' +
        '}\n';
};

function encode(content) {
    var cssObject = content[0];
    var cssContent = cssObject[1] || '';
    var cssMapping = cssObject[3];
    if (!cssMapping) {
        return cssContent;
    }
    var convertSourceMap = require('convert-source-map');
    var sourceMapping = convertSourceMap.fromObject(cssMapping).toComment({multiline: true});
    var sourceURLs = cssMapping.sources.map(function (source) {
        return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
    });
    return [cssContent].concat(sourceURLs).concat([sourceMapping]).join('\n');
}
