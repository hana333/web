const currentPath = '/personReport';

const defaultState = {
	avgCompTime: undefined,// 平均完成时间异常
	avgCorr: undefined,// 平均正确率异常
	timeDis: undefined,// 完成时间分布异常
	corrDis: undefined,// 正确率分布异常
	outDeadLine: undefined,// 逾期未交人数异常
	avgQuestionCorr: undefined,// 题目平均正确率异常
	state: 1,// 1扫描, 2健康, 3预警, 4异常
};

export default {

	namespace: 'personReport',
	
	state: {...defaultState},
	
	reducers: {
		
		changeAvgCompTime(state, {payload}) {
			return {...state, ...{avgCompTime: payload}}
		},
		
		changeAvgCorr(state, {payload}) {
			return {...state, ...{avgCorr: payload}}
		},
		
		changeTimeDis(state, {payload}) {
			return {...state, ...{timeDis: payload}}
		},
		
		changeCorrDis(state, {payload}) {
			return {...state, ...{corrDis: payload}}
		},
		
		changeOutDeadLine(state, {payload}) {
			return {...state, ...{outDeadLine: payload}}
		},
		
		changeAvgQuestionCorr(state, {payload}) {
			return {...state, ...{avgQuestionCorr: payload}}
		},
		
		changeState(state, {payload}) {
			return {...state, ...{state: payload}}
		},
		
	},
	
	effects: {
		
		*init(action, {put}) {
			yield new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
			yield put({type: 'changeAvgCompTime', payload: 10});
			yield new Promise((resolve) => {
				setTimeout(resolve, 1500);
			});
			yield put({type: 'changeAvgCorr', payload: 10});
			yield new Promise((resolve) => {
				setTimeout(resolve, 500);
			});
			yield put({type: 'changeTimeDis', payload: 10});
			yield new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
			yield put({type: 'changeCorrDis', payload: 10});
			yield new Promise((resolve) => {
				setTimeout(resolve, 1200);
			});
			yield put({type: 'changeOutDeadLine', payload: 10});
			yield new Promise((resolve) => {
				setTimeout(resolve, 800);
			});
			yield put({type: 'changeAvgQuestionCorr', payload: 10});
			yield put({type: 'changeState', payload: 2});
		}
		
	},
	
	subscriptions: {
		
		reset({dispatch, history}) {
			history.listen(({ pathname }) => {
		        if (pathname === currentPath) {
		        	dispatch({type: 'init'});
		        }
			});
		}
		
	},
	
}