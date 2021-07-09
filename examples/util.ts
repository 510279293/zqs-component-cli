export function stripScript (content: any) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle (content: any) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripTemplate (content: any) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

export function iconsCssToJson (str: string) {
  const reg = new RegExp(/{[^}]*}/g)
  const result = str.replaceAll(reg, '').replace(/:before/g, '').replace(/.z-icon-/g, '').replace(/\n/g, '')
  console.log(result.split(' '))
  return result
}
