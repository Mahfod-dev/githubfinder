import { createContext, useState, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: true,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	const searchUsers = async (text) => {
		setLoading()

		const params = new URLSearchParams({
			q: text,
		})

		const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `${GITHUB_TOKEN}`,
			},
		})

		const { items } = await response.json()

		dispatch({
			type: 'GET_USERS',
			payload: items,
		})
	}
	const singleUser = async (login) => {
		setLoading()

		const response = await fetch(`${GITHUB_URL}/users/${login}`, {
			headers: {
				Authorization: `${GITHUB_TOKEN}`,
			},
		})

		if (response.status === 404) {
			window.location('/notfound')
		} else {
			const data = await response.json()

			dispatch({
				type: 'GET_USER',
				payload: data,
			})
		}
	}
	const getRepos = async (login) => {
		setLoading()

		const params = new URLSearchParams({
			sort: 'created',
			per_page: 10,
		})

		const response = await fetch(
			`${GITHUB_URL}/users/${login}/repos?${params}`,
			{
				headers: {
					Authorization: `${GITHUB_TOKEN}`,
				},
			}
		)

		const data = await response.json()

		dispatch({
			type: 'GET_REPOS',
			payload: data,
		})
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	const clearUsers = () => dispatch({ type: 'SET_CLEAR' })

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user: state.user,
				repos: state.repos,
				searchUsers,
				clearUsers,
				singleUser,
				getRepos,
			}}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
