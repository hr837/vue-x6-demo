<template>
  <div class="components tools-box">
    <el-button>
      <i class="el-icon-back"></i>
    </el-button>
    <el-button>
      <i class="el-icon-right"></i>
    </el-button>
  </div>
</template>

<script lang="ts">
import FlowChartService from "@/utils/flowchart.serivce";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tools-box",
})
export default class ToolsBox extends Vue {
  private history = {
    undo: true,
    redo: true,
  };

  private mounted() {
    this.$nextTick(() => {
      this.registerHistoryAction();
    });
  }

  private registerHistoryAction() {
    FlowChartService.historyManage.on("change", () => {
      this.history = {
        undo: !FlowChartService.historyManage.canUndo(),
        redo: !FlowChartService.historyManage.canRedo(),
      };
    });
  }
}
</script>
