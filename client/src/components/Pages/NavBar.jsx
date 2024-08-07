import { FaBars } from 'react-icons/fa';
import { FaAnglesLeft } from 'react-icons/fa6';
import logo from '../../images/logo.jpg';
import { useSelector } from 'react-redux';

function NavBar({ sideToogle, sideNavActive }) {
	const user = useSelector((state) => state.user.user);
	const isAdmin = useSelector((state) => state.user.isAdmin);
	return (
		<div className='nav-bar'>
			<div className='brand'>
				<div
					className=''
					onClick={() => {
						sideToogle(!sideNavActive);
					}}>
					{sideNavActive ? (
						<FaAnglesLeft className='menu-icon' />
					) : (
						<FaBars className='menu-icon' />
					)}
				</div>
				<img src={logo} alt='logo' className='logo-img' />
				<div className='bbra'>
					<h3 className='brandname'><span className='my'>EWADE</span><span className='s'>R</span>esettlement<span className='d'>S</span>ystem</h3>
				</div>
			</div>

			<div className='right-menu'>
				<div className='mx-3'>
					<span className='mx-2 username'>{user?.name}({isAdmin ? "Administrator" : "User"})</span>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
