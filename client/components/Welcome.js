import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome-wrapper">
        <div id="banner">
         <div className="banner_content">
           <p className="animated fadeInUp">Find the Perfect Mentor.</p>
           <Link to={"/signup"}><button className="btn-global" > Sign Up </button></Link>
         </div>
        </div>
        <div className="container-fluid welcome">
          <div className="row">
            <div className="callouts-header">
              <h1 className="header-tag">How It Works</h1>
            </div>
            <div id="callouts">
              <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">
                <div className="callout">
                  <i className="fa fa-comment-o" aria-hidden="true"></i>
                  <h2>Chat built In</h2>
                  <p>Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget.</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">
                <div className="callout">
                  <i className="fa fa-desktop" aria-hidden="true"></i>
                  <h2>Video Chat</h2>
                  <p>Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget.</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">
                <div className="callout">
                  <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                  <h2>Mentoring</h2>
                  <p>Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget.</p>
                </div>
              </div>
            </div>
          </div>
          <form className="test" action="/auth/linkedin" method="get">
            <input type="submit" value="LinkedIn" name="Submit" className="btn-global" />
          </form>
        </div>
        <div id="become_mentor" >
          <h1>Give back by becoming a mentor. Sign up today and help someone change thier life</h1>
          <Link to={"/become"}><button className="btn-accent" > Sign Up </button></Link>
        </div>
        <footer>
            <p>
              &copy; MentorMe Ent.
          </p>
          </footer>
      </div>
    );
  }
}
