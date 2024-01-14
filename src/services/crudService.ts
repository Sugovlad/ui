import Project from "../tabs/project/Project";
import axios, {AxiosResponse} from "axios";
import User from "../tabs/user/User";
import {API_HOST} from "../consts/consts";


 const PROJECT_API= `${API_HOST}/admin-service/project`;
 const USER_API = `${API_HOST}/admin-service/user`;
export const getProject = (updateProjectsCallback: (projects: Project[]) => void) => {
    axios.get<Project[]>(PROJECT_API)
        .then(({data}) => updateProjectsCallback(data))
        .catch(error => console.error('Error fetching projects', error));
}

export const removeProject = (projectId: number, projects: Project[], setProjects: (projects: Project[]) => void) => {
    axios.delete<Project[]>(`${PROJECT_API}/${projectId}`)
        .then(() => {
            setProjects(projects.filter(project => project.id !== projectId))
        })
        .catch(error => console.error('Error deleting projects', error));
}

export const createProject = (project: Project, previousProject: Project[], setProjects: (project: Project[]) => void) =>
    axios.post(`${PROJECT_API}`, project)
        .then((response: AxiosResponse<Project>) => setProjects([...previousProject, response.data]))
        .catch(error => console.error('Error adding user', error))

export const fetchUserList = (setUsers: (users: User[]) => void) =>
    axios.get<User[]>(USER_API)
        .then(({data}) => setUsers(data))
        .catch(error => console.error('Error fetching users', error));


export const addUserToProject = (
    projectId: number,
    userId: number,
    projects: Project[],
    setProjects: (project: Project[]) => void
) =>
    axios.put(`${PROJECT_API}/${projectId}/add-user/${userId}`)
        .then(({data}: AxiosResponse<Project>) => setProjects(updateProjectUserList(projects, data)))
        .catch(error => console.error('Error adding user to project', error));

export const removeUserFromProject = (
    projectId: number,
    userId: number,
    projects: Project[],
    setProjects: (project: Project[]) => void
) =>
    axios.put(`${PROJECT_API}/${projectId}/remove-user/${userId}`)
        .then(({data}: AxiosResponse<Project>) => setProjects(updateProjectUserList(projects, data)))
        .catch(error => console.error('Error fetching projects', error))

function updateProjectUserList(projects: Project[], data: Project) {
    return projects.map((project) =>
        project.id !== data.id ?
            project :
            {...project, assignedUsers: data.assignedUsers}
    );
}

export const addUser = (user: User, users: User[], setUsers: (users: User[]) => void) => {
    axios.post<User>(`${USER_API}`, user)
        .then(({data}) => setUsers([...users, data]))
        .catch(error => console.error('Error fetching users', error));
};

export const removeUser = (userId: number, users: User[], setUsers: (user: User[]) => void) => {
    axios.delete<User>(`${USER_API}/${userId}`, )
        .then((response) => setUsers(users.filter(user=> user.id !== userId)))
        .catch(error => console.error('Error fetching users', error));
}
