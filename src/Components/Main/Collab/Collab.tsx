import { useEffect, useState } from "react";
import { UsersModel } from "../../../model/TaskModel";
import { apiService } from "../../../Service/ApiService";
import "./Collab.css";
import CollabProfile from "./CollabProfile/CollabProfile";

function Collab(): JSX.Element {
    const [users, setUsers] = useState<UsersModel[]>([])

    async function searchUser(e: any) {
        const value = e.target.value;
        if (value === "") {
            setUsers([]);
            return
        } else {
            let usersRes = await (await apiService.searchUserToCollab(value)).data;
            setUsers(usersRes)
        }
    }

    return (
        <div className="Collab">
            <div className="CollabSearchUsers">
                <input onInput={(e) => searchUser(e)} type="text" placeholder="Search users to collab..." />
                <button type="submit">Search</button>
            </div>

            <div className="CollabDisplaySearchedUsers">
                {
                    users ?
                        users.map((u: UsersModel) => (
                            <CollabProfile key={u.id} user={u} />
                        ))
                        : <></>}
            </div>
        </div>
    );
}

export default Collab;
