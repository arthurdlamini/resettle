import React, { useState } from 'react';
import NavBar from './NavBar';
import SideNav from './SideNav';
import './style.css';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Home() {
	const [sideNavActive, setSideNavActive] = useState(true); // side bar behaviour is closed by default
	return (
		<>
			<div className='content-container'>
				<NavBar sideToogle={setSideNavActive} sideNavActive={sideNavActive} />
				<div className='content-div'>
					<div className='content row'>
						<div
							className={
								sideNavActive ? 'side-container active' : 'side-container'
							}>
							<SideNav sideToogle={setSideNavActive} sideNavActive={sideNavActive}/>
						</div>
						<div
							className={
								sideNavActive ? 'main-content' : 'main-content active'
							}>
							<Outlet />
						</div>
					</div><Footer sideToogle={setSideNavActive} sideNavActive={sideNavActive} />
				</div>
				
			</div>
		</>
	);
}

export default Home;
