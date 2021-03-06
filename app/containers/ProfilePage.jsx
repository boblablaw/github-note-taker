import React        from 'react';
import Router       from 'react-router';
import UserProfile  from '../components/Github/UserProfile';
import Repos        from '../components/Github/Repos';
import Notes        from '../components/Notes/Notes';
import Firebase     from 'firebase';
import Rebase       from 're-base';
import helpers      from '../utils/helpers';

var base = Rebase.createClass('https://note-taker-github.firebaseio.com');

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
	}
	init(){
    this.ref = base.syncState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    helpers.getGithubInfo(this.router.getCurrentParams().username)
      .then((dataObj) => {
        this.setState({
          bio: dataObj.bio,
          repos: dataObj.repos
        });
      });
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    this.init();
  }
  handleAddNote(newNote){
    this.setState({
      notes: this.state.notes.concat([newNote])
    })
  }
  render(){
    var username = this.router.getCurrentParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
        </div>
      </div>
    )
  }
};

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};