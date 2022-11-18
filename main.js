const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const version = 2
const filename = path.resolve(__dirname, `data-${version}.json`)

main()

function main() {
  const [goldList, tick] = formatList(JSON.parse(fs.readFileSync(filename).toString()).reverse())
  console.log(goldList.map((e) => `[${e.time}]累计第[${beauTick(e.tick)}]抽抽到了[${e.type}]: ${e.name}`).join('\n'))
  console.log(`目前已经连续 ${beauTick(tick)} 抽未出五星`)
}

function formatList(list) {
  // rank_type item_type name
  const goldList = []
  console.log(`统计了最近的 ${list.length} 次抽卡`)
  let tick = 0
  list.forEach((item) => {
    if (item.rank_type < 4) {
      tick += 1
      return
    }
    goldList.push({
      tick: tick + 1,
      name: chalk[item.rank_type > 4 ? 'yellow' : 'blue'](item.name),
      type: item.item_type,
      time: item.time.substring(0, item.time.indexOf(' ')),
    })
    if (item.rank_type > 4) {
      tick = 0
    }
  })
  return [goldList, tick]
}

function beauTick(value) {
  if (value > 60) {
    return chalk.red(`${value}`)
  } else if (value > 40) {
    return chalk.yellow(`${value}`)
  } else {
    return chalk.green(`${value}`)
  }
}
