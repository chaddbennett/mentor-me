import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMentors, fetchModifiedMentors } from '../actions/learners';
import { mentorSortPrefs } from '../utils/utils';

/* Sub Components */
import MentorCard from './MentorCard';
import Search from './Search';
import LearnerPreferences from './LearnerPreferences';

class LearnerDashboard extends Component {

  componentWillMount() {

    // this.props.fetchModifiedMentors();
  }

  renderMentors() {
    let { mentors, auth } = this.props;
    return mentors.map((mentor, i) => {
      if (mentor) {
        let mentorLink = `/learner/${auth.username}/mentor/${mentor.username}/profile`;
        return <MentorCard key={i} mentor={mentor} link={mentorLink} />;
      }
    });
  }

  render() {
    return (
      <div className="spacer30">
        <div className="container-fluid learner">
          <div className="row">
            <div className="col-sm-3">
              <LearnerPreferences id={this.props.auth.id} />
            </div>
            <div className="col-sm-9">
              <div className="row search">
                <Search />
              </div>
                {this.renderMentors()}
            </div>
          </div>
        </div>
      <div className="spacer-bottom" />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    mentors: state.learner.modifiedMentors,
    auth: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, { fetchMentors, fetchModifiedMentors })(LearnerDashboard);
