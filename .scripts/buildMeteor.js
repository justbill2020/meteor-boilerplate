const {version} = require("../package.json")
const {execSync}  = require('child_process')
const fs  = require('fs')

const BUILD_PATH = '.deploy-buildpack_'
const SRC_DIR =`./.scripts/buildSKEL/`


let myPath = BUILD_PATH+version

execSync(`meteor build ./${myPath}/. --server-only --architecture os.linux.x86_64`, {stdio:[0,1,2]})

let sources = fs.readdirSync(SRC_DIR)

sources.forEach(src => {
  fs.copyFileSync(SRC_DIR+src,`./${myPath}/${src}`)  
});
