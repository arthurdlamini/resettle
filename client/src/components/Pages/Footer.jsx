import React from 'react';

function Footer({ sideToogle, sideNavActive }) {
	return (
		<footer className={sideNavActive?'footerr active':'footerr'}>
			<p className='copyright'>© All Rights Reserved {new Date().getFullYear()}</p>
		</footer>
	);
}

export default Footer;
