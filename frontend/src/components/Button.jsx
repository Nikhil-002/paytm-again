export const Button = ({label,onClick}) => {
    return <div>
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m3-2 mb-2 cursor-pointer" >
            {label}
        </button>
    </div>
}