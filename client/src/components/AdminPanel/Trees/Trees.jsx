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

function Trees() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	const [trees, setTrees] = useState([]);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	const [selectedTree, setselectedTree] = useState({});
	const handleClose = () => {
		setShow(false);
	};
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	const cancelTokenRef = useRef();

	const getTrees = async () => {
		try {
			dispatch(loading(true)); // Set loading state to true before fetching data
			const { data } = await api(user).get('/trees', {
				cancelToken: cancelTokenRef.current.token,
			});
			setTrees(data);
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
		getTrees();
		//Clean up function
		return () => {
			cancelTokenRef.current.cancel('Component unmounted');
		};
	}, []);
	const columns = [{
		field: 'homesteadId',
		headerName: 'Home Owner',
		width: 200, renderCell: (params) => {
			return params.row.homesteadId?.homesteadHead?.name;
		},
	},
	{
		field: 'condition',
		headerName: 'Condition',
		width: 150,
	},{
		field: 'size',
		headerName: 'Size',
		width: 100,
	},{
		field: 'type',
		headerName: 'Type',
		width: 100,
	},{
		field: 'number',
		headerName: 'Tree Count',
		width: 100,
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

							setselectedTree(params.row);

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
								navigate(`/trees/view/${params.row._id}`);
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
	const addagrave = () => {
		navigate('/trees/add');
	};
	const deleteTreeBtn = (gravee) => {
		dispatch(loading(true));
		api(user)
			.delete(`/trees/${gravee._id}`)
			.then((response) => {
				if (response.data) {
					dispatch(loading(false));
					notifySuccess('Tree Deleted');
					handleClose();
					getTrees();
				}
				dispatch(loading(false));
				handleClose();
			})
			.catch((error) => {
				notifyError("Error Occuried");
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
				<h4>Trees</h4>
				<Button
					className='btn mx-3 btn-rounded user-btn'
					variant='secondary'
					onClick={addagrave}>
					<IoMdAddCircle /> {''}New Tree
				</Button>
				<Button
					className='btn btn-rounded user-btn'
					variant='secondary'
					onClick={() => {
						getTrees();
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
							rows={trees}
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
					<Modal.Title>Confirm Tree Deletion</Modal.Title>
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
							Home Owner:
						</label>
						<div className='col-md-12 mt-2'>
							<input
								id='catdesc'
								name='catdesc'
								type='text'
								placeholder={selectedTree.homesteadId?.homesteadHead?.name}

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
							deleteTreeBtn(selectedTree);
						}}>
						Delete Tree
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

export default Trees;
