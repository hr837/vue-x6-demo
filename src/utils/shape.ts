import { Graph, Dom, Node } from "@antv/x6";

export const FlowChartRect = Graph.registerNode("flow-chart-rect", {
  inherit: "rect",
  width: 80,
  height: 42,
  attrs: {
    body: {
      strokeWidth: 1,
      fill: "rgba(95,149,255,0.05)",
    },
    fo: {
      refWidth: "100%",
      refHeight: "100%",
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "edit-text": {
      contenteditable: "true",
      class: "x6-edit-text",
      style: {
        width: "100%",
        textAlign: "center",
        fontSize: 12,
        color: "rgba(0,0,0,0.85)",
      },
    },
    text: {
      fontSize: 12,
      fill: "rgba(0,0,0,0.85)",
    },
  },
  markup: [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "text",
      selector: "text",
    },
    {
      tagName: "foreignObject",
      selector: "fo",
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: "body",
          selector: "foBody",
          children: [
            {
              tagName: "div",
              selector: "edit-text",
            },
          ],
        },
      ],
    },
  ],
  ports: {
    groups: {
      top: {
        position: "top",
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
      right: {
        position: "right",
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
      bottom: {
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
      left: {
        position: "left",
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
  },
});
