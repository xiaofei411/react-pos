import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from './View';
import * as usersSelector from 'data/selectors/players';
import { getUserList, searchUser } from 'actions/user';
import CreateUser from 'components/modals/CreateUser';
import { show as showModal } from 'actions/modal';
import modals from 'components/modals';
import { formValueSelector } from 'redux-form';
import { formName as searchFormName } from 'components/forms/SearchForm';
import { getWindowData } from 'data/selectors/window';

const __DEFAULT_USERS_PER_PAGE = 10;

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
    };
  }

  isUsersSearchMode = () =>
    typeof this.props.usersSearchFormTerm === typeof "typedef"
    && this.props.usersSearchFormTerm.length > 0;

  getUsersList = (page, number) => this.props.dispatch(
    getUserList({
      page,
      number
    })
  );

  searchUsers = (term, page, number) => this.props.dispatch(
    searchUser({
      term,
      page,
      number
    })
  );

  resetUsersList = () => {
    const { usersTotalPages } = this.props;

    if (usersTotalPages) return;
    
    this.getUsersList(1, __DEFAULT_USERS_PER_PAGE);
  }

  componentWillMount() {
    const { currentUsersPage, usersPerPage } = this.props;
    this.getUsersList(1, __DEFAULT_USERS_PER_PAGE);
  }

  onUsersPageChanged = page => {
    const { usersPerPage, usersSearchFormTerm } = this.props;

    return !this.isUsersSearchMode() ?
      this.getUsersList(page, usersPerPage) :
      this.searchUsers(usersSearchFormTerm, page, usersPerPage);
  }

  onUsersPerPageChanged = per => {
    const { usersSearchFormTerm } = this.props;

    return !this.isUsersSearchMode() ?
      this.getUsersList(1, per) :
      this.searchUsers(usersSearchFormTerm, 1, per);
  }

  onSearchTermChanged = model => {
    const { dispatch, usersPerPage, currentUsersPage } = this.props;

    if (!model.term || model.term.toString().trim().length == 0)
      return this.getUsersList(currentUsersPage, usersPerPage);

    this.searchUsers(model.term, currentUsersPage, usersPerPage);
  };

  showModal = (modalName) => this.props.dispatch(showModal(modalName));

  findUser = (userId) => {
    const { users } = this.props;

    return users.find(user => user.playerNumber === userId)
  }

  showUserDetails = (userId) => {
    const userDetails = this.findUser(userId);

    this.setState({
      selectedUser: userDetails
    });
    this.showModal(modals.TABLE_DETAILS);
  }

  render() {
    const { currentUsersPage, usersPerPage, usersTotalPages, windowData } = this.props;

    const usersTableActions = {
      onUsersPageChanged: this.onUsersPageChanged,
      onSearchTermChanged: this.onSearchTermChanged,
      onUsersPerPageChanged: this.onUsersPerPageChanged
    };

    const pagination = {
      page: currentUsersPage,
      perPage: usersPerPage,
      totalPages: usersTotalPages
    };

    return ([
      <CreateUser
        key="0m"
        id={modals.USER_CREATE}
        showModal={this.showModal} />,

      <View
        {...this.props}
        key="1"
        showModal={this.showModal}
        usersTableActions={usersTableActions}
        pagination={pagination}
        isMobile={windowData.isMobile}
        selectedUser={this.state.selectedUser}
        showUserDetails={this.showUserDetails}
        resetUsersList={this.resetUsersList}
      />
    ]);
  }
}


export default connect(

  state => {
    let searchFormSelector = formValueSelector(searchFormName);
    let searchFormVals = searchFormSelector(state, 'term');

    return {
      currentUsersPage: usersSelector.getCurrentPage(state),
      usersPerPage: usersSelector.getPerPage(state),
      usersTotalPages: usersSelector.getTotalPages(state),
      usersSearchFormTerm: searchFormVals ? searchFormVals.term : undefined,
      users: usersSelector.getList(state) || [],
      windowData: getWindowData(state)
    };
  },

  dispatch => ({
    dispatch
  })

)(Customers);
