import fetch from 'dva/fetch'
import fetchJsonp from 'fetch-jsonp'
import { message } from 'antd'

// 生成一个通过Get请求获取数据的 effect 函数
// fieldName: 需要赋值的state变量名; 
// 响应体预处理逻辑: 用filter处理一遍原数据再给fieldName赋值
export function genGetRequireTemplate (targetUri, fieldName, filter = null) {
  return function * ({ payload }, { select, call, put }) {
    const { 
      params = null, 
      cbFunc = ({ status, msg, list }) => {}, 
      isSlientMode = false, 
      isDownloadMode = false 
    } = payload // 可传选项

    console.debug('genGetListTemplate: targetUri=', targetUri, 'payload=', payload)

    if (isDownloadMode) {
      let link = `${targetUri}?${urlEncode(params)}`
      console.info('download mode: url=', link)
      window.open(link)
      return
    }
  
    let resp = yield call(simpleRequire, targetUri, { method: 'GET', params, isSlientMode })

    cbFunc(resp)

    yield put({
      type: 'updateState',
      payload: { name: fieldName, newValue: filter ? filter(resp?.list) : resp?.list }
    })
  }
}

// 生成一个通过Get请求获取或更新数据的 effect 函数
export function genPostRequireTemplate (targetUri) {
  return function * ({ payload }, { select, call, put }) {
    const { 
      params = null, 
      cbFunc = ({ status, msg, list }) => {}, 
      isJsonMode = true, 
      isSlientMode = false 
    } = payload

    console.debug('genUpdateTemplate: targetUri=', targetUri, 'payload=', payload)

    let resp = yield call(simpleRequire, targetUri, { method: 'POST', params, isSlientMode, isJsonMode })
    cbFunc(resp)
  }
}

// simpleRequire 用来发起Get或Post请求，处理响应结果，得到相同的结构返回值 {status:number, msg: string, list: any}
export async function simpleRequire (api, options) {
  const {
    params = null, // 参数: {}
    method = 'GET', // GET or POST
    isJsonMode = false, // 是否json方式请求
    isSlientMode = false // 响应异常时不弹出提示
  } = options

  console.debug('simpleRequire: api=', api, 'options=', options)

  let url = api
  if (method === 'GET' && params) {
    url += '?' + urlEncode(params)
  }

  let req = {
    method: method,
    body: null,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  if (method === 'POST') {
    req.body = postFormEncode(params)
  }
  if (isJsonMode) {
    req.body = JSON.stringify(params)
  }
  console.debug('url, req', url, req)
  const resp = await request(url, req)
  const defaultResp = { status: -1, msg: '', list: [] }
  const { data } = resp
  if (data === undefined) {
    if (isSlientMode === false) {
      message.warn('unexpect response, api=' + api, 8)
    }
    return defaultResp
  }

  // 统一格式
  const { status, msg, message: msg2, data: data2, payLoad, payload, list } = data
  const fixResp = {
    status: status,
    msg: msg || msg2 || '',
    list: list || payLoad || payload || data2 || []
  }
  if (status !== 0 && isSlientMode === false) {
    message.warn('请求失败,响应码异常: status=' + status + ' msg=' + msg, 8)
  }
  return fixResp
}

// ==================== require ====================================

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, { jsonp, ...options } = {}) {
  const fetchFunction = jsonp ? fetchJsonp : fetch

  return fetchFunction(url, {
    credentials: 'include',
    ...options
  })
    .then(res => checkStatus(res, jsonp))
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}

function parseJSON (response) {
  return response.json()
}

function checkStatus (response, jsonp) {
  console.debug('response==>', response, jsonp)
  if (jsonp && response.ok) {
    return response
  }
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// =====================================================================

// 格式化url参数
let urlEncode = function (param, key, encode) {
  if (param == null) return ''
  var paramStr = ''
  var t = typeof param
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

// 格式化表单数据
let postFormEncode = function (param) {
  var formBody = []
  for (var property in param) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(param[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  formBody = formBody.join('&')
  return formBody
}
