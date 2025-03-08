import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {

    const [searchParam,] = useSearchParams();
    const id = searchParam.get("id")
    const name = searchParam.get("name")
    const [amount, setAmount] = useState("")

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-2xl">
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-3xl font-bold text-center">
                Send Money
            </h2>
          </div>
          <div>
            <div className="flex items-center space-x-4">
                <div className="bg-green-500 flex items-center justify-center rounded-full w-12 h-12">
                    <span className="text-2xl text-white">
                        {name[0].toUpperCase()}
                    </span>
                </div>
                <h3 className="text-2xl font-semibold">
                    {name}
                </h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="amount">
                        Amount (in Rs)
                    </label>
                    <input className="flex bg-background rounded-md border border-input h-10 w-full px-3 py-2 text-sm"
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }} 
                    type="number"
                    min ="0"
                    id = "amount"
                    placeholder="Enter Amount" />
                </div>
                <button className="bg-green-500 text-white px-4 py-2 w-full rounded-md text-sm font-medium transition-colors ring-offset-background flex justify-center cursor-pointer" 
                onClick={() => {
                    axios.post("http://localhost:3000/api/v1/account/transfer",
                        {
                            to : id,
                            amount: parseInt(amount)  // <----------------- ****** ONE OF THE IMPORTANT PART ******
                        }, {
                            headers : {
                                Authorization : "Bearer " + localStorage.getItem("token")
                            }
                        }
                    )
                    alert("Transfer Successfull")
                }}>
                    Initiate Transfer
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
};
