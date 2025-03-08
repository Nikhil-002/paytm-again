export const Balance = ({value}) => {
    return <div className="flex justify-center pt-3">
        <div className="font-bold text-lg">
            Balance - 
        </div>
        <div className="font-semibold ml-2 text-lg">
        ₹ {value.toFixed(2)}
        </div>
    </div>
}