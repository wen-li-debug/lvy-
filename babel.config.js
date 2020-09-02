//这是项目发布阶段需要使用到的 babel 插件
const prodPlugins = [];
//判断是否是发布阶段
if (process.env.NODE_ENV === 'production') {
    //是发布阶段添加插件
    prodPlugins.push('transform-remove-console')
}

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        ...prodPlugins
    ]
}