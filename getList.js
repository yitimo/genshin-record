const fs = require('fs')
const path = require('path')
const request = require('./request')

const version = 2
const filename = path.resolve(__dirname, `data-${version}.json`)

let list = []

main()

async function main() {
  if (fs.existsSync(filename)) {
    try {
      list = JSON.parse(fs.readFileSync(filename).toString())
    } catch (e) {
      console.log('本地数据异常 将重置')
    }
  }
  let endId = list[list.length - 1] || 0
  while (endId >= 0) {
    const newList = await doGet(endId)
    await sleep()
    newEndId = mergeList(newList)
    console.log(`请求列表endId=${endId}, 拉取到${newList.length}条数据, 新的endId=${newEndId}`)
    endId = newEndId
  }
  console.log(`拉取完成, 当前共${list.length}条数据`)
  fs.writeFileSync(filename, JSON.stringify(list, null, 2))
}

async function doGet(endId = 0) {
  try {
    const res = await request(endId)
    return res
  } catch (e) {
    return []
  }
}

function mergeList(newList) {
  if (!newList.length) {
    return -1
  }
  newList.forEach((newItem) => {
    if (list.findIndex((e) => e.id === newItem.id) < 0) {
      list.push(newItem)
    }
  })
  fs.writeFileSync(filename, JSON.stringify(list, null, 2))
  return newList[newList.length - 1].id
}

function sleep(sec = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, sec)
  })
}
