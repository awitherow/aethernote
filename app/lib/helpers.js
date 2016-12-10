import Remarkable from 'remarkable'

export function convertToMarkdown(text) {
  let md = new Remarkable()
  return { __html: md.render(text) }
}

export function getYestereday() {
  return new Date(new Date() - (1000*60*60*24)).setHours(0, 0, 0, 0)
}

export function getToday() {
  return new Date().setHours(0, 0, 0, 0)
}
