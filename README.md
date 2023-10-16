## 说明
该版本为最初版本，功能单一，后续将不断更新迭代。目前仅适用vue2，其他版本适配将陆续开发。

## 演示
￼![seatAssign示例](https://img-blog.csdnimg.cn/95d5673183f149e78a1c27cf15a71e29.gif)

## 安装
在终端下载
npm install seatassign
在main.js中引用
```javascript
import Vue from 'vue';
import seatassign from 'seatassign';
Vue.use(seatassign)
```

## 使用
```javascript

<template>
    <div class="container">
      <seatAssign :roundConfig="roundConfig">
        <!-- 桌子自定义 -->
        <!-- <template v-slot:table>
          <div style="width:200px;height:200px;background:green;border-radius:100%;display:flex;justify-content:center;align-items:center;font-size:30px;color:white">
            一号桌
          </div>
        </template> -->
  
        <!-- 座位自定义 -->
        <!-- <template v-slot:seat="{seatInfo,index}">
          <div style="color:red;width:100%;height:100%;display:flex;justify-content:center;align-items:center;font-size:20px">
            {{index}}:{{seatInfo.name}}
          </div>
        </template> -->
      </seatAssign>
    </div>
  </template>
  <script>
  export default {
    name: "test",
    data() {
      return {
        roundConfig: {
          PersonList: [
            {
              name: "张三",
              // initialX: "",   //初始x轴位置
              // initialY: "",   //初始y轴位置
              // currentX: "",   //移动后的x轴位置
              // currentY: "",   //移动后的y轴位置
            },
            {
              name: "李四",
            },
            {
              name: "王五",
            },
          ],
          boxWidth: 600, //“画布”宽度
          boxHeight: 600, //“画布”高度
          tableDiameter: 300, //圆桌直径
          seatDiameter: 80, //座位直径
          tableDistance: 10, //座位和圆桌的距离
          btnVisiable: ["reset", "staging", "saveImg"], //reset重置座位，staging暂存分布及恢复暂存，saveImg保存图片
          assignType: "normal", //选座模式1.free自由拖拽，2.exchange座位互换，3.slide滑动互换
        },
      };
    },
    methods: {
    },
    created() {},
    mounted() {
    },
  };
  </script>
  <style lang="less" scoped>
  .container {
    padding-top: 100px;
    ::v-deep {
      // .com-seatAssign .table-box .singleSeat{
      //   background-color: red;
      // }
    }
  }
  </style>
  
  

```



## 功能说明
通过传入数组，实现座位的初始化、拖拽等功能

##  roundConfig绑定圆桌配置参数列表

| 参数名称 | 类型 | 默认取值 | 是否必须 | 说明 |
|:---:|:---:| :---:| :---:| :---:|
|PersonList      |Array      |[{name:’姓名1’}, {name:’姓名2’},{name:’姓名3’}]      |✓      |数组里存储将要渲染的人员信息|
|boxWidth      |Number      |600      |×      |桌子外的“画布”宽度
|boxHeight      | Number      |600      | ×      | 桌子外的“画布”高度
|tableDiameter      | Number     |300      | ×      |中间圆桌的直径
|seatDiameter      | Number     |80      | ×      |座位直径
|tableDistance      | Number     |10      | ×      |座位和圆桌的距离
|btnVisiable      | Array     |["reset", "staging", "saveImg"]      | ×      |按钮展示,reset重置座位，staging暂存分布及恢复暂存，saveImg保存图片

## slot
|名称|说明|
|:---:|:---:|
|table|桌布元素自定义，可以自己给定样式和交互|
|seat|座位元素自定义，可以自己给定样式和交互，返回所有座位信息和当下座位的index|



