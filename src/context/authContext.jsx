import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,	// muestra a usuario ventana para seleccionar con que se quiere logear
	sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../firebase.js'

const authContext = createContext()

export const useAuth = () => {
	const context = useContext(authContext)
	if (!context) throw new Error('There is no auth provider')
	return context
}

export function AuthProvider({ children }) {

	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
	const logOut = () => {
		return signOut(auth)
	}
	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider()
		return signInWithPopup(auth, googleProvider)
	}
	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)
		})
		return () => unsuscribe()
	}, [])

	return (
		<authContext.Provider value={{ signUp, login, user, logOut, loading, loginWithGoogle, resetPassword }}>
			{children}
		</authContext.Provider>
	)
}
