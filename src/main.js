import seatAssign from "./components/seatAssign"


const install = function (Vue) {
    Vue.component(seatAssign.name, seatAssign);
}


export default install