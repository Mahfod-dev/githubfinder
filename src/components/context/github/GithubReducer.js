const githubReducer = (state, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return { ...state, users: action.payload, loading: true }

		case 'GET_USER_AND_REPOS':
			return {
				...state,
				user: action.payload.user,
				repos: action.payload.repos,
				loading: true,
			}
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
