# should-be-unexpected

This is an attempt to implement a should.js facade using unexpected.
There is some incompatabilities, but only where we believe that our
behaviour is better than what is found in should.js.

Not all of the current API of should is implemented. I have taken a
few projects that I know of, already using should.js, and I am using
them to guide the work.

Projects whose test suites run with no errors:

 - [tj/commander.js](https://github.com/tj/commander.js)@v2.6.0

Projects whose tests are not yet fully running:

[tj/ejs](https://github.com/tj/ejs)@v1.0.0
Two tests are failing, due to .include and .match not being
implemented.  .match is at the point in time when these tests are
written a simple string regex match - now .match is an abomination
that does all sorts of magic. .include has since been removed from
should.js. I'm still considering what the right course of action would
be on this.

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

### 2. .containEql(otherValue)

The following would work in should.js.
```javascript
({ b: 10 }).should.containEql({ b: 10 });
```

But it doesn't in unexpected, as it does not define the assertion
'to contain' for the object type.
