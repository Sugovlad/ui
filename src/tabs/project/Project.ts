import User from "../user/User";

export default interface Project {
    id: number|null;
    projectName: string;
    status: number;
    assignedUsers: User[];
}