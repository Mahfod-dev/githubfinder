const githubReducer = (state, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return { ...state, users: action.payload, loading: true }
		case 'SET_LOADING': {
			return { ...state, loading: false }
		}

		default:
			return state
	}
}

export default githubReducer