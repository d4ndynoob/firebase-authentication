import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import Alert from './Alert'

const Login = () => {
	const { login, loginWithGoogle, resetPassword } = useAuth() //usamos el contexto de auth
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
			await login(user.email, user.password)
			navigate('/')
		} catch (error) {
			if (error.code === 'auth/invalid-email')
				setMessageAlert({ text: 'Correo Inválido', color: 'red' })
			else if (error.code === 'auth/internal-error')
				setMessageAlert({ text: 'Error interno', color: 'red' })
			else if (error.code === 'auth/user-not-found')
				setMessageAlert({ text: 'No se encontro el usuario', color: 'red' })
			else if (error.code === 'auth/wrong-password')
				setMessageAlert({ text: 'Contraseña incorrecta', color: 'red' })
		}
	}

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle()
			navigate('/')
		} catch (error) {
			if (error.code === 'auth/operation-not-allowed')
				setMessageAlert({
					text: 'El acceso con Google no esta habilitado',
					color: 'red',
				})
		}
	}

	const handleResetPassword = async () => {
		if (!user.email)
			return setMessageAlert({ text: 'Please enter your email', color: 'red' })
		try {
			await resetPassword(user.email)
			setMessageAlert({
				text: 'We sent you a email with a link to reset your password',
				color: 'green',
			})
		} catch (error) {
			if (error.code === 'auth/invalid-email')
				setMessageAlert({ text: 'Correo Inválido', color: 'red' })
			else if (error.code === 'auth/user-not-found')
				setMessageAlert({ text: 'Usuario no encontrado', color: 'red' })
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

				<div className='flex items-center justify-between'>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline focus:outline-none text-sm'>
						Login
					</button>

					<a
						href='#'
						className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						onClick={handleResetPassword}
					>
						Forgot Password
					</a>
				</div>
			</form>
			<p className='my-4 text-sm flex justify-between'>
				Don't have an account{' '}
				<Link to='/register' className='hover:font-semibold'>
					Register
				</Link>
			</p>
			<button
				onClick={handleGoogleLogin}
				className='bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full'
			>
				Login with Google
			</button>
		</div>
	)
}

export default Login
