import { Graph } from "@antv/x6";

export const Customer = Graph.registerNode("Customer", {
  inherit: "rect",
});

export default class FlowChartService {
  private static _graph: Graph;

  /**
   * 获取画布实例
   */
  public static get graph() {
    return FlowChartService._graph;
  }

  /**
   * 获取画布操作的历史管理对象
   */
  public static get historyManage() {
    return this.graph.history;
  }

  constructor(element: HTMLDivElement, options?: Graph.Options) {
    if (element.tagName !== "DIV") {
      throw new Error("请使用div原始作为画布");
    }
    FlowChartService._graph = new Graph(
      Object.assign(
        {
          container: element,
        },
        options
      )
    );
  }
}
