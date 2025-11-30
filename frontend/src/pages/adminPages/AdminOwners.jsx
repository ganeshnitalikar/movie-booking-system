import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Chip,
	Stack,
	Skeleton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Select,
	FormControl,
	InputLabel,
	Avatar,
	Card,
	CardContent,
} from '@mui/material';
import {
	Search as SearchIcon,
	MoreVert as MoreVertIcon,
	Delete as DeleteIcon,
	Block as BlockIcon,
	CheckCircle as CheckCircleIcon,
	Refresh as RefreshIcon,
	FilterList as FilterListIcon,
	Verified as VerifiedIcon,
	Business as BusinessIcon,
} from '@mui/icons-material';
import { getOwners, updateOwnerStatus, verifyOwner, deleteUser } from '../../services/admin';

const AdminOwners = () => {
	const [owners, setOwners] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedOwner, setSelectedOwner] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [ownerToDelete, setOwnerToDelete] = useState(null);

	const fetchOwners = async () => {
		setLoading(true);
		try {
			const response = await getOwners(page + 1, rowsPerPage, search, statusFilter);
			setOwners(response.owners);
			setTotal(response.total);
		} catch (error) {
			console.error('Error fetching owners:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOwners();
	}, [page, rowsPerPage, statusFilter]);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			if (page === 0) {
				fetchOwners();
			} else {
				setPage(0);
			}
		}, 500);

		return () => clearTimeout(debounceTimer);
	}, [search]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleMenuOpen = (event, owner) => {
		setAnchorEl(event.currentTarget);
		setSelectedOwner(owner);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedOwner(null);
	};

	const handleStatusChange = async (ownerId, newStatus) => {
		try {
			await updateOwnerStatus(ownerId, newStatus);
			fetchOwners();
			handleMenuClose();
		} catch (error) {
			console.error('Error updating owner status:', error);
		}
	};

	const handleVerify = async (ownerId) => {
		try {
			await verifyOwner(ownerId);
			fetchOwners();
			handleMenuClose();
		} catch (error) {
			console.error('Error verifying owner:', error);
		}
	};

	const handleDeleteClick = (owner) => {
		setOwnerToDelete(owner);
		setDeleteDialogOpen(true);
		handleMenuClose();
	};

	const handleDeleteConfirm = async () => {
		if (ownerToDelete) {
			try {
				await deleteUser(ownerToDelete.id);
				fetchOwners();
				setDeleteDialogOpen(false);
				setOwnerToDelete(null);
			} catch (error) {
				console.error('Error deleting owner:', error);
			}
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'active':
				return 'success';
			case 'pending':
				return 'warning';
			case 'suspended':
				return 'error';
			default:
				return 'default';
		}
	};

	const getVerificationColor = (status) => {
		return status === 'verified' ? 'success' : 'warning';
	};

	// Calculate summary stats
	const activeOwners = owners.filter(o => o.status === 'active').length;
	const pendingOwners = owners.filter(o => o.status === 'pending').length;
	const totalRevenue = owners.reduce((sum, o) => sum + (o.totalRevenue || 0), 0);

  return (
		<Box sx={{ py: 4 }}>
			<Container maxWidth="lg">
				{/* Header */}
				<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
					<Box>
						<Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
							Owner Management
						</Typography>
						<Typography color="text.secondary">
							Manage theater owners and their accounts
						</Typography>
					</Box>
					<Button
						variant="outlined"
						startIcon={<RefreshIcon />}
						onClick={fetchOwners}
						sx={{ textTransform: 'none' }}
					>
						Refresh
					</Button>
				</Stack>

				{/* Summary Cards */}
				<Grid container spacing={3} sx={{ mb: 3 }}>
					<Grid item xs={12} sm={4}>
						<Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
							<CardContent>
								<Stack direction="row" spacing={2} alignItems="center">
									<Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
										<BusinessIcon />
									</Avatar>
									<Box>
										<Typography variant="body2" color="text.secondary">
											Active Owners
										</Typography>
										<Typography variant="h5" sx={{ fontWeight: 700 }}>
											{activeOwners}
										</Typography>
									</Box>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
							<CardContent>
								<Stack direction="row" spacing={2} alignItems="center">
									<Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main' }}>
										<BusinessIcon />
									</Avatar>
									<Box>
										<Typography variant="body2" color="text.secondary">
											Pending Approval
										</Typography>
										<Typography variant="h5" sx={{ fontWeight: 700 }}>
											{pendingOwners}
										</Typography>
									</Box>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
							<CardContent>
								<Stack direction="row" spacing={2} alignItems="center">
									<Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
										<BusinessIcon />
									</Avatar>
									<Box>
										<Typography variant="body2" color="text.secondary">
											Total Revenue
										</Typography>
										<Typography variant="h5" sx={{ fontWeight: 700 }}>
											₹{(totalRevenue / 100000).toFixed(1)}L
										</Typography>
									</Box>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* Filters */}
				<Paper
					elevation={0}
					sx={{
						p: 2,
						mb: 3,
						borderRadius: 2,
						border: '1px solid',
						borderColor: 'divider',
					}}
				>
					<Grid container spacing={2} alignItems="center">
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								placeholder="Search owners by name, email, or theater..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								}}
								size="small"
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormControl fullWidth size="small">
								<InputLabel>Status</InputLabel>
								<Select
									value={statusFilter}
									label="Status"
									onChange={(e) => setStatusFilter(e.target.value)}
									startAdornment={<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />}
								>
									<MenuItem value="all">All Status</MenuItem>
									<MenuItem value="active">Active</MenuItem>
									<MenuItem value="pending">Pending</MenuItem>
									<MenuItem value="suspended">Suspended</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography variant="body2" color="text.secondary">
								Total Owners: <strong>{total.toLocaleString()}</strong>
							</Typography>
						</Grid>
					</Grid>
				</Paper>

				{/* Owners Table */}
				<Paper
					elevation={0}
					sx={{
						borderRadius: 3,
						border: '1px solid',
						borderColor: 'divider',
						overflow: 'hidden',
					}}
				>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow sx={{ bgcolor: 'background.surface' }}>
									<TableCell sx={{ fontWeight: 700 }}>Owner</TableCell>
									<TableCell sx={{ fontWeight: 700 }}>Theater</TableCell>
									<TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
									<TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
									<TableCell sx={{ fontWeight: 700 }}>Verification</TableCell>
									<TableCell sx={{ fontWeight: 700 }}>Revenue</TableCell>
									<TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									Array.from({ length: rowsPerPage }).map((_, i) => (
										<TableRow key={i}>
											<TableCell><Skeleton height={40} /></TableCell>
											<TableCell><Skeleton height={40} /></TableCell>
											<TableCell><Skeleton height={40} /></TableCell>
											<TableCell><Skeleton height={40} width={80} /></TableCell>
											<TableCell><Skeleton height={40} width={80} /></TableCell>
											<TableCell><Skeleton height={40} width={100} /></TableCell>
											<TableCell><Skeleton height={40} width={40} /></TableCell>
										</TableRow>
									))
								) : owners.length > 0 ? (
									owners.map((owner) => (
										<TableRow key={owner.id} hover>
											<TableCell>
												<Stack direction="row" spacing={1.5} alignItems="center">
													<Avatar
														sx={{
															width: 36,
															height: 36,
															bgcolor: 'secondary.main',
															fontSize: '0.875rem',
														}}
													>
														{owner.name?.charAt(0) || 'O'}
													</Avatar>
													<Box>
														<Typography variant="body2" sx={{ fontWeight: 600 }}>
															{owner.name}
														</Typography>
														<Typography variant="caption" color="text.secondary">
															{owner.theaterCount} {owner.theaterCount === 1 ? 'theater' : 'theaters'}
														</Typography>
													</Box>
												</Stack>
											</TableCell>
											<TableCell>
												<Typography variant="body2" sx={{ fontWeight: 600 }}>
													{owner.theaterName}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="body2" color="text.secondary">
													{owner.email}
												</Typography>
											</TableCell>
											<TableCell>
												<Chip
													label={owner.status}
													size="small"
													color={getStatusColor(owner.status)}
													sx={{ textTransform: 'capitalize', fontWeight: 600 }}
												/>
											</TableCell>
											<TableCell>
												<Chip
													icon={owner.verificationStatus === 'verified' ? <VerifiedIcon /> : null}
													label={owner.verificationStatus}
													size="small"
													color={getVerificationColor(owner.verificationStatus)}
													sx={{ textTransform: 'capitalize', fontWeight: 600 }}
												/>
											</TableCell>
											<TableCell>
												<Typography variant="body2" sx={{ fontWeight: 600 }}>
													₹{(owner.totalRevenue / 1000).toFixed(1)}K
												</Typography>
											</TableCell>
											<TableCell align="right">
												<IconButton
													size="small"
													onClick={(e) => handleMenuOpen(e, owner)}
												>
													<MoreVertIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={7} align="center" sx={{ py: 4 }}>
											<Typography color="text.secondary">
												No owners found
											</Typography>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						component="div"
						count={total}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						rowsPerPageOptions={[10, 25, 50, 100]}
					/>
				</Paper>

				{/* Action Menu */}
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					PaperProps={{
						sx: { minWidth: 200 }
					}}
				>
					{selectedOwner?.verificationStatus !== 'verified' && (
						<MenuItem
							onClick={() => handleVerify(selectedOwner.id)}
							sx={{ color: 'success.main' }}
						>
							<VerifiedIcon sx={{ mr: 1, fontSize: 20 }} />
							Verify Owner
						</MenuItem>
					)}
					{selectedOwner?.status === 'active' ? (
						<MenuItem
							onClick={() => handleStatusChange(selectedOwner.id, 'suspended')}
							sx={{ color: 'warning.main' }}
						>
							<BlockIcon sx={{ mr: 1, fontSize: 20 }} />
							Suspend
						</MenuItem>
					) : selectedOwner?.status === 'suspended' ? (
						<MenuItem
							onClick={() => handleStatusChange(selectedOwner.id, 'active')}
							sx={{ color: 'success.main' }}
						>
							<CheckCircleIcon sx={{ mr: 1, fontSize: 20 }} />
							Activate
						</MenuItem>
					) : (
						<MenuItem
							onClick={() => handleStatusChange(selectedOwner.id, 'active')}
							sx={{ color: 'success.main' }}
						>
							<CheckCircleIcon sx={{ mr: 1, fontSize: 20 }} />
							Approve
						</MenuItem>
					)}
					<MenuItem
						onClick={() => handleDeleteClick(selectedOwner)}
						sx={{ color: 'error.main' }}
					>
						<DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
						Delete
					</MenuItem>
				</Menu>

				{/* Delete Confirmation Dialog */}
				<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
					<DialogTitle>Delete Owner</DialogTitle>
					<DialogContent>
						<Typography>
							Are you sure you want to delete <strong>{ownerToDelete?.name}</strong>? This action cannot be undone.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
							Cancel
						</Button>
						<Button
							onClick={handleDeleteConfirm}
							color="error"
							variant="contained"
							sx={{ textTransform: 'none' }}
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</Box>
	);
};

export default AdminOwners;
