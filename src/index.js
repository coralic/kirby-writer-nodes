import writerNodes from './plugins/writerNodes'
import Quote from './Nodes/Quote'

window.panel.plugin('coralic/kirby-writer-nodes', {
  use: [writerNodes],
  thirdParty: {
    nodes: {
      // Import custom nodes from other plugins
      ...(window.panel.plugins.thirdParty.nodes || {}),

      // Provide class, not an instance of it
      quote: Quote,
    },
  },
})
