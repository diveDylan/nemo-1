import { Options } from './index.d'
import * as queryString from 'query-string'

/**
 * @description default request
 * *  cookies always set in request headers when http reponse headers has set-cookie 
 * *  TODO:  auth functions 
 */
export async function request<T>(options: Options): Promise<T>{
  const input = getUrl(options.url, options.query)
  const params = {
    method: options.method || 'GET',
    body: getRequestBody(options),
    headers: getHeaders(options),
    signal: options.signal
  }
  const res: T = await fetch(
    input, 
    params
  ).then(res => res.json())
  return res
}

export function getUrl(url: string, query: Options['query']) {
  return query ? url + '?' + queryString.stringify(query) : url
}

export function isString(value: any): value is String {
  return typeof value === 'string'
}

export function isBlob(value: any): value is Blob {
  return value instanceof Blob
}

export function getHeaders(options:Options ): Headers {
  const headers = new Headers({
    Accept: 'application/json',
    ...options.headers
  })
  if (options.body) {
    if (isBlob(options.body)) {
      headers.append('Content-Type', 'application/octet-stream')
    } else if (isString(options.body)) {
      headers.append('Content-Type', 'text/plain')
    } else {
      headers.append('Content-Type', 'application/json')
    }
  }
  return headers
}

export function getFormData(data: Record<string, any>): FormData {
  let formData = new FormData()
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  return formData
}


export function getRequestBody(options: Options): BodyInit {
  if (options.body) {
    return isBlob(options.body) || isBlob(options.body) ? options.body : JSON.stringify(options.body)
  }
  if (options.formData) {
    return getFormData(options.formData)
  }
  return undefined
}


export default request