import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Users = () => {

    const [users,setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const location = useLocation();
    const {firstName, lastName} = location.state || {};

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            })
    },[filter])

  return (
    <div className="px-2">
      <div className="font-bold text-lg">Users </div>
      <div className="my-2">
        <input className="w-full px-2 py-1 border rounded border-slate-200" 
        onChange={(e) => {
            setFilter(e.target.value)
        }}
         type="text" placeholder="Search Users....." />
      </div>
      <div>
        {users
            .filter((user) => user.firstName !== firstName || user.lastName !== lastName)
                .map((user) => (
                    <User key = {user._id} user = {user} />
                ))
            }
      </div>
    </div>
  );
};

function User({user}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={() => {
                    navigate("/send?id="+ user._id + "&name=" + user.firstName)
                }}
                label = {"Send Money"} />
            </div>
        </div>
    )
}
