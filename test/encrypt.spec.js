/* eslint-env mocha */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect
const isNode = require('detect-node')
const values = require('pull-stream/sources/values')
const bufferStream = require('pull-buffer-stream')
const multihash = require('multihashes')
const randomBytes = require('./helpers/random-bytes')
const util = require('util')
const {
  collectLeafCids,
  createMfs,
  cidAtPath,
  createShardedDirectory,
  createTwoShards,
  createShard
} = require('./helpers')
const CID = require('cids')
const crypto = require('crypto')

const { 
  encrypt,
  decrypt, 
  generateRandomIV, 
  generateRandomKey 
}  = require('../src/core/utils/crypto/symmetric')

let fs, tempWrite

if (isNode) {
  fs = require('fs')
  tempWrite = require('temp-write')
}

describe('encrypt', () => {
    let mfs;
    let smallFile = Buffer.from("small message from vasa")
    let largeFile = randomBytes(490668)

    before(async () => {
        mfs = await createMfs()
      })

    it('encrypts the content passed and writes it to a file', async () => {
        const filePath = `/small-file-${Math.random()}.txt`
    
        await mfs.write(filePath, smallFile, {
          create: true,
          crypto: {"algorithm": "aes-256-cbc", "key": generateRandomKey(), "iv": generateRandomIV()}
        })
        const stats = await mfs.stat(filePath)
        //console.log("STATS: ",stats)
        //expect(stats.size).to.equal(smallFile.length)
      })
})
