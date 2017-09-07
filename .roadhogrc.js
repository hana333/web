const pxtorem = require('postcss-pxtorem');
const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets/svg'),  // 业务代码本地私有 svg 存放目录
];

export default {
	svgSpriteLoaderDirs: svgSpriteDirs,
	entry: 'src/index.js',
	outputPath: './dist',
	publicPath: './',
	//disableCSSModules: true, // 屏蔽CSSModules,避免css后缀混淆
	//multipage: true,
	extraBabelPlugins: [
		'transform-runtime', 
		['import', [{ 'libraryName': 'antd', 'style': true }, { 'libraryName': 'antd-mobile', 'style': true }]]
	],
	// px转rem,mobile使用
	//extraPostCSSPlugins: [
	//	pxtorem({
	//		rootValue: 100,
	//		propWhiteList: [],
	//	}),
	//],
	env: {
		development: {
			extraBabelPlugins: [
				'dva-hmr',
				'transform-runtime'
			]
		},
		production: {
			extraBabelPlugins: [
				'transform-runtime'
			]
		}
	}
}