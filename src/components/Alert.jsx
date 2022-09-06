const Alert = ({ message, color }) => {
	return (
		<div className={`${color == 'red' ? 'bg-red-100' : 'bg-green-100'} border ${color == 'red' ? 'border-red-400' : 'border-green-400'} ${color == 'red' ? 'text-red-700' : 'text-green-700'} px-4 py-3 rounded relative mb-2 text-center`}>
			<span className="sm:inline-block">{message}</span>
		</div>
	)
}

export default Alert
