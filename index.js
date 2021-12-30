var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function() {
  "use strict";
  function writerNodes(Vue) {
    const thirdParty = window.panel.plugins.thirdParty;
    if (thirdParty.__nodesInitialized)
      return;
    const customNodes = thirdParty.nodes;
    if (!customNodes)
      return;
    const original = Vue.component("k-writer");
    Vue.component("k-writer", {
      extends: original,
      methods: {
        createNodes() {
          const originalNodes = original.options.methods.createNodes.call(this).filter(({ name }) => !Object.keys(customNodes).includes(name));
          const nodes = Object.entries(customNodes).reduce((acc, [key, Constructor]) => {
            acc[key] = new Constructor();
            return acc;
          }, {});
          return [...originalNodes, ...this.filterExtensions(nodes, this.nodes)];
        }
      }
    });
    thirdParty.__nodesInitialized = true;
  }
  class Extension {
    constructor(options = {}) {
      this.options = __spreadValues(__spreadValues({}, this.defaults), options);
    }
    init() {
      return null;
    }
    bindEditor(editor = null) {
      this.editor = editor;
    }
    get name() {
      return null;
    }
    get type() {
      return "extension";
    }
    get defaults() {
      return {};
    }
    plugins() {
      return [];
    }
    inputRules() {
      return [];
    }
    pasteRules() {
      return [];
    }
    keys() {
      return {};
    }
  }
  class Node extends Extension {
    constructor(options = {}) {
      super(options);
    }
    get type() {
      return "node";
    }
    get schema() {
      return null;
    }
    commands() {
      return {};
    }
  }
  class Quote extends Node {
    get button() {
      return {
        id: this.name,
        icon: "quote",
        label: window.panel.$t("field.blocks.quote.name"),
        name: this.name
      };
    }
    commands({ utils, type }) {
      return {
        quote: () => utils.setBlockType(type)
      };
    }
    get name() {
      return "quote";
    }
    get schema() {
      return {
        content: "inline*",
        group: "block",
        draggable: false,
        parseDOM: [
          {
            tag: "blockquote"
          }
        ],
        toDOM: () => ["blockquote", 0]
      };
    }
  }
  window.panel.plugin("coralic/kirby-writer-nodes", {
    use: [writerNodes],
    thirdParty: {
      nodes: __spreadProps(__spreadValues({}, window.panel.plugins.thirdParty.nodes || {}), {
        quote: Quote
      })
    }
  });
})();
