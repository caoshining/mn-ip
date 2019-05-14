'use strict';

let chalk = require('chalk')
let os = require('os')
let interfaces = os.networkInterfaces()
const argv = process.argv
const env = argv[2]

const output=()=>{
    for(let devName in interfaces){
        let iface  = interfaces[devName]
        for(let i=0;i<iface.length;i++){
            let alias = iface[i]
            if(alias.mac!=='00:00:00:00:00:00'){
                console.log(`${chalk.gray('------我是分割线头-----')}`)
                console.log(`mac:${chalk.yellow(alias.mac)}`)
                console.log(`ip:${chalk.green(alias.address)}`)
                console.log(`server: ${chalk.green(`http://${alias.address}${/^\d+$/.test(env)?`:${env}`:''}`)}`)
                console.log(`${chalk.gray('------我是分割线尾-----')}`)
            }
        }
    }
}

switch(env){
    case undefined:
        output()
    break;
    case '-v':
        console.log(chalk.yellow(require('../../package.json').version))
    break;
    case '-h':
        console.log(chalk.red('帮助个鸡儿啊，就一个-v,默认的'))
    break;
    default:
        output()
}
