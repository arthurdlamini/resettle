import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoMdAddCircle, IoMdPersonAdd } from 'react-icons/io';
import axios from 'axios';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { IoClose } from 'react-icons/io5';
import { IoCheckmark } from 'react-icons/io5';
import { FiRefreshCw } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ScrollToTop } from '../../../ScrollTotop';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '../../../context/userSlice';
import LoadingSpinner from '../../Pages/LoadingSpinner';
import Spinner from '../../Pages/Spinner';
import api from '../../../ApiInterceptor';
import { useMediaQuery } from '@mui/material';
function UsersLocal() {
    const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	const [users, setUsers] = useState([]);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	const [selectedUser, setSelectedUser] = useState({});
	const handleClose = () => {
		setShow(false);
	};
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	const cancelTokenRef = useRef();

	const getUsers = async () => {
		try {
			dispatch(loading(true)); // Set loading state to true before fetching data
			const { data } = await api(user).get('/users', {
				cancelToken: cancelTokenRef.current.token,
			});
			setUsers(data);
			console.log(data)
			dispatch(loading(false));
		} catch (error) {
			console.error(error);
			//dispatch(loading(false));
		} finally {
			//dispatch(loading(false)); // Set loading state to false after fetching data
		}
	};
	useEffect(() => {
		cancelTokenRef.current = axios.CancelToken.source();
		getUsers();
		//Clean up function
		return () => {
			cancelTokenRef.current.cancel('Component unmounted');
		};
	}, []);
	const columns = [{
		field: 'email',
		headerName: 'Email',
		width: 200,
	},
	{
		field: 'name',
		headerName: 'Full Name',
		width: 200,
	},{
		field: 'role',
		headerName: 'Role',
		width: 200,
        renderCell:(params)=>{
            return params.row.role?.role
        }
	},{
		field: 'isEnabled',
		headerName: 'Enabled',
		width: 200,
        renderCell:(params)=>{
            let active = params.row.isEnabled
            if(active ===true){
                return "Yes"
            } else if(active ===false){
                return "No"
            } else{
                return "-"
            }
        }
	},{
		field: 'isActive',
		headerName: 'Active',
		width: 200,
        renderCell:(params)=>{
            let active = params.row.isActive
            if(active ===true){
                return "Yes"
            } else if(active ===false){
                return "No"
            } else{
                return "-"
            }
            
        }
	},
	{
		field: 'createdAt',
		headerName: 'Added on',
		renderCell: (params) => {
			const dateString = params.row.createdAt;
			const dateObj = new Date(dateString);
			const formattedDate = dateObj.toLocaleString();
			return formattedDate;
		},
		width: 200,
	},
	{
		field: '',
		headerName: 'Actions',
		width: 150,
		renderCell: (params) => {
			return (
				<>
					<MdDelete
						className='mx-2 action-icon-delete'
						onClick={() => {
							setSelectedUser(params.row);

							handleShow();
						}}
					/>
					{/* <FaEdit
						className='mx-2 action-icon-edit'
						onClick={() => {
							navigate(`/users/edit/${params.row._id}`);
						}}
					/> */}<FaEye
						className='mx-2 action-icon-edit'
						onClick={() => {
							navigate(`/users/view/${params.row._id}`);
						}}
					/>
				</>
			);
		},
	},
	];

	//Notifications function
	const notifySuccess = (name) => {
		toast.success(`${name}`, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};
	//Notifications function
	const notifyError = (name) => {
		toast.error(`${name}`, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};
	const addNewUser = () => {
		navigate('/users/add');
	};
	const deleteUserBtn = (selected_user) => {
		dispatch(loading(true));
		api(user)
			.delete(`/users/${selected_user._id}`)
			.then((response) => {
				if (response.data) {
					dispatch(loading(false));
					notifySuccess('User Deleted');
					handleClose();
					getUsers();
				}
				dispatch(loading(false));
				handleClose();
			})
			.catch((error) => {
				notifyError(error);
				dispatch(loading(false));
			});
	};

	const { pathname } = useLocation();
	//scroll to top when page loads
	useEffect(() => {
		ScrollToTop();
	}, [pathname]);

	return (
		<div className='pt-2 px-3'>
			<div className='d-flex'>
				<h4>Users</h4>
				<Button
					className='btn mx-3 btn-rounded user-btn'
					variant='secondary'
					onClick={addNewUser}>
					<IoMdAddCircle /> {''}New User
				</Button>
				<Button
					className='btn btn-rounded user-btn'
					variant='secondary'
					onClick={() => {
						getUsers();
					}}>
					<FiRefreshCw /> {''}Refresh
				</Button>
			</div>
			<div>
				{isLoading ? (
					// Render the loading spinner while loading is true
					<LoadingSpinner />
				) : (
					// Render the fetched data
					<>
						<DataGrid
							autoHeight
							className='product-table'
							getRowId={(row) => row._id}
							rows={users}
							columns={columns}
							slots={{ toolbar: GridToolbar }}
							slotProps={{
								toolbar: {
									showQuickFilter: true,
									quickFilterProps: {
										debounceMs: 500,
									},
								},
							}}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 10,
									},
								},
							}}
							pageSizeOptions={[10]}
							disableColumnSelector
							disableDensitySelector

						/>
					</>
				)}
			</div>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				size='lg'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm User Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					{isLoading && (
						// Render the loading spinner while loading is true
						<Spinner />
					)}
					<p className='text-danger emp'>
						This action is irrevesible.
					</p>
					<div className='form-group'>
						<label className='control-label' htmlFor='catdesc'>
							Full Name:
						</label>
						<div className='col-md-12 mt-2'>
							<input
								id='catdesc'
								name='catdesc'
								type='text'
								placeholder={selectedUser.name}
								className='form-control'
								disabled
							/>
						</div>
					</div>
					
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						className='btn btn-danger'
						onClick={() => {
							deleteUserBtn(selectedUser);
						}}>
						Delete User
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

export default UsersLocal