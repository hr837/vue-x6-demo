<template>
  <div class="components tools-box">
    <el-button-group>
      <el-button :disabled="history.undo" title="撤销 [CTRL+Z]" @click="onUndo" icon="el-icon-back"></el-button>
      <el-button :disabled="history.redo" title="恢复 [CTRL+Y]" @click="onRedo" icon="el-icon-right"></el-button>
      <el-button type="danger" @click="emitReset" icon="el-icon-refresh"></el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts">
import FlowChartService from "@/utils/flowchart.serivce";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "tools-box",
})
export default class ToolsBox extends Vue {
  private history = {
    undo: true,
    redo: true,
  };

  @Emit("reset")
  private emitReset() {
    return;
  }

  private mounted() {
    this.$nextTick(() => {
      this.registerHistoryAction();

      // 注册键盘事件
      // fromEvent<KeyboardEvent>(window, "keyup")
      //   .pipe(filter((e) => e.composed && e.ctrlKey && !e.altKey))
      //   .subscribe(this.keyup);
      FlowChartService.graph.enableKeyboard();
      FlowChartService.graph.keyboard.options.global = true;
      FlowChartService.graph.bindKey(["ctrl+z"], this.onUndo, "keyup");
      FlowChartService.graph.bindKey(["ctrl+y"], this.onRedo, "keyup");
    });
  }

  private registerHistoryAction() {
    if (!FlowChartService.graph.isHistoryEnabled()) {
      FlowChartService.graph.enableHistory();
    }
    FlowChartService.historyManage.on("change", () => {
      this.history = {
        undo: !FlowChartService.historyManage.canUndo(),
        redo: !FlowChartService.historyManage.canRedo(),
      };
    });
  }

  private onUndo() {
    if (FlowChartService.historyManage.canUndo()) {
      FlowChartService.historyManage.undo();
    }
  }
  private onRedo() {
    if (FlowChartService.historyManage.canRedo()) {
      FlowChartService.historyManage.redo();
    }
  }
}
</script>
