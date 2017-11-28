### Parser

#### new Parser([options])

- `options` \<Object\> 配置对象
  - `trim` \<boolean\> 去除文本节点头尾的空格。默认为 `false` 。
  - `normalize` \<boolean\> 去除文本节点内的空格。默认为 `false` 。
  - `normalizeTags` \<boolean\> 将所有标签名转成小写字母。默认为 `false` 。
  - `ignoreAttrs` \<boolean\> 忽略属性节点。默认为 `false` 。
  - `attrkey` \<string\> 设置属性节点的字段名。默认为 `$` 。
  - `charkey` \<string\> 设置文本节点的字段名。默认为 `_` 。
  - `explicitArray` \<boolean\> 保存子元素为数组。默认为 `true` 。当设置为 `false` ，只有出现多个相同标签名的子元素时才合并成数组。

### parseString

解析 `xml` 数据为对象。

- `xml` \<string\> 

```javascript
const xmlParser = new Parser({ explicitArray: false })
const xml = `
  <user>
    <name>xiaobai</name>
    <age>12</age>
  </user>
  <user>
    <name>xiaohong</name>
    <age>11</age>
  </user>
  <count>2</count>
`
const result = xmlParser.parseString(xml)
/**
{
  user: [
    {
      name: 'xiaobai',
      age: '12'
    },
    {
      name: 'xiaohong',
      age: '11'
    }
  ],
  count: '2'
}
*/
```

