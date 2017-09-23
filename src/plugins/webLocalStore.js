import localStore from '../utils/localStore';
import {getState} from '../utils/app';

const WEB_STATE = 'WEB_STATE';

function setWebState() {
	localStore.set(WEB_STATE, getState());
}

function getWebState() {
	return localStore.get(WEB_STATE);console.log(state);
}

function removeWebState() {
	localStore.remove(WEB_STATE);
}

function createWebLocalStore() {

    function onStateChange() {
        setWebState();
    }

    return {
        onStateChange
    };

}

export default {
	setWebState,
	getWebState,
	removeWebState,
	createWebLocalStore
};