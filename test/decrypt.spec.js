/* eslint-env mocha */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect
const bufferStream = require('pull-buffer-stream')
const pull = require('pull-stream/pull')
const collect = require('pull-stream/sinks/collect')
const {
  createMfs,
  createShardedDirectory
} = require('./helpers')
const randomBytes = require('./helpers/random-bytes')


const { 
    encrypt,
    decrypt, 
    generateRandomIV, 
    generateRandomKey 
  }  = require('../src/core/utils/crypto/symmetric')

  

describe('decrypt', () => {
    let mfs, algorithm = "aes-256-cbc", key = generateRandomKey(), iv = generateRandomIV()
    let smallFile = Buffer.from("small message from vasa")
  
    before(async () => {
      mfs = await createMfs()
    })

    let method = {
        name: 'decrypt',
        read: function () {
          return mfs.read.apply(mfs, arguments)
        },
        collect: (buffer) => buffer
      };


    describe(`read & ${method.name}`, () => {
        it('reads a small file', async () => {
          const filePath = '/small-file.txt'
  
          await mfs.write(filePath, smallFile, {
            create: true,
            crypto: {"algorithm": algorithm, "key": key, "iv": iv}
          })
          const result = await method.read(filePath, {
            crypto: {"algorithm": algorithm, "key": key}
          })

          let json = JSON.stringify(result);
          let bufferOriginal = Buffer.from(JSON.parse(json).data);
          
          expect(bufferOriginal.toString('utf8'))
          .equal("small message from vasa","decrypted data doesn't match the original data")


          const buffer = await method.collect(result)
          //expect(buffer).to.deep.equal(smallFile)
        })
    })
});