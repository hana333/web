// 引入高清方案
import './viewport';
// init
import {init} from '../../utils/app';
// plugins
import createLoading from 'dva-loading';
import createEffectLock from '../../plugins/effectLock';
// models
import personReport from './models/personReport';
// router
import router from './router';
// css
import './index.css';

const dvaApp = init({
    plugins: [
        createLoading(),
        createEffectLock()
    ],
    models: [
        personReport
    ],
    router: router,
    start: '#root'
});