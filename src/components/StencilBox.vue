<template>
  <div class="components stencil-container" ref="stencilContainer"></div>
</template>

<script lang="ts">
import FlowChartService from "@/utils/flowchart.serivce";
import { Stencil, Dnd } from "@antv/x6/lib/addon";
import { Circle, Rect } from "@antv/x6/lib/shape/basic";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "stencil-box",
})
export default class StencilBox extends Vue {
  $refs!: {
    stencilContainer: HTMLDivElement;
  };

  private stencil!: Stencil;
  private dnd!: Dnd;

  public mounted() {
    this.$nextTick(() => {
      this.initStencil();
    });
  }

  private initStencil() {
    this.stencil = new Stencil({
      title: "流程工具箱",
      target: FlowChartService.graph,
      search: true,
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: "group1",
          title: "基础原件",
        },
      ],
    });
    this.$refs.stencilContainer.appendChild(this.stencil.container);
    this.dnd = new Dnd({ target: FlowChartService.graph, animation: true });
    this.addWidget();
  }

  private addWidget() {
    const r = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const c = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
        text: { text: "ellipse", fill: "white" },
      },
    });

    const c2 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#4B4A67", "stroke-width": 6, stroke: "#FE854F" },
        text: { text: "ellipse", fill: "white" },
      },
    });

    const r2 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#4B4A67", stroke: "#31D0C6", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const r3 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
        text: { text: "rect", fill: "white" },
      },
    });

    const c3 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
        text: { text: "ellipse", fill: "white" },
      },
    });

    this.stencil.load([r, c, c2, r2.clone()], "group1");
  }
}
</script>

<style lang="less" scoped>
.components.stencil-container {
  width: 300px;
  border: 1px solid #f0f0f0;
  position: relative;
}
</style>
