import React from 'react'
import UserResults from '../components/users/UsersResults'
import UserSearch from '../components/users/UserSearch'

const Home = () => {
	return (
		<>
			{/* <h1 className='text-6xl'>Welcome</h1> */}
			<UserSearch />
			<UserResults />
		</>
	)
}

export default Home
