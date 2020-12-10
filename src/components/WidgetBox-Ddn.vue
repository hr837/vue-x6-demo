<template>
  <el-collapse v-model="currentCollaspe" class="components widget-box" accordion>
    <el-collapse-item title="节点原件" name="1">
      <div class="widget-container">
        <div data-type="rect" class="dnd-rect" @mousedown="startDrag">Rect</div>
        <div data-type="circle" class="dnd-circle" @mousedown="startDrag">Circle</div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import DragService from "@/utils/drag.service";
import FlowChartService from "@/utils/flowchart.serivce";
import { Dnd } from "@antv/x6/lib/addon";
import { Circle, Rect } from "@antv/x6/lib/shape/basic";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "widget-box-dnd",
})
export default class WidgetBoxDnd extends Vue {
  private currentCollaspe = "1";
  private dnd!: Dnd;

  private mounted() {
    this.$nextTick(() => {
      this.dnd = new Dnd({
        target: FlowChartService.graph,
        animation: true,
      });
    });
  }

  private startDrag(e: any) {
    const target = e.currentTarget;
    const type = (target as HTMLElement).getAttribute("data-type");
    const node =
      type === "rect"
        ? new Rect({
            width: 100,
            height: 40,
            attrs: {
              label: {
                text: "Rect",
                fill: "#6a6c8a",
              },
              body: {
                stroke: "#31d0c6",
                strokeWidth: 2,
              },
            },
          })
        : new Circle({
            width: 60,
            height: 60,
            attrs: {
              label: {
                text: "Circle",
                fill: "#6a6c8a",
              },
              body: {
                stroke: "#31d0c6",
                strokeWidth: 2,
              },
            },
          });

    this.dnd.start(node, e as any);
  }
}
</script>

<style lang="less" scoped>
.dnd-rect {
  width: 100px;
  height: 40px;
  border: 2px solid #31d0c6;
  text-align: center;
  line-height: 40px;
  margin: 16px;
  cursor: move;
  user-select: none;
}
.dnd-circle {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 2px solid #31d0c6;
  text-align: center;
  line-height: 60px;
  margin: 16px;
  cursor: move;
  user-select: none;
}
</style>


<style lang="less" scoped>
.components.widget-box {
  width: 300px;
  font-size: 12px;
  .widget-group {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-items: center;
    .item {
      margin: 10px;
      background-color: rgb(173, 197, 197);
      &:hover {
        cursor: pointer;
      }
    }
  }

  .rect {
    height: 30px;
    width: 80px;
    line-height: 30px;
  }
  .circim {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    line-height: 60px;
  }
  .rect-rotate {
    height: 60px;
    width: 60px;
    line-height: 60px;
    transform: rotate(45deg);
    .rect-rotate-label {
      transform: rotate(-45deg);
    }
  }

  .rect-radius {
    height: 35px;
    width: 80px;
    line-height: 35px;
    border-radius: 20px;
  }

  .start {
    .rect-radius;
    &.item {
      background-color: rgb(8, 117, 2);
      color: white;
    }
  }

  .end {
    .rect-radius;
    &.item {
      background-color: rgb(187, 41, 41);
      color: white;
    }
  }

  .copy-node {
    position: fixed;
    margin: 0;
    z-index: 1;
    box-shadow: 0 4px 10px rgb(160, 160, 158);
  }
  .el-collapse-item {
    padding-left: 10px;
  }
}
</style>