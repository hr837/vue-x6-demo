<template>
  <section id="app">
    <widget-box-dnd />
    <div class="wrapper">
      <tools-box />
      <div id="container"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Cell, Graph, Shape } from "@antv/x6";
import { Component, Vue } from "vue-property-decorator";
import FlowChartService, { Customer } from "./utils/flowchart.serivce";
import ToolsBox from "./components/ToolsBox.vue";
import StencilBox from "./components/StencilBox.vue";
import WidgetBox from "./components/WidgetBox.vue";
import WidgetBoxDnd from "./components/WidgetBox-Ddn.vue";
import DragService, { CrateNodeInfo } from "./utils/drag.service";
import { CustomerCellTyle } from "./utils/type";

@Component({
  components: {
    ToolsBox,
    StencilBox,
    WidgetBox,
    WidgetBoxDnd,
  },
})
export default class App extends Vue {
  private graph!: Graph;

  private option = {
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    snapline: {
      enabled: true,
      sharp: true,
    },
  };

  public mounted() {
    const container = document.querySelector("#container") as HTMLDivElement;
    new FlowChartService(container, this.option);
    this.graph = FlowChartService.graph;
    this.initDefaultNode();
    // DragService.registerAddNodeHandle().subscribe((data: CrateNodeInfo) => {
    //   const { clientX, clientY, cellType } = data;

    //   const x = clientX - container.offsetLeft;
    //   const y = clientY - container.offsetTop;

    //   if (x < 0 || y < 0) return;

    //   switch (cellType) {
    //     case "rect":
    //       this.addRect(x, y);
    //       break;
    //   }
    // });
  }

  private initDefaultNode() {
    const node = new Shape.Rect({
      width: 100,
      height: 40,
      x: 300,
      y: 30,
      className: "start-node",
      attrs: {
        label: {
          text: "开始",
        },
        body: {
          fill: "#2ECC71", // 背景颜色
          rx: 20,
        },
      },
    });
    this.graph.addNode(node);
  }

  private addRect(x: number, y: number) {
    const node = new Shape.Rect({
      width: 100,
      height: 40,
      x,
      y,
      attrs: {
        label: {
          text: "Hello",
        },
      },
    });
    this.graph.addNode(node);
  }
}
</script>

<style lang="less">
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style lang="less" scoped>
#app {
  height: 100%;
  display: flex;
  .wrapper {
    flex: 1;
  }
}
.wrapper {
  display: flex;
  flex-flow: nowrap column;
  #container {
    flex: 1;
    border: solid 1px #eee;
    box-shadow: 0 4px 12px 0 rgba(114, 211, 179, 0.219);
  }
}
</style>