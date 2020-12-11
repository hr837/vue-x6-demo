<template>
  <div id="widget-box" class="components widget-box"></div>
</template>

<script lang="ts">
import DragService from "@/utils/drag.service";
import FlowChartService from "@/utils/flowchart.serivce";
import { Dnd } from "@antv/x6/lib/addon";
import { Shape, Addon } from "@antv/x6";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FlowChartRect } from "@/utils/shape";

@Component({
  name: "widget-box",
})
export default class WidgetBox extends Vue {
  private _stencil!: Addon.Stencil;

  public mounted() {
    this.$nextTick(() => {
      this.initStencil();
      this.initShape();
    });
  }

  private initStencil() {
    this._stencil = new Addon.Stencil({
      target: FlowChartService.graph,
      stencilGraphWidth: 280,
      groups: [
        {
          name: "basic",
          title: "基础节点",
          graphHeight: 180,
        },
      ],
    });
    const stencilContainer = document.querySelector("#widget-box");
    stencilContainer?.appendChild(this._stencil.container);
  }

  private initShape() {
    const end = new FlowChartRect({
      attrs: {
        body: {
          stroke: "",
          rx: 24,
          ry: 24,
          fill: "#f93e3e",
        },
        text: {
          text: "结束节点",
          fill: "white",
        },
      },
      ports: {
        items: [
          {
            group: "top",
          },
        ],
      },
    });
    const r2 = new FlowChartRect({
      attrs: {
        text: {
          text: "流程节点",
        },
      },
    });
    const r3 = new FlowChartRect({
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        "edit-text": {
          style: {
            transform: "rotate(-45deg)",
          },
        },
        text: {
          text: "判断节点",
          transform: "rotate(-45deg)",
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: "top",
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: "right",
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: "bottom",
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: "left",
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    });
    const r4 = new FlowChartRect({
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          text: "链接节点",
        },
      },
    });
    this._stencil.load([end, r2, r3, r4], "basic");
  }
}
</script>

<style lang="less" scoped>
.components.widget-box {
  position: relative;
  width: 290px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
</style>