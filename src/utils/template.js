import Map from '../class/Map';
import {clone} from './utils';
import {hashHistory} from 'dva/router';

function modelTemplate({currentPath, defaultState, namespace, reducers, effects, subscriptions, reset=true}) {
	let defaultStateTemp = defaultState;
	defaultStateTemp.shouldDoMap = new Map();
	let temp = {
		namespace: namespace,
		state: clone(defaultStateTemp),
		reducers: {
			shouldDo(state, {fnName, shouldDo}) {
				let stateClone = clone(state);
				let shouldDoMapTemp = stateClone.shouldDoMap;
				shouldDoMapTemp.put(fnName, shouldDo);
				return stateClone;
			},
			modelTemplateResetState() {
				return clone(defaultStateTemp);
			}
		},
		effects: {},
		subscriptions: {
			// 重置状态
			modelTemplateReset({dispatch, history}) {
				if(reset) {
					history.listen(({ pathname }) => {
				        if (pathname !== currentPath) {
				        	dispatch({type: 'modelTemplateResetState'});
				        }
					});
				}
			}
		}
	};
	for(let key in reducers) {
		temp.reducers[key] = reducers[key];
	}
	
	for(let key in effects) {
		let tempFn = effects[key];
		temp.effects[key] = function*(action, effects) {
			console.log(tempFn);
			yield* tempFn(action, effects);
		};
	}
	for(let key in subscriptions) {
		temp.subscriptions[key] = subscriptions[key];
	}
//	for(let fn in effects) {
//		console.log(fn)
//		temp.state.shouldDoMap.get();
//		fn();
//		
//	}
	return temp;
}

export default {
	modelTemplate: modelTemplate
}
