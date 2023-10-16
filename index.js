// 这是包的入口文件
// const date = require('./src/dateFormat')
// const escape = require('./src/htmlEscape')

// 向外暴露需要的成员
// module.exports = {
//     ...date,
//     ...escape
// }

import seatAssign from "./src/seatAssign.vue"


const install = function (Vue) {
    Vue.component(seatAssign.name, seatAssign);
}


export default install