import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
		<div className='bg-slate-300 h-screen flex text-black'>
			<AuthProvider>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
