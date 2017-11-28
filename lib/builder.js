const util = require('./util')

const Builder = function (options) {
  options = options || {}
  this.rootName = util.getDefault(options.rootName, 'root')
  const opts = options.renderOpts || {}
  this.pretty = util.getDefault(opts.pretty, true)
  this.indent = util.getDefault(opts.indent, '  ')
  this.newline = util.getDefault(opts.newline, '\n')
}

const TPL = '{indent}<{tag}>{wrap}{node}{wrap}{indent2}</{tag}>'

const proto = Builder.prototype

proto._build = function (obj, indentCount) {
  indentCount = indentCount || 0
  const arr = []
  const iteration = function (key, value) {
    const obj = {}
    obj[key] = value
    return this._build(obj, indentCount)
  }
  for (let key in obj) {
    let value = ''
    if (obj[key] instanceof Array) {
      value = obj[key].map(iteration.bind(this, key)).join(this.newline)
    } else {
      value = TPL.replace(/\{(\w+)\}/g, (function (all, keyname) {
        if (keyname === 'tag') {
          return key
        } else if (keyname === 'node') {
          if (typeof obj[key] === 'object') {
            return this._build(obj[key], indentCount + 1)
          }
          return obj[key]
        } else if (keyname === 'wrap') {
          if (typeof obj[key] === 'object') {
            return this.newline
          }
          return ''
        } else if (keyname === 'indent') {
          return this._getIndent(indentCount)
        } else if (keyname === 'indent2') {
          if (typeof obj[key] === 'object') {
            return this._getIndent(indentCount)
          }
          return ''
        }
      }).bind(this))
    }
    arr.push(value)
  }
  return arr.join(this.newline)
}

proto._getIndent = function (num) {
  let indent = ''
  for (let i = 0; i < num; i++) {
    indent += this.indent
  }
  return indent
}

proto.buildObject = function (obj) {
  const newObj = {}
  newObj[this.rootName] = obj
  return this._build(newObj)
}

module.exports = Builder