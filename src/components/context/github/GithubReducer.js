const githubReducer = (state, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return { ...state, users: action.payload, loading: true }

		case 'GET_USER':
			return { ...state, user: action.payload, loading: true }
		case 'GET_REPOS':
			return { ...state, repos: action.payload, loading: true }
		case 'SET_LOADING': {
			return { ...state, loading: false }
		}
		case 'SET_CLEAR':
			return { ...state, users: [], loading: true }

		default:
			return state
	}
}

export default githubReducer
