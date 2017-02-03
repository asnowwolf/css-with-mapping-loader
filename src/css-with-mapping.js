/**
 * @see https://webpack.github.io/docs/loaders.html
 */
module.exports = function (content) {
    if (!content || content.length !== 1) {
        throw new Error('The css-with-mapping-loader must be chained after the css-loader');
    }
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
};