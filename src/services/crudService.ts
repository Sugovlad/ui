import Project from "../tabs/project/Project";
import axios, {AxiosError, AxiosResponse} from "axios";
import User from "../tabs/user/User";
import {API_HOST} from "../consts/consts";
import {ErrorDescription} from "../error/ErrorMessage";


const PROJECT_API = `${API_HOST}/api-service/project`;
const USER_API = `${API_HOST}/api-service/user`;
export const getProject = (
    updateProjectsCallback: (projects: Project[]) => void,
    errorHandler: (error: ErrorDescription) => void
) => {
    axios.get<Project[]>(PROJECT_API)
        .then(({data}) => updateProjectsCallback(data))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to get projects';
            })
        );
}

export const removeProject = (
    projectId: number,
    projects: Project[],
    setProjects: (projects: Project[]) => void,
    setErrors: (value: (((prevState: ErrorDescription[]) => ErrorDescription[]) | ErrorDescription[])) => void,
    errorHandler: (error: ErrorDescription) => void
) => {
    axios.delete<Project[]>(`${PROJECT_API}/${projectId}`)
        .then(() => {
            setProjects(projects.filter(project => project.id !== projectId))
        })
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to delete project';
            })
        );
}

export const createProject = (
    project: Project,
    previousProject: Project[],
    setProjects: (project: Project[]) => void,
    errorHandler: (error: ErrorDescription) => void
) =>
    axios.post(`${PROJECT_API}`, project)
        .then((response: AxiosResponse<Project>) => setProjects([...previousProject, response.data]))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to create project';
            })
        )

export const fetchUserList = (
    setUsers: (users: User[]) => void,
    errorHandler: (error: ErrorDescription) => void
) =>
    axios.get<User[]>(USER_API)
        .then(({data}) => setUsers(data))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                    errorMessage = message;
                    header = 'Failed to get users';
                }
            )
        );


export const addUserToProject = (
    projectId: number,
    userId: number,
    projects: Project[],
    setProjects: (project: Project[]) => void,
    errorHandler: (error: ErrorDescription) => void
) =>
    axios.put(`${PROJECT_API}/${projectId}/add-user/${userId}`)
        .then(({data}: AxiosResponse<Project>) => setProjects(updateProjectUserList(projects, data)))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to assign user to project';
            })
        );

export const removeUserFromProject = (
    projectId: number,
    userId: number,
    projects: Project[],
    setProjects: (project: Project[]) => void,
    errorHandler: (error: ErrorDescription) => void
) =>
    axios.put(`${PROJECT_API}/${projectId}/remove-user/${userId}`)
        .then(({data}: AxiosResponse<Project>) => setProjects(updateProjectUserList(projects, data)))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to remove user from project';
            })
        )

export const addUser = (
    user: User,
    users: User[],
    setUsers: (users: User[]) => void,
    errorHandler: (error: ErrorDescription) => void
) => {
    axios.post<User>(`${USER_API}`, user)
        .then(({data}) => setUsers([...users, data]))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to create user';
            })
        );
};

export const removeUser = (
    userId: number,
    users: User[],
    setUsers: (user: User[]) => void,
    errorHandler: (error: ErrorDescription) => void
) => {
    axios.delete<User>(`${USER_API}/${userId}`,)
        .then((response) => setUsers(users.filter(user => user.id !== userId)))
        .catch(
            ({message}: AxiosError) => errorHandler(new class implements ErrorDescription {
                errorMessage = message;
                header = 'Failed to delete user';
            })
        );
}


function updateProjectUserList(projects: Project[], data: Project) {
    return projects.map((project) =>
        project.id !== data.id ?
            project :
            {...project, assignedUsers: data.assignedUsers}
    );
}
