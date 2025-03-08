export const Appbar = ({name}) => {
    return <div className="shadow h-14 flex justify-between px-1">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="bg-slate-200 flex justify-center h-10 w-10 rounded-full mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0].toUpperCase()}
                </div>
            </div>
        </div>
    </div>
}