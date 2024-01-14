import React from 'react';
import {ListGroup, Button} from 'react-bootstrap';
import {BsPersonFillSlash} from 'react-icons/bs';
import User from "./User";

interface UserListProps {
    users: User[];
    removeUser: (userId: number) => void;
}

function UserList({users, removeUser}: UserListProps) {

    return (
        <div style={{display: "flex", justifyContent: 'center'}}>
            <ListGroup className={"bg-dark overflow-auto"} style={{maxHeight: "70vh",  width: "80vw" }}>
                {users?.map(user => (
                    <ListGroup.Item className={"bg-light "} key={user.id}>
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <div>{user.fullName}</div>

                            <div>
                                <Button variant="outlined" onClick={()=> removeUser(user?.id ?? -1)}>
                                    <BsPersonFillSlash color="black" fontSize="1.5em"/>
                                </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default UserList;
