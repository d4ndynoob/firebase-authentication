import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import Alert from './Alert'

const Register = () => {
	const { signUp } = useAuth() //usamos el contexto de auth
	const navigate = useNavigate() // usamos la navegacion

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const [messageAlert, setMessageAlert] = useState(null)

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setMessageAlert({})
		// validamos campos
		if (!user.email || !user.password)
			return setMessageAlert({
				text: 'Please fill in all the fields',
				color: 'red',
			})
		// validamos correo electronico
		if(!validarEmail()) return setMessageAlert({
			text: 'Please type a real email',
			color: 'red'
		})
		try {
			await signUp(user.email, user.password)
			navigate('/')
		} catch (error) {
			if (error.code === 'auth/invalid-email')
				setMessageAlert({ text: 'Correo Inválido', color: 'red' })
			else if (error.code === 'auth/weak-password')
				setMessageAlert({ text: 'Contraseña débil', color: 'red' })
			else if (error.code === 'auth/internal-error')
				setMessageAlert({ text: 'Error interno', color: 'red' })
			else if (error.code === 'auth/email-already-in-use')
				setMessageAlert({ text: 'El correo ya esta en uso', color: 'red' })
		}
	}

	const validarEmail = () => {
		const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
		if(validEmail.test(user.email)) return true
		return false
	}

	return (
		<div className='w-full max-w-xs m-auto'>
			{messageAlert && (
				<Alert message={messageAlert.text} color={messageAlert.color} />
			)}
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
			>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='youremail@company.ltd'
						onChange={handleChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						onChange={handleChange}
						placeholder='******'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>

				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline focus:outline-none text-sm'>
					Register
				</button>
			</form>
			<p className='my-4 text-sm flex justify-between'>
				I have an account{' '}
				<Link to='/login' className='hover:font-semibold'>
					Login
				</Link>
			</p>
		</div>
	)
}

export default Register
