import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
		  <Link to="/" className="item">
		  	Streamy
		  </Link>
		   <div className="right menu">
		   	<Link to="/streams/list" className="item">
		   		All Steams
		   	</Link>
		   </div>
		   <Link to="/" className="item">
		   		<GoogleAuth />
		   </Link>
		</div>
		);
};

export default Header; 