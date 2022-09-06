import { useAuth } from '../context/authContext'

const Home = () => {
	const { user, logOut, loading } = useAuth()

	console.log(user)

	const handleLogOut = async () => {
		await logOut()
	}

	if (loading) return <h1>Loading</h1>
	return (
		<div className='w-full max-w-sm m-auto text-black'>
			<div className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <h1 className='text-xl mb-4'>Welcome {user.displayName || user.email}</h1>
				
				<button onClick={handleLogOut}  className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black'>Logout</button>
			</div>
		</div>
	)
}

export default Home
