import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BsPersonFillGear } from 'react-icons/bs';
import { FaReadme } from 'react-icons/fa';
import { MdMarkEmailUnread } from 'react-icons/md';
import { FaFileVideo, FaPerson } from 'react-icons/fa6';
import { IoMdLogOut } from 'react-icons/io';
import { BsGraphUp } from 'react-icons/bs';
import { LuFileSearch2, LuTicket } from 'react-icons/lu';
import { Link, NavLink, useNavigate,useMatch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../context/userSlice';
import { TbGrave } from "react-icons/tb";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { MdAddHomeWork } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import { GiCorn } from "react-icons/gi";
import { FaTree } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";

function SideNav({ sideToogle, sideNavActive }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAdmin = useSelector((state) => state.user.isAdmin);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	function CustomNavLink({ to, children, ...props }) {
		let location = useLocation();

		let match =
			location.pathname === to || location.pathname.startsWith(to + '/');
		return (
			<NavLink
				to={to}
				{...props}
				className={match ? 'menu-items activemenu' : 'menu-items'}>
				{children}
			</NavLink>
		);
	}
	useEffect(() => {
		// Add event listener for screen resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const handleResize = () => {
		// Check if the screen size is small (you can change the breakpoint to fit your needs)
		if (window.innerWidth < 780) {
			sideToogle(false);
		}
		if (window.innerWidth >= 780) {
			// change to true
			sideToogle(true);
		}
	};
	return (
		<div className='sidenav pb-5'>
			<div className='nav-links'>
				<CustomNavLink
					to='/'
					onClick={() => {
						if (window.innerWidth <= 780) {
							sideToogle(!sideNavActive);
						}
					}}>
					<MdOutlineSpaceDashboard className='menu-item-icon' />
					<div className='menu-item'>Dashboard</div>
				</CustomNavLink>

				
				
					<CustomNavLink
						className='menu-items'
						to={'/person'}
						onClick={() => {
							if (window.innerWidth <= 780) {
								sideToogle(!sideNavActive);
							}
						}}>
						<FaBuildingUser className='menu-item-icon' />
						<div className='menu-item'>Home Owners</div>
					</CustomNavLink>
				
<CustomNavLink
					to='/homesteads'
					onClick={() => {
						console.log(window.innerWidth);
						if (window.innerWidth <= 780) {
							sideToogle((sideNavActive) => !sideNavActive);
						}
					}}>
					<IoHome className='menu-item-icon' />
					<div className='menu-item'>Homesteads</div>
				</CustomNavLink>
				<CustomNavLink
					className='menu-items'
					to={'/graves'}
					onClick={() => {
						if (window.innerWidth <= 780) {
							sideToogle(!sideNavActive);
						}
					}}>
					<TbGrave className='menu-item-icon' />
					<div className='menu-item'>Graves</div>
				</CustomNavLink>
				<CustomNavLink
					className='menu-items'
					to={'/fields'}
					onClick={() => {
						if (window.innerWidth <= 780) {
							sideToogle(!sideNavActive);
						}
					}}>
					<GiCorn className='menu-item-icon' />
					<div className='menu-item'>Fields</div>
				</CustomNavLink>
				<CustomNavLink
					className='menu-items'
					to={'/buildings'}
					onClick={() => {
						if (window.innerWidth <= 780) {
							sideToogle(!sideNavActive);
						}
					}}>
					<BsBuildingFillAdd className='menu-item-icon' />
					<div className='menu-item'>Buildings</div>
				</CustomNavLink><CustomNavLink
					className='menu-items'
					to={'/structures'}
					onClick={() => {
						if (window.innerWidth <= 780) {
							sideToogle(!sideNavActive);
						}
					}}>
					<MdAddHomeWork className='menu-item-icon' />
					<div className='menu-item'>Structures</div>
				</CustomNavLink>
				<CustomNavLink
						className='menu-items'
						to={'/trees'}
						onClick={() => {
							if (window.innerWidth <= 780) {
								sideToogle(!sideNavActive);
							}
						}}>
						<FaTree className='menu-item-icon' />
						<div className='menu-item'>Trees</div>
					</CustomNavLink><CustomNavLink
						className='menu-items'
						to={'/reports'}
						onClick={() => {
							if (window.innerWidth <= 780) {
								sideToogle(!sideNavActive);
							}
						}}>
						<BsGraphUp className='menu-item-icon' />
						<div className='menu-item'>Reports</div>
					</CustomNavLink><CustomNavLink
						className='menu-items'
						to={'/lookup'}
						onClick={() => {
							if (window.innerWidth <= 780) {
								sideToogle(!sideNavActive);
							}
						}}>
						<LuFileSearch2 className='menu-item-icon' />
						<div className='menu-item'>LookUp</div>
					</CustomNavLink>
				{isAdmin && (
					<CustomNavLink
						className='menu-items'
						to={'/users'}
						onClick={() => {
							if (window.innerWidth <= 780) {
								sideToogle(!sideNavActive);
							}
						}}>
						<FaPerson className='menu-item-icon' />
						<div className='menu-item'>Users</div>
					</CustomNavLink>
				)}
				<div className='text-center pt-5 pb-5'>
					<Button
						variant='danger'
						className='logout-btn text-center'
						onClick={() => {
							handleShow();
						}}>
						<IoMdLogOut className='logout-icon' /> Log Out
					</Button>
				</div>
			</div>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				size='sm'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm User Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					<p className='my-2'>Are you sure you want to logout?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						className='btn btn-primary'
						onClick={() => {
							dispatch(logoutUser());
							localStorage.removeItem('persist:root');
							navigate('/login');
						}}>
						Logout
					</Button>
					<Button
						variant='primary'
						className='btn btn-dark'
						onClick={() => {
							handleClose();
						}}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SideNav;
