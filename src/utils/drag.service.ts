import { CustomerCellTyle } from "./type";
import { fromEvent, Observable, Subscriber, Subscription } from "rxjs";

export type DragConfig = {
  offsetTop: number;
  offsetLeft: number;
  clientX: number;
  clientY: number;
  el: HTMLDivElement;
  cellType: CustomerCellTyle;
};

export type CrateNodeInfo = Pick<
  DragConfig,
  "cellType" | "clientX" | "clientY"
>;

export default class DragService {
  private static config: DragConfig | null;
  private static subscriptions: Subscription[] = [];
  private static subscribe: Subscriber<CrateNodeInfo>;
  private static observable: Observable<CrateNodeInfo>;

  /**
   * 开始拖拽
   * @param event
   */
  public static start(event: MouseEvent) {
    const { clientX, clientY } = event;
    const element = event.currentTarget as Element;
    // 元素的左上角位置
    const { top, left } = element.getBoundingClientRect();
    // 克隆一个模板，开始移动
    const ele = element.cloneNode(true) as HTMLDivElement;
    // 获取元素的类型。用于生成流程节点
    const cellType = ele.getAttribute("data-type") as CustomerCellTyle;

    this.config = {
      clientX: clientX,
      clientY: clientY,
      offsetTop: clientY - top,
      offsetLeft: clientX - left,
      el: ele,
      cellType,
    };

    ele.style.top = top + "px";
    ele.style.left = left + "px";
    ele.classList.add("copy-node");
    // 又元素的父节点对克隆的元素承载，所以样式也由父节点所在位置实现
    element.parentElement!.appendChild(ele);

    this.subscriptions.push(
      fromEvent(document, "mouseup").subscribe((e) => this.end(e as MouseEvent))
    );
    this.subscriptions.push(
      fromEvent(document, "mousemove").subscribe((e) =>
        this.move(e as MouseEvent)
      )
    );
  }

  /**
   * 控件开始移动
   * @param event
   */
  private static move({ clientX, clientY }: MouseEvent) {
    if (!this.config) return;
    const { el, offsetLeft, offsetTop } = this.config;
    el.style.top = clientY - offsetTop + "px";
    el.style.left = clientX - offsetLeft + "px";
  }

  /**
   * 移动结束，鼠标释放
   * @param event
   */
  private static end(event: MouseEvent) {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
    if (!this.config) return;
    const { el, offsetLeft, offsetTop, cellType } = this.config;
    const { clientX, clientY } = event;
    // 发出
    if (this.subscribe) {
      this.subscribe.next({
        cellType: cellType,
        clientX: clientX - offsetLeft,
        clientY: clientY - offsetTop,
      });
    }
    this.config.el.remove();
    this.config = null;
  }

  /**
   * 注册添加节点句柄
   */
  public static registerAddNodeHandle() {
    if (!this.observable) {
      this.observable = new Observable(
        (subscribe) => (this.subscribe = subscribe)
      );
    }
    return this.observable;
  }

  /**
   * 销毁darg实例
   */
  public static destory() {
    this.subscribe.complete();
    this.subscribe.unsubscribe();
    this.subscriptions.forEach((x) => x.unsubscribe);
    this.subscriptions = [];
    this.config = null;
  }
}
