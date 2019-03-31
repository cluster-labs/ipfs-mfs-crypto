'use strict'

const pull = require('pull-stream/pull')
const collect = require('pull-stream/sinks/collect')
const readPullStream = require('./read-pull-stream')
const { decrypt } = require('../core/utils/crypto/symmetric')


module.exports = (context) => {
  return function mfsRead (path, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    pull(
      readPullStream(context)(path, options),
      collect((error, buffers) => {
        if (error) {
          return callback(error)
        }
        //<code>
        let decrypted;
        if(options.crypto){
          let {algorithm, key} = options.crypto
          let json = JSON.stringify(Buffer.concat(buffers));
          let bufferOriginal = Buffer.from(JSON.parse(json).data);
          decrypted = Buffer.from(decrypt(JSON.parse(bufferOriginal.toString('utf8')), algorithm, key))
        }
        //</code>
        return callback(null, options.crypto ? decrypted : Buffer.concat(buffers))
      })
    )
  }
}
