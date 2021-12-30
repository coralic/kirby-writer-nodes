import Node from './Writer/Node'

export default class Quote extends Node {
  get button() {
    return {
      id: this.name,
      icon: 'quote',
      // Re-using the label of the Quote block
      label: window.panel.$t('field.blocks.quote.name'),
      name: this.name,
    }
  }

  commands({ utils, type }) {
    return {
      quote: () => utils.setBlockType(type),
    }
  }

  get name() {
    return 'quote'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [
        {
          tag: 'blockquote',
        },
      ],
      toDOM: () => ['blockquote', 0],
    }
  }
}
