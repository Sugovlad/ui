import React, {useCallback, useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import ProjectService from "./tabs/project/ProjectService";
import UserService from "./tabs/user/UserService";
import {PROJECT_TAB, USER_TAB} from "./consts/consts";
import User from "./tabs/user/User";
import {
    addUser,
    addUserToProject, createProject,
    fetchUserList, getProject,
    removeProject,
    removeUser,
    removeUserFromProject
} from "./services/crudService";
import Project from "./tabs/project/Project";

function Dashboard() {
    const [activeTab, setActiveTab] = useState(PROJECT_TAB);
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        fetchUserList(setUsers)
    }, []);

    useEffect(() => {
        getProject(setProjects)
    }, [users]);

    const addUserCallback = useCallback((user: User) => addUser(user, users, setUsers), [users]);
    const removeUserCallback = useCallback((userId: number) => removeUser(userId, users, setUsers), [users]);
    const removeProjectCallback = useCallback((projectId: number) => removeProject(projectId, projects, setProjects), [projects]);
    const addUserToProjectCallback = useCallback((projectId: number, userId: number) => addUserToProject(projectId, userId, projects, setProjects), [projects]);
    const removeUserToProject = useCallback((projectId: number, userId: number) => removeUserFromProject(projectId, userId, projects, setProjects), [projects])
    const createProjectCallback = useCallback((project: Project) => createProject(project, projects, setProjects), [projects])

    return (
        <Tabs
            defaultActiveKey={activeTab}
            className="mb-3"
        >

            <Tab eventKey={PROJECT_TAB} title="Projects" onClick={() => setActiveTab(PROJECT_TAB)}>
                <ProjectService
                    users={users}
                    projects={projects}
                    removeProjectCallback={removeProjectCallback}
                    addUserToProjectCallback={addUserToProjectCallback}
                    removeUserToProject={removeUserToProject}
                    createProjectCallback={createProjectCallback}
                />
            </Tab>

            <Tab eventKey={USER_TAB} title="Users" onClick={() => setActiveTab(USER_TAB)}>
                <UserService
                    users={users}
                    addUserCallback={addUserCallback}
                    removeUserCallback={removeUserCallback}
                />
            </Tab>
        </Tabs>
    );
}

export default Dashboard;
