import React from 'react';
import { connect } from 'react-redux';

import ProjectBoardEntry from './ProjectBoardEntry.jsx';
import { addProject, fetchProjects, updateMainProject } from './projectActions';

export class ProjectBoard extends React.Component {

  redirectToProjectCreation() {
    // Create Project button hardcoded to create dummy data
    const { createProject } = this.props;
    createProject();
  }

  componentWillMount() {
    const { getProjects } = this.props;
    getProjects();
  }

  render() {
    const { projects, updateMainProject } = this.props;

    return (
      <div>
        <div className="col-md-10 col-sm-9 col-xs-9">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#">Top</a>
            </li>
            <li>
              <a href="#">Trending</a>
            </li>
            <li>
              <a href="#">New</a>
            </li>
          </ul>
          {
            projects && projects.map((project) =>
              <ProjectBoardEntry
                key={project.id}
                project={project}
                updateMainProject={updateMainProject}
              />
            )
          }
        </div>
        <div className="col-md-2 col-sm-3 col-xs-3">
          <div className="text-center bordered">
            <h2>Have an idea?</h2>
            <button
              onClick={this.redirectToProjectCreation.bind(this)}
              className="btn btn-primary btn-lg"
            >Create Project</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
    createProject: () => dispatch(addProject()),
    updateMainProject: (project) => dispatch(updateMainProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);