import { useEffect, useState } from "react"
import {Appbar} from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useLocation } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {

    const [balance, setBalance] = useState(0);
    const location = useLocation();
    const {username} = location.state || {}

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", 
            {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            }
        )
        .then(response => {
            setBalance(response.data.balance);
        })
    },[[balance]])

    return <div>
        <Appbar name={username} />
        <div>
            <Balance value = {balance} />
            <Users />
        </div>
    </div>
}