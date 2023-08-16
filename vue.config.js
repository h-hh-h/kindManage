const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        // // markdown-it config
        // preset: 'default',
        // breaks: true,
        // preprocess: function(markdownIt, source) {
        //   // do any thing
        //   return source;
        // },
        // use: [
        //   /* markdown-it plugin */
        //   require('markdown-it'),
        //   /* or */
        //   // [require('markdown-it-xxx'), 'this is options']
        // ],
        raw: true,
      });
  },  
})
// conifg.module.rule('md')
//       .test(/\.md/)
//       .use('vue-loader')
//       .loader('vue-loader')
//       .end()
//       .use('vue-markdown-loader')
//       .loader('vue-markdown-loader/lib/markdown-compiler')
//       .options({
//         raw: true
//       })