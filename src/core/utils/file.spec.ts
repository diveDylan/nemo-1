import fs from 'fs-extra'
import * as path from 'path'
import * as mustache from 'mustache'
import { writeMustacheFile } from './files'
import { getTemplates } from './share'
describe('files tests', () => {
  
  test('mustache render have been called', async () => {
    const testTemp = `name: {{name}}, author: {{author}}`
    const testData = {
      name: 'render_test',
      author: 'dylan'
    }
    await writeMustacheFile(testTemp, testData, './.test_folder')
    // expect(mustache.render).toBeCalledWith(testTemp, testData)
  })
})