const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('one init user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passHash = await bcryptjs.hash('salasana!', 10)
    const user = new User({ username: 'root', name: 'rootti', passHash })

    await user.save()
  })

  test('creation succeeds with valid username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'Slallanen',
      name: 'Slallan toinen minuus',
      password: 'passunen'
    }

    await api
      .post(('/api/users'))
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('creation fails with taken username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Slallan toinen minuus',
      password: 'passunen'
    }

    await api
      .post(('/api/users'))
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'mm',
      name: 'Slallan toinen minuus',
      password: 'passunen'
    }

    await api
      .post(('/api/users'))
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short password', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'Slallabbaa',
      name: 'Slallan toinen minuus',
      password: 'ps'
    }

    await api
      .post(('/api/users'))
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})