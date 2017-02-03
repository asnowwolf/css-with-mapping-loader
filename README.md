# css-with-mapping loader for webpack

## Usage

```js
var result = require('css-with-mapping-loader!css-loader!sass-loader!./test.scss');
// => returns sass rendered to CSS with /*# sourceURL=... */ and /*# sourceMappingURL=... */.
```

## Use Case

In some cases (e.g. Angular2 [Component Styles](https://angular.io/docs/ts/latest/guide/component-styles.html)) you need to have style as a string.

You can cast the require output to a string, e.g.

```typescript
@Component({
    selector: 'my-css-test',
    template: '<div>some content</div>',
    styles: [
        require('css-with-mapping!css!sass!./test.scss') // Of course, you will certainly configure the loader in the webpack configuration
    ]
})
```

** Note that the current version of Angular (2.4.5) will lose the sourceURL and sourceMappingURL comment, so unless you patch the code for Angular, otherwise the loader will not work properly. Follow Pull Request https://github.com/angular/angular/pull/14175 for more information **