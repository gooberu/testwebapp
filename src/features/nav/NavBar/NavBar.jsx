import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };
  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
  };
  render() {
    const { auth, profile} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            GooberU
          </Menu.Item>
          <Menu.Item as={NavLink} to="/subjects" name="Subjects" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated &&
          <Menu.Item as={NavLink} to="/sessions" name="Sessions" />}
          {authenticated &&
          <Menu.Item as={NavLink} to="/people" name="People" />}
          {authenticated &&
          <Menu.Item>
            <Button
              as={Link}
              to="/createSession"
              floated="right"
              positive
              inverted
              content="Create Session"
            />           
            <Button
            as={Link}
            to="/createSubject"
            floated="right"
            positive
            inverted
            content="Create Subject"
            />
          </Menu.Item>}
          {authenticated ? (
            <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
};

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
