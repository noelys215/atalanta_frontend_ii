import { useState } from 'react';
import { Badge, Box, Container, Typography } from '@mui/material';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import { Link } from 'react-router-dom';
import MobileSearch from './MobileSearch';
import AccountDrawer from './AccountDrawer';
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import logo from '../public/assets/logo-plain.png';
import { RootState } from '../store/store';

const TopBar = () => {
	const [openSearch, setOpenSearch] = useState(false);

	const cart = useSelector((state: RootState) => state.cart);
	const cartItems = cart?.cartItems || [];

	return (
		<Container
			maxWidth="xl"
			sx={{
				marginBottom: 4,
				position: 'sticky',
				top: 0,
				zIndex: 99,
				backgroundColor: '#F6F1EB',
				paddingY: 2,
			}}>
			{openSearch ? (
				<MobileSearch setOpenSearch={setOpenSearch} />
			) : (
				<Box
					sx={{
						backgroundColor: '#F6F1EB',
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: 'auto',
							py: 2,
						}}>
						{/* Search/Menu Bar */}
						<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
							<SearchBar />
							<SearchIcon
								onClick={() => setOpenSearch(!openSearch)}
								sx={{ display: { xs: 'flex', md: 'none' } }}
							/>
						</Box>

						{/* Logo */}
						<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
							<Link to="/">
								<img src={logo} width={102} height={113} alt="logo" />
							</Link>
						</Box>

						{/* Account/Cart Links */}
						<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
							<AccountDrawer />
							<Link to="/cart" style={{ textDecoration: 'none' }}>
								<Box display={'flex'} gap={1}>
									<ShoppingBagTwoToneIcon />
									<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
										{cartItems.length > 0 ? (
											<Badge color="primary" badgeContent={cartItems.length}>
												Cart
											</Badge>
										) : (
											'Cart'
										)}
									</Typography>
								</Box>
							</Link>
						</Box>
					</Box>
				</Box>
			)}
		</Container>
	);
};

export default TopBar;
