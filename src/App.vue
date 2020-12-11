<template>
  <section id="app">
    <widget-box />
    <div class="wrapper">
      <div class="tools-container">
        <tools-box @reset="onReset" />
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
      <div id="container" ref="container"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Cell, FunctionExt, Graph, Shape } from "@antv/x6";
import { Component, Vue } from "vue-property-decorator";
import FlowChartService, { Customer } from "./utils/flowchart.serivce";
import ToolsBox from "./components/ToolsBox.vue";
import WidgetBox from "./components/WidgetBox.vue";
import DragService, { CrateNodeInfo } from "./utils/drag.service";
import { CustomerCellTyle } from "./utils/type";
import { PortManager } from "@antv/x6/lib/model/port";

@Component({
  components: {
    ToolsBox,
    WidgetBox,
  },
})
export default class App extends Vue {
  private graph!: Graph;

  readonly $refs!: {
    container: HTMLDivElement;
  };

  private option = {
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    snapline: {
      enabled: true,
      sharp: true,
    },
    connecting: {
      anchor: "center",
      connectionPoint: "anchor",
      dangling: false,
      highlight: true,
      snap: true,
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#5F95FF",
              strokeWidth: 1,
              targetMarker: {
                name: "classic",
                size: 8,
              },
            },
          },
          router: {
            name: "manhattan",
          },
        });
      },
      validateConnection(data: any) {
        const { sourceView, targetView, sourceMagnet, targetMagnet } = data;
        if (sourceView === targetView) {
          return false;
        }
        if (!sourceMagnet) {
          return false;
        }
        if (!targetMagnet) {
          return false;
        }
        return true;
      },
    },
  };

  public mounted() {
    new FlowChartService(this.$refs.container, this.option);
    this.graph = FlowChartService.graph;
    this.initDefaultNode();
    this.initEvent();
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
      ports: {
        groups: {
          out: {
            position: "bottom",
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                strokeWidth: 1,
                fill: "#fff",
                style: {
                  visibility: "hidden",
                },
              },
            },
          },
        },
        items: [
          {
            id: "start-port",
            group: "out",
          },
        ],
      },
    });
    this.graph.addNode(node);
  }

  private initEvent() {
    this.graph.on("blank:click", () => {
      const ports: NodeListOf<SVGElement> = document.querySelectorAll(
        ".x6-port-body"
      );
      ports.forEach((x) => (x.style.visibility = "hidden"));
    });
    this.graph.on(
      "node:click",
      ({ node }) => {
        if (!node.ports) return;
        const item = document.querySelector(`g[data-cell-id="${node.id}"]`);
        if (!item) return;
        const ports: NodeListOf<SVGElement> = item.querySelectorAll(
          ".x6-port-body"
        );
        ports.forEach((x) => (x.style.visibility = "visible"));
      },
      500
    );
  }

  private onReset() {
    FlowChartService.graph.clearCells();
    this.initDefaultNode();
    FlowChartService.historyManage.clean();
  }

  private onSave() {
    const data = FlowChartService.graph.toJSON();
    console.log(data);
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
  .tools-container {
    display: flex;
    justify-content: space-between;
  }
}
</style>