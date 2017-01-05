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

export const toTitleCase = (str) =>
  str.replace(/\w\S*/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )

export const isMobile = true && window.innerWidth <= 500

export const sortByCategoryAndId = (entries) => entries.sort((a, b) => {
  if (a.category < b.category) return 1
  if (a.category > b.category) return -1
  // if the categories are equal, it will sort by id.
  if (a.id < b.id) return 1
  if (a.id > b.id) return -1
  return 0
})
