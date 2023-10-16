const props = {
    //圆桌配置
    roundConfig: {
        type: Object,
        default() {
            return {
                PersonList: [
                    {
                        name: "姓名1",
                        // initialX: "",   //初始x轴位置
                        // initialY: "",   //初始y轴位置
                        // currentX: "",   //移动后的x轴位置
                        // currentY: "",   //移动后的y轴位置
                    },
                    {
                        name: "姓名2",
                    },
                    {
                        name: "姓名3",
                    },
                ],
                boxWidth: 600,       //“画布”宽度
                boxHeight: 600,       //“画布”高度
                tableDiameter: 300,        //圆桌直径
                seatDiameter: 80,          //座位直径
                tableDistance: 10,      //座位和圆桌的距离
                btnVisiable: ['reset', 'staging', 'saveImg'],   //reset重置座位，staging暂存分布及恢复暂存，saveImg保存图片
                assignType:'normal',    //选座模式1.free自由拖拽，2.exchange座位互换，3.slide滑动互换
            }
        }

    },

}

export default props