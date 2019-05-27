import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '264461794532-9nlvk97asg9971gd61234cg53frnanll.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			})
		});
	}

	onAuthChange = (isSignedIn) => {
		if(isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());   // pass the userId who is signed as the user
		} else {
			this.props.signOut();
		}
	}

	onSignInCheck = () => {
		this.auth.signIn();
	};

	onSignOutCheck = () => {
		this.auth.signOut();
	}

	renderAuthButton() {
		if(this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutCheck} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
				)
		} else {
			return (
				<button onClick={this.onSignInCheck} className="ui green google button">
					<i className="google icon" />
					Sign In
				</button>
				)
		}
	}

	render() {
		return <div>{ this.renderAuthButton() }</div>
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
 