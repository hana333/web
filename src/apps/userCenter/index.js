// init
import {init} from '../../utils/app';
// plugins
import createLoading from 'dva-loading';
import createEffectLock from '../../plugins/effectLock';
import {createWebLocalStore, getWebState} from '../../plugins/webLocalStore';
import {createLoginSession} from '../../plugins/loginSession';
// models
import login from '../login/models/login';
import register from '../login/models/register';
import forgetPassword from '../login/models/forgetPassword';
import userCenter from './models/userCenter';
// router
import router from './router';
// css
import './index.css';

let initialState = getWebState() || {
    login: {
        loginRedirect: '/'
    }
};
// 重置插件属性
if(initialState.loading) delete initialState.loading;// 重置loading
if(initialState.effectLock) delete initialState.effectLock;// 重置effectlock

const dvaApp = init({
    initialState: initialState,
    plugins: [
        createWebLocalStore(),
        createLoginSession(),
        createLoading(),
        createEffectLock()
    ],
    models: [
        login,
        register,
        forgetPassword,
        userCenter
    ],
    router: router,
    start: '#root'
});