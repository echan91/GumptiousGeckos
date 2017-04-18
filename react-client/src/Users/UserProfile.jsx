import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUserProjects, toggleEditMode, updateDescriptionText, saveChanges } from './userActions';
import { updateMainProject } from '../ProjectIdeas/projectActions';

export class UserProfile extends React.Component {

  componentWillMount() {
    const { user, getUserProjects } = this.props;
    getUserProjects(user[0].id);
  }

  render() {
    const { user, userProjects, editMode,
            descriptionText = user[0].description,
            updateMainProject, toggleEditMode,
            updateDescriptionText, saveChanges } = this.props;

    let description, editModeButton;

    if (!editMode) {
      description = (
        <div className="col-md-10">
          {descriptionText}
        </div>
      );
      editModeButton = (
        <div className="col-md-2 text-right">
          <button
            type="button"
            className="btn btn-default"
            onClick={toggleEditMode}
          >
            <span className="glyphicon glyphicon-edit" />
          </button>
        </div>
      );
    } else {
      description = (
        <div className="col-md-10">
          <textarea
            rows="4"
            cols="37"
            value={descriptionText}
            onChange={(e) => { updateDescriptionText(e.target.value); }}
          />
        </div>
      );
      editModeButton = (
        <div className="col-md-2 text-right">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => { toggleEditMode(); saveChanges(descriptionText); }}
          >
            <span className="glyphicon glyphicon-floppy-saved" />
          </button>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="col-md-4">
          <div className="picture">
            <img src={user[0].picture} />
            <div className="text-left">
              {description}
              {editModeButton}
              <div className="col-md-12">
                <h5>Name: {user[0].name}</h5>
                <h5>{'Github: '}
                  <a href={'https://www.github.com/' + user[0].username} target="_blank">
                    {user[0].username}
                  </a>
                </h5>
                <h5>Email: {user[0].email}</h5>
                <h5>Points: {user[0].points}</h5>
              </div>
            </div>
            <div className="text-left col-md-12">
              <h4 className="underline">Tags</h4>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="text-center">Projects</h1>
          <div className="list-group">
            {
              userProjects && userProjects.map(project =>
                <Link to={'/projects/' + project.id} key={project.id}>
                  <button
                    type="button"
                    className="list-group-item"
                    onClick={() => { updateMainProject(project); }}
                  >
                    <span>{project.title}</span>
                    <h4>{project.description}</h4>
                  </button>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.navBar.user,
    userProjects: state.userProfile.userProjects,
    editMode: state.userProfile.editMode,
    descriptionText: state.userProfile.descriptionText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProjects: id => dispatch(fetchUserProjects(id)),
    updateMainProject: project => dispatch(updateMainProject(project)),
    toggleEditMode: () => dispatch(toggleEditMode()),
    updateDescriptionText: text => dispatch(updateDescriptionText(text)),
    saveChanges: text => dispatch(saveChanges(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
