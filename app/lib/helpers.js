import Remarkable from 'remarkable'

export function convertToMarkdown(text) {
  let md = new Remarkable()
  return { __html: md.render(text) }
}

export function getYestereday() {
  let date = new Date()
  date.setDate(date.getDate -1)
  date.setHours(0, 0, 0, 0)
  return date
}

export function getToday() {
  return new Date().setHours(0, 0, 0, 0)
}
