const axios = require('axios')

describe('core', () => {
  it('should parse params correctly', async () => {
    const data = (
      await axios.post('http://localhost:7000', { db: { name: 'hello' } })
    ).data
    expect(data.params.db.name).toBe('hello')
  })
})