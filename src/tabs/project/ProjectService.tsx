import React, {useCallback, useState} from "react";
import {Button, Collapse, ListGroup} from "react-bootstrap";
import Project from "./Project";
import UserList from "../user/UserList";
import {BsPersonFillAdd, BsTrash} from "react-icons/bs";
import AddUserToProject from "./AddUserToProjectForm";
import AddProjectForm from "./AddProject";
import User from "../user/User";

interface ProjectServiceProps {
    users: User[],
    projects: Project[],
    removeProjectCallback: (projectId: number) => void,
    addUserToProjectCallback: (projectId: number, userId: number) => Promise<void>
    removeUserToProject: (projectId: number, userId: number) => Promise<void>
    createProjectCallback: (project: Project) => Promise<void>
}

const ProjectService: React.FC<ProjectServiceProps> = (
    {
        users,
        projects,
        removeProjectCallback,
        addUserToProjectCallback,
        removeUserToProject,
        createProjectCallback
    }) => {
    const [expandedProjectIds, setExpandedProjectIds] = useState<Set<number>>(new Set())
    const [assignUserProjectId, setAssignUserProjectId] = useState<number>(-1);
    const [showProjectCreateForm, setShowProjectCreateForm] = useState<boolean>(false);


    const toggleProject = useCallback((projectId: number) => setExpandedProjectIds(prevExpandedProjects => {
        const newExpandedProjects = new Set(prevExpandedProjects);

        newExpandedProjects.has(projectId) ? newExpandedProjects.delete(projectId) : newExpandedProjects.add(projectId);

        return newExpandedProjects;
    }), []);

    return (
        <div className={"d-flex flex-column justify-content-center"}>
            <div className={"mx-auto"}>
                <ListGroup className={"bg-dark overflow-auto"} style={{maxHeight: "70vh", width: "80vw"}}>
                    {
                        projects.map(project =>
                            <ListGroup.Item className={"bg-dark text-white"} key={project.id}>
                                <div>
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <div onClick={() => toggleProject(project?.id ?? -1)}
                                             className={"flex-grow-1"}> {project.projectName} </div>
                                        <Button variant="outlined" color="success" key={project?.id + 'a'}
                                                onClick={() => removeProjectCallback(project?.id ?? -1)}>
                                            <BsTrash color="white" fontSize="1.5em"/>
                                        </Button>
                                        <Button variant="outlined" color="success" key={project?.id + 'b'}
                                                onClick={() => setAssignUserProjectId(project?.id ?? -1)}>
                                            <BsPersonFillAdd color="white" fontSize="1.5em"/>
                                        </Button>
                                        {project?.id === assignUserProjectId && <AddUserToProject
                                            show={project.id === assignUserProjectId}
                                            addUserToProject={addUserToProjectCallback}
                                            handleClose={() => setAssignUserProjectId(-1)}
                                            projectId={project?.id ?? -2}

                                        />}
                                    </div>

                                    <Collapse in={expandedProjectIds.has(project?.id ?? -2)}>
                                        <div>
                                            {
                                                expandedProjectIds.has(project?.id ?? -2) &&
                                                <UserList users={project.assignedUsers}
                                                          removeUser={(userId) => removeUserToProject(project?.id ?? -1, userId)}/>
                                            }
                                        </div>
                                    </Collapse>
                                </div>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </div>
            <Button className={"w-25 mx-auto"} variant="success" color="success"
                    onClick={() => setShowProjectCreateForm(true)}>
                Add Project <BsPersonFillAdd fontSize="1.5em"/>
            </Button>
            <AddProjectForm
                show={showProjectCreateForm}
                handleClose={() => setShowProjectCreateForm(false)}
                addProject={createProjectCallback}
            />
        </div>
    );
}

export default ProjectService;