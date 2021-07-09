const {
  stripScript,
  genInlineComponentText,
  stripTemplate,
  stripStyle
} = require('./util')

const md = require('./config')
module.exports = function (source) {
  const content = md.render(source)
  const startTag = '<!--zeng-demo:'
  const startTagLen = startTag.length
  const endTag = ':zeng-demo-->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0
  const output = []
  const styles = []
  let start = 0

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    styles.push(stripStyle(commentContent))
    const demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `zeng-demo${id}`
    output.push(`<template slot="source"><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }
  // 仅允许在 demo 不存在时， 才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑

  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
     </script>
     <style lang="less">
       ${styles.join('')}
     </style>`
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }

  output.push(content.slice(start))

  return `
    <template>
      <section class="content zeng-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `
}
