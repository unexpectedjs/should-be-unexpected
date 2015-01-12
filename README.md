# should-be-unexpected

## Incompatabilities

### 1. .eql(otherValue)

The following would be okay in should.js.

```javascript
[1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 });
```

You can turn that behavior off, by enabling the following
configuration option in should.js.

```javascript
should.config.checkProtoEql = true;
```

Unexpected behaves as `checkProtoEql` is true per default, and it
cannot be changed. This is a very concious choice.
