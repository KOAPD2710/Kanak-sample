import * as prismic from '@prismicio/client'

const repositoryName = 'kanak-sample'
const accessToken = 'MC5aY25QeVJBQUFDSUF2a3Ez.77-9OGBebe-_ve-_vVp277-9Ze-_ve-_vSfvv73vv711eEAB77-9eQpq77-977-9Vu-_vQDvv71s77-9'
const routes = [
  // Update to match your website's URL structure
  // { type: 'page', path: '/:uid' },
  { type: 'home', path: '/' },
]
const client = prismic.createClient(repositoryName)

export function getPage(slug) {
  return client.getSingle(slug)
}
export function getByUID(customType, uid) {
  return client.getByUID(customType, uid)
}
export function getAllByType(customType) {
  return client.getAllByType(customType)
}

export const htmlSerializer = {
  highlight: ({ children }) => `<span class="txt-green">${children}</span>`
}

