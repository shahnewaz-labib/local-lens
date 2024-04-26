import data from "./tmp.json"

const ret = data.features.map(function (f: any) {
  return f.properties
})

console.log(JSON.stringify(ret))
