<template>
    <div class="com-seatAssign">
      <div class="table-box">
        <div v-show="showBtns" class="tableBtns">
          <div
            v-if="roundConfig.btnVisiable.indexOf('reset') > -1"
            @click="resetRoundTableSeat"
            size="mini"
          >
            重置座位
          </div>
          <div
            v-if="roundConfig.btnVisiable.indexOf('staging') > -1"
            @click="saveCurrentPosition"
            size="mini"
          >
            暂存分布
          </div>
          <div
            v-if="roundConfig.btnVisiable.indexOf('staging') > -1"
            @click="recoveryPosition"
            size="mini"
          >
            恢复暂存
          </div>
          <div
            v-if="roundConfig.btnVisiable.indexOf('saveImg') > -1"
            @click="savetolocal"
            size="mini"
          >
            保存图片
          </div>
        </div>
  
        <div class="table">
          <div v-if="$scopedSlots.table" class="tableSlot">
            <slot name="table"></slot>
          </div>
          <div v-else class="roundTable"></div>
        </div>
  
        <div
          v-for="(item, index) in roundConfig.PersonList"
          :key="index"
          class="singleSeat"
        >
          <template v-if="$scopedSlots.seat">
            <slot name="seat" :seatInfo="item" :index="index"></slot>
          </template>
          <div v-else class="singleSeat-default">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </template>
      <script>
  import html2canvas from "html2canvas";
  import props from "./prop";
  export default {
    name: "seatAssign",
    props,
    data() {
      return {
        showBtns: true,
        squareBoxWidth: 600,
        squareBoxHeight: 600,
        tableBackGround: "rgba(164, 228, 188, 0.2)",
  
        chosenSeat: 0,
        willBenChangeSeat: 0,
  
        historyPosition: [],
      };
    },
    methods: {
      getCurrentPos() {
        let currentPos = [];
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          currentPos.push({
            x: seatList[i].style.left,
            y: seatList[i].style.top,
            name: seatList[i].innerText,
          });
        }
        return currentPos;
      },
      getStagingPos() {
        return this.historyPosition;
      },
      savetolocal() {
        this.showBtns = false;
        console.log("aaaa", (this.showBtns = false));
        setTimeout(() => {
          var targetDom = document.querySelector(".table-box");
          const scrolly = targetDom.scrollTop;
          html2canvas(targetDom, {
            useCORS: true,
            height: targetDom.scrollHeight,
            width: targetDom.scrollWidth,
            scrollY: scrolly,
            windowHeight: 3000,
          }).then((canvas) => {
            let url = canvas.toDataURL("image/jpeg", 1.0);
            if (false) {
              this.saveImg({
                url: url,
              });
              this.$parent.shareposter = false;
            } else {
              let a = document.createElement("a");
              a.href = url;
              a.download = `${new Date().getTime()}.png`;
              a.click();
              alert("保存成功");
            }
          });
          this.showBtns = true;
        });
      },
      saveCurrentPosition() {
        this.historyPosition = [];
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          this.historyPosition.push({
            x: seatList[i].style.left,
            y: seatList[i].style.top,
          });
        }
        alert("暂存成功");
      },
      recoveryPosition() {
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          seatList[i].style.left = this.historyPosition[i].x;
          seatList[i].style.top = this.historyPosition[i].y;
        }
      },
      resetInterPos() {
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          seatList[i].style.left = this.roundConfig.PersonList[i].initialX;
          seatList[i].style.top = this.roundConfig.PersonList[i].initialY;
        }
      },
      resetRoundTableSeat() {
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          let middleLeft =
            this.roundConfig.boxWidth / 2 - this.roundConfig.seatDiameter / 2;
          let middleTop =
            this.roundConfig.boxHeight / 2 - this.roundConfig.seatDiameter / 2;
          let rad =
            ((2 * Math.PI) / this.roundConfig.PersonList.length) * i -
            Math.PI / 2;
          let x =
            (this.roundConfig.tableDiameter / 2 +
              this.roundConfig.seatDiameter / 2 +
              this.roundConfig.tableDistance) *
            Math.cos(rad);
          let y =
            (this.roundConfig.tableDiameter / 2 +
              this.roundConfig.seatDiameter / 2 +
              this.roundConfig.tableDistance) *
            Math.sin(rad);
          seatList[i].style.left = middleLeft + x + "px";
          seatList[i].style.top = middleTop + y + "px";
          this.roundConfig.PersonList[i].initialX = x;
          this.roundConfig.PersonList[i].initialY = y;
        }
      },
      changeSeatLocation() {
        let seatList = document.getElementsByClassName("singleSeat");
        for (let i = 0; i < seatList.length; i++) {
          let middleLeft = this.roundConfig.boxWidth / 2 - this.seatDiameter / 2;
          let middleTop = this.roundConfig.boxHeight / 2 - this.seatDiameter / 2;
          let rad =
            ((2 * Math.PI) / this.roundConfig.PersonList.length) * i -
            Math.PI / 2; //角度
          let x = (230 - 35) * Math.cos(rad);
          let y = (230 - 35) * Math.sin(rad);
          seatList[i].style.left = middleLeft + x + "px";
          seatList[i].style.top = middleTop + y + "px";
          let putDown = (event) => {
            seatList[i].style.cursor = "pointer";
            let offsetX = parseInt(seatList[i].style.left);
            let offsetY = parseInt(seatList[i].style.top);
            let innerX = event.clientX - offsetX;
            let innerY = event.clientY - offsetY;
  
            document.onmousemove = (event) => {
              seatList[i].style.left = event.clientX - innerX + "px";
              seatList[i].style.top = event.clientY - innerY + "px";
              this.roundConfig.PersonList[i].currentX = event.clientX - innerX;
              this.roundConfig.PersonList[i].currentY = event.clientY - innerY;
  
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
            document.onmouseup = (event) => {
              document.onmousemove = null;
  
              seatList[i].style.borderStyle = "";
              seatList[i].style.borderColor = "";
              seatList[i].style.borderWidth = "";
              document.onmouseup = null;
            };
          };
          seatList[i].addEventListener("mousedown", putDown, false);
          seatList[i].addEventListener("mouseenter", () => {});
          seatList[i].addEventListener("mouseleave", () => {});
        }
      },
  
      setTableSize() {
        let ele = document.getElementsByClassName("com-seatAssign")[0];
        ele.style.width = this.roundConfig.boxWidth + "px";
        ele.style.height = this.roundConfig.boxHeight + "px";
        if (!this.$scopedSlots.table) {
          let roundDesk = document.getElementsByClassName("roundTable")[0];
          roundDesk.style.width = this.roundConfig.tableDiameter + "px";
          roundDesk.style.height = this.roundConfig.tableDiameter + "px";
        }
  
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
      this.setTableSize();
      let hasPos = this.roundConfig.PersonList.every((pos) => {
        return (
          pos.initialX && pos.initialY && pos.initialY != "" && pos.initialX != ""
        );
      });
      if (hasPos) {
        this.resetInterPos();
      } else {
        this.resetRoundTableSeat();
      }
      this.changeSeatLocation();
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
      