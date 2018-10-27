const request = require('request')

module.exports = function recursive(url, retryCount = 0) {
  return new Promise((res, rej) => {
    request(url, null, (err, data) => {
      let response = { retryCount, data: data.body, url }
      res(response)
    })
  })
    .then(response => {
      return new Promise((res, rej) => {
        setTimeout(() => res(), 1000)
      })
        .then(() => {
          console.log('retryCount', response.retryCount++)
          return response.retryCount < 5
            ? recursive(response.url, response.retryCount)
            : response.data
        })
    })
}