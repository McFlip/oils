/* eslint-disable mocha/no-setup-in-describe */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chaiHttp from 'chai-http'
import chai from 'chai'
import apiURL from '../.build/app.js'
import create from './suites/create.spec.mjs'
import read from './suites/read.spec.mjs'
import update from './suites/update.spec.mjs'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE'

chai.use(chaiHttp)
chai.should()

describe('CRUD tests', function () {
  before(function (done) {
    this.apiURL = apiURL
    this.token = token
    this.prod1ID = null
    done()
  })
  after(function (done) {
    chai.request(apiURL)
      .delete('/mockmongoose')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        done()
      })
  })
  it('should return hello', function (done) {
    chai.request(apiURL)
      .get('/')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.text.should.equal('Hello World!\r\n\r\n')
        done()
      })
  })
  describe('CREATE tests', create.bind(this))
  describe('READ tests', read.bind(this))
  describe('UPDATE tests', update.bind(this))
})
