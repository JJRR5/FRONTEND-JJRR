
const Error = ({children}) => {
    return (
        <div>
            <p className="text-center bg-red-600 w-full text-white rounded-md py-2 uppercase font-bold mb-5">{children}</p>
        </div>
    )
}

export default Error