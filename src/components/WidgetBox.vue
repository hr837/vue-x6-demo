<template>
  <div id="widget-box" class="components widget-box"></div>
</template>

<script lang="ts">
import DragService from "@/utils/drag.service";
import FlowChartService from "@/utils/flowchart.serivce";
import { Dnd } from "@antv/x6/lib/addon";
import { Shape, Addon } from "@antv/x6";
import { Component, Prop, Vue } from "vue-property-decorator";

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

  private portSetting = {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: "#5F95FF",
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
        group: "top",
      },
      {
        group: "right",
      },
      {
        group: "bottom",
      },
      {
        group: "left",
      },
    ],
  };

  private initShape() {
    const r1 = new Shape.Rect({
      width: 100,
      height: 40,
      attrs: {
        text: {
          text: "流程节点",
        },
      },
      ports: this.portSetting,
    });

    const r2 = new Shape.Rect({
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
    });
    this._stencil.load([r1, r2], "basic");
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