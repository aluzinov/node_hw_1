// Написать утилиту tree для удобного показа структуры файлов директории.
// Утилита должна принимать на вход обязательный аргумент — путь до директории для показа ее структуры.
// Также она должна понимать опцию глубину показа --depth, -d с числом в качестве значения.

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const lastSigns = ["└", "╘"]
const nonLastSigns = ["├", "╞"]

function listPath(dir, depth, prefix, max_depth) {
  try{
    const list = fs.readdirSync(dir, { withFileTypes: true})
    list.forEach((item, index) => {
      const is_dir = item.isDirectory()
      const is_last = list.length - 1 == index
      const signs = is_last ? lastSigns : nonLastSigns
      const sign = signs[+is_dir]
      console.log(prefix, sign, item.name)
  
      if (item.isDirectory() && depth < max_depth) {
        const new_prefix = is_last ? " ": " │"
        const sub_path = path.join(dir, item.name)
        listPath(sub_path, depth + 1, prefix + new_prefix, max_depth)
      }
    })
  }
  catch {
    // catch access errors
  }
}

const dir=argv.path || 'C:/'
const max_depth=argv.depth || 2

listPath(dir, 0, "", max_depth)