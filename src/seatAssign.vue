<template>
  <div class="com-seatAssign">
    <div class="table-box">
      <!-- 按钮 -->
      <div v-show="showBtns" class="tableBtns">
        <!-- 重置座位分布 -->
        <div
          v-if="roundConfig.btnVisiable.indexOf('reset') > -1"
          @click="resetRoundTableSeat"
          size="mini"
        >
          重置座位
        </div>
        <!-- 记录座位信息 -->
        <div
          v-if="roundConfig.btnVisiable.indexOf('staging') > -1"
          @click="saveCurrentPosition"
          size="mini"
        >
          暂存分布
        </div>
        <!-- 恢复上次暂存 -->
        <div
          v-if="roundConfig.btnVisiable.indexOf('staging') > -1"
          @click="recoveryPosition"
          size="mini"
        >
          恢复暂存
        </div>
        <!-- 保存到本地 -->
        <div
          v-if="roundConfig.btnVisiable.indexOf('saveImg') > -1"
          @click="savetolocal"
          size="mini"
        >
          保存图片
        </div>
      </div>

      <!-- 圆桌 -->
      <div class="table">
        <!-- 圆桌插槽 -->
        <div v-if="$scopedSlots.table" class="tableSlot">
          <slot name="table"></slot>
        </div>
        <!-- 默认圆桌 -->
        <div v-else class="roundTable"></div>
      </div>

      <!-- 座位 -->
      <div
        v-for="(item, index) in roundConfig.PersonList"
        :key="index"
        class="singleSeat"
      >
        <!-- 座位自定义插槽 -->
        <template v-if="$scopedSlots.seat">
          <slot name="seat" :seatInfo="item" :index="index"></slot>
        </template>
        <!-- 座位默认信息 -->
        <div v-else class="singleSeat-default">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
import html2canvas from "html2canvas"; //分享海报
import props from "./prop";
export default {
  name: "seatAssign",
  props,
  data() {
    return {
      showBtns: true, //是否展示按钮，在保存图片的时候隐藏一下
      squareBoxWidth: 600, //方框宽
      squareBoxHeight: 600, //方框高
      tableBackGround: "rgba(164, 228, 188, 0.2)",

      chosenSeat: 0, //用户点击的座位下标
      willBenChangeSeat: 0, //将要被换的座位下标

      historyPosition: [], //保存历史位置分布(暂存分布)
    };
  },
  methods: {
    //保存到本地
    savetolocal() {
      this.showBtns = false;
      console.log("aaaa", (this.showBtns = false));
      setTimeout(() => {
        var targetDom = document.querySelector(".table-box");
        const scrolly = targetDom.scrollTop;
        html2canvas(targetDom, {
          useCORS: true, // 开启跨域配置，如果图片里面有图片，需要加入该项
          height: targetDom.scrollHeight, //canvas高
          width: targetDom.scrollWidth, //canvas宽
          scrollY: scrolly, //渲染元素时的Y轴滚动
          windowHeight: 3000,
        }).then((canvas) => {
          let url = canvas.toDataURL("image/jpeg", 1.0);
          // console.log('打印url',url)
        });
        this.showBtns = true;
      });
    },
    /**
     * @description ： 暂时保存座位位置，点击恢复时恢复
     * @param {*}
     * @return {*}
     */
    saveCurrentPosition() {
      this.historyPosition = [];
      let seatList = document.getElementsByClassName("singleSeat");
      for (let i = 0; i < seatList.length; i++) {
        this.historyPosition.push({
          x: seatList[i].style.left,
          y: seatList[i].style.top,
        });
      }
      console.log("historyPosition", this.historyPosition);
      this.$message.success("暂存成功");
      // this.historyPosition
    },
    /**
     * @description ：恢复暂存的位置
     * @param {*}
     * @return {*}
     */
    recoveryPosition() {
      let seatList = document.getElementsByClassName("singleSeat");
      for (let i = 0; i < seatList.length; i++) {
        seatList[i].style.left = this.historyPosition[i].x;
        seatList[i].style.top = this.historyPosition[i].y;
      }
    },
    //初始化或重置座位
    resetRoundTableSeat() {
      let seatList = document.getElementsByClassName("singleSeat");
      // if(this.roundConfig.PersonList[0].initialX)
      for (let i = 0; i < seatList.length; i++) {
        let middleLeft =
          this.roundConfig.boxWidth / 2 - this.roundConfig.seatDiameter / 2;
        let middleTop =
          this.roundConfig.boxHeight / 2 - this.roundConfig.seatDiameter / 2;
        let rad =
          ((2 * Math.PI) / this.roundConfig.PersonList.length) * i -
          Math.PI / 2; //角度
        let x =
          (this.roundConfig.tableDiameter / 2 +
            this.roundConfig.seatDiameter / 2 +
            this.roundConfig.tableDistance) *
          Math.cos(rad);
        // console.log("x", x);
        let y =
          (this.roundConfig.tableDiameter / 2 +
            this.roundConfig.seatDiameter / 2 +
            this.roundConfig.tableDistance) *
          Math.sin(rad);
        // console.log("y", y);
        seatList[i].style.left = middleLeft + x + "px";
        // console.log("seatList[i].style.left", seatList[i].style.left);
        seatList[i].style.top = middleTop + y + "px";
        // console.log("seatList[i].style.top", seatList[i].style.top);
        //设置初始位置信息
        this.roundConfig.PersonList[i].initialX = x;
        this.roundConfig.PersonList[i].initialY = y;
      }
    },
    //切换所有座位的位置
    changeSeatLocation() {
      let seatList = document.getElementsByClassName("singleSeat");
      for (let i = 0; i < seatList.length; i++) {
        let middleLeft = this.roundConfig.boxWidth / 2 - this.seatDiameter / 2;
        let middleTop = this.roundConfig.boxHeight / 2 - this.seatDiameter / 2;
        let rad =
          ((2 * Math.PI) / this.roundConfig.PersonList.length) * i -
          Math.PI / 2; //角度
        let x = (230 - 35) * Math.cos(rad);
        console.log("x", x);
        let y = (230 - 35) * Math.sin(rad);
        console.log("y", y);
        seatList[i].style.left = middleLeft + x + "px";
        console.log("seatList[i].style.left", seatList[i].style.left);
        seatList[i].style.top = middleTop + y + "px";
        console.log("seatList[i].style.top", seatList[i].style.top);

        //绑定点击、移动等事件
        let putDown = (event) => {
          seatList[i].style.cursor = "pointer";
          let offsetX = parseInt(seatList[i].style.left); // 获取当前的x轴距离
          let offsetY = parseInt(seatList[i].style.top); // 获取当前的y轴距离
          let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
          let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距

          // 鼠标移动的时候不停的修改div的left和top值
          document.onmousemove = (event) => {
            seatList[i].style.left = event.clientX - innerX + "px";
            seatList[i].style.top = event.clientY - innerY + "px";
            //记录移动数据
            this.roundConfig.PersonList[i].currentX = event.clientX - innerX;
            this.roundConfig.PersonList[i].currentY = event.clientY - innerY;

            // 边界判断
            if (parseInt(seatList[i].style.left) <= 0) {
              seatList[i].style.left = "0px";
            }
            if (parseInt(seatList[i].style.top) <= 0) {
              seatList[i].style.top = "0px";
            }
            if (
              parseInt(seatList[i].style.left) >=
              window.innerWidth - parseInt(seatList[i].style.width)
            ) {
              seatList[i].style.left =
                window.innerWidth - parseInt(seatList[i].style.width) + "px";
            }
            if (
              parseInt(seatList[i].style.top) >=
              window.innerHeight - parseInt(seatList[i].style.height)
            ) {
              seatList[i].style.top =
                window.innerHeight - parseInt(seatList[i].style.height) + "px";
            }
          };
          // 鼠标抬起时，清除绑定在文档上的mousemove和mouseup事件
          // 否则鼠标抬起后还可以继续拖拽方块
          document.onmouseup = (event) => {
            document.onmousemove = null;
            // 清除点border
            seatList[i].style.borderStyle = "";
            seatList[i].style.borderColor = "";
            seatList[i].style.borderWidth = "";
            document.onmouseup = null;
          };
        };
        console.log("绑定方法了");
        seatList[i].addEventListener("mousedown", putDown, false);
        //mouseenter添加hover样式
        seatList[i].addEventListener("mouseenter", () => {
        });
        //mouseleave移除hover样式并重新渲染seatStyleBase初始样式
        seatList[i].addEventListener("mouseleave", () => {
          console.log("leave");
        });
      }
    },

    //设置桌子外方框(“画布”)尺寸
    setTableSize() {
      let ele = document.getElementsByClassName("com-seatAssign")[0];
      ele.style.width = this.roundConfig.boxWidth + "px";
      ele.style.height = this.roundConfig.boxHeight + "px";
      //若未自定义圆桌，根据变量设置中间圆桌布尺寸
      if (!this.$scopedSlots.table) {
        let roundDesk = document.getElementsByClassName("roundTable")[0];
        roundDesk.style.width = this.roundConfig.tableDiameter + "px";
        roundDesk.style.height = this.roundConfig.tableDiameter + "px";
      }

      //若未自定义座位,设置每个座位的样式(宽高)
      if (!this.$scopedSlots.seat) {
        let arr = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < arr.length; i++) {
          arr[i].style.width = this.roundConfig.seatDiameter + "px";
          arr[i].style.height = this.roundConfig.seatDiameter + "px";
        }
      }
    },
  },
  created() {},
  mounted() {
    //页面渲染完后，获取所有座位，计算出位置，并渲染
    this.setTableSize(); //设置桌布尺寸
    this.resetRoundTableSeat(); //重置座位
    this.changeSeatLocation(); //初始化拖拽事件
  },
};
</script>
    <style lang="less" scoped>
.com-seatAssign {
  overflow: auto;
  display: inline-block;
  .table-box {
    width: inherit;
    height: inherit;
    background-color: rgba(13, 154, 220, 0.308);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    vertical-align: middle;
    /**
       * @description ：中间圆桌布样式
      */
    .table {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .roundTable {
      width: 400px;
      height: 400px;
      background-color: rgb(255, 255, 255);
      border-radius: 100%;
      margin: auto;
      vertical-align: middle;
    }
    /**
       * @description ：桌子按钮盒子样式
      */
    .tableBtns {
      > div {
        color: black;
        background-color: white;
        margin-left: 10px;
        padding: 1px 10px;
        border-radius: 6px;
        border: 1px solid black;
        font-size: 10px;
        cursor: pointer;
      }
      display: flex;
      justify-content: space-between;
      position: absolute;
      right: 10px;
      top: 10px;
      // width: 250px;
      ::v-deep {
        .el-button--default {
          // width: 80px;
          padding: 5px 8px;
          font-size: 10px !important;
        }
      }
    }
    .singleSeat {
      position: absolute;
      .singleSeat-default {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: white;
        color: rgb(0, 0, 0);
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .singleSeat-default:hover {
        border: 2px solid red;
      }
    }
    .seatActive {
    }
  }
}
</style>
    