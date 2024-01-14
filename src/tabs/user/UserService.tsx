import React, {useState} from "react";
import User from "./User";
import UserList from "./UserList";
import {Button} from "react-bootstrap";
import {BsPersonFillAdd} from "react-icons/bs";
import AddUserForm from "./AddUserForm";

interface UserServiceProps {
    users: User[],
    addUserCallback: (user: User) => void,
    removeUserCallback: (userId: number) => void
}


const UserService: React.FC<UserServiceProps> = ({users, addUserCallback, removeUserCallback}) => {
    const [showUserCreateForm, setShowUserCreateForm] = useState<boolean>(false);

    return (
        <div className={"d-flex flex-column justify-content-center"}>
            <UserList users={users} removeUser={removeUserCallback}/>
            <Button className={"w-25 mx-auto"} variant="success" color="success"
                    onClick={() => setShowUserCreateForm(true)}>
                Add User <BsPersonFillAdd fontSize="1.5em"/>
            </Button>
            <AddUserForm
                show={showUserCreateForm}
                addUserCallback={addUserCallback}
                handleClose={() => setShowUserCreateForm(false)}
            />
        </div>

    );
}

export default UserService;