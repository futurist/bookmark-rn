

export function arrayUnique(arr){return Array.from(new Set(arr))}

export function ensureHTTP(url){
  url = String(url).trim()
  return /^\s*https?:\/\//i.test(url)
  ? url
  : 'http://'+url
}

export function fetchURLInfo(url){
  return fetch(`https://jamesbookmark.herokuapp.com/lambda/info/run?url=${url}`)
  .then(r=>r.json())
}

export function textOverflow(str, len=10, remain='...'){
  var s = String(str)
  return s.length <= len ? s : s.slice(0,len)+ remain
}
