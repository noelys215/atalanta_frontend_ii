import { Badge, Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../public/assets/logo-plain.png';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import Link from '../src/Link';
import { useEffect, useState } from 'react';
import MobileSearch from './MobileSearch';
import AccountDrawer from './AccountDrawer';
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const TopBar = () => {
	const [openSearch, setOpenSearch] = useState<boolean>(false);

	const { cart } = useSelector((state: RootState) => state.cart);

	return (
		<Container
			maxWidth="xl"
			sx={{
				marginBottom: 4,
				position: 'sticky',
				top: 0,
				zIndex: 99,
				backgroundColor: '#F6F1EB',
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
							backgroundColor: 'inherit',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: 'auto',
						}}>
						{/* Search/Menu Bar */}
						<SearchBar />
						<SearchIcon
							onClick={() => setOpenSearch(!openSearch)}
							sx={{ display: { xs: 'flex', md: 'none' } }}
						/>

						{/* Logo */}
						<Box>
							<Link href={'/'}>
								<Image src={logo} width={102} height={113} alt="logo" />
							</Link>
						</Box>

						{/* Account/Cart Links */}
						<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
							<AccountDrawer />
							<Link href={'/cart'} sx={{ textDecoration: 'none' }}>
								<Box display={'flex'} gap={1}>
									<ShoppingBagTwoToneIcon />
									<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
										{cart.cartItems.length > 0 ? (
											<Badge
												color="primary"
												badgeContent={cart.cartItems.length}>
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
