const assert = require('assert')
const Builder = require('../lib/builder')
const builder = new Builder()

describe('test builder.js', function () {
  describe('test buildObject()', function () {
    it('test normal', function () {
      const obj = { name: 'xiaobai', age: 12, isVip: true }
      const xml = 
`<root>
  <name>xiaobai</name>
  <age>12</age>
  <isVip>true</isVip>
</root>`
      assert.equal(builder.buildObject(obj), xml)
    })
    it('if has object and array', function () {
      const obj = {
        users: [
          {
            name: 'xiaobai',
            age: 11,
            hobby: ['football', 'basketball']
          },
          {
            name: 'xiaohong',
            age: 12,
            hobby: ['badminton']
          }
        ]
      }
      const xml = 
`<root>
  <users>
    <name>xiaobai</name>
    <age>11</age>
    <hobby>football</hobby>
    <hobby>basketball</hobby>
  </users>
  <users>
    <name>xiaohong</name>
    <age>12</age>
    <hobby>badminton</hobby>
  </users>
</root>`
      assert.equal(builder.buildObject(obj), xml)
    })
  })
})