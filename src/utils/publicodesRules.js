import glob from 'glob'
import path from 'path'
import yaml from 'yaml'
import fs from 'fs'

import Engine from 'publicodes'

/// ---------------------- Helper functions ----------------------

const readYAML = (path) => {
  return yaml.parse(fs.readFileSync(path, 'utf-8'))
}

/// ---------------------- Main ----------------------

export default function publicodesRules() {
  const srcFile = 'src/data/**/*.yaml'
  const ruleFiles = glob.sync(srcFile, { ignore: [''] })
  const baseRules = ruleFiles.reduce((acc, filename) => {
    try {
      const rules = readYAML(path.resolve(filename))
      return { ...acc, ...rules }
    } catch (err) {
      console.log(
        ' ❌ Une erreur est survenue lors de la lecture du fichier',
        filename,
        ':\n\n',
        err.message
      )
      exit(-1)
    }
  }, {})
  const engine = new Engine(baseRules)
  return { baseRules, engine }
}
