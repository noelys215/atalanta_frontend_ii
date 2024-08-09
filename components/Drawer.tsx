import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Drawer,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Link from '../src/Link';

const MuiDrawer = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			<Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => setOpenDrawer(true)}>
				<MenuIcon />
				<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>Menu</Typography>
			</Box>
			<Drawer
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				PaperProps={{
					sx: {
						width: {
							xs: '100%', // theme.breakpoints.up('xs')
							sm: '100%', // theme.breakpoints.up('sm')
							md: 510, // theme.breakpoints.up('md')
							// lg: 400, // theme.breakpoints.up('lg')
							// xl: 500, // theme.breakpoints.up('xl')
						},
					},
				}}>
				<Box
					p={2}
					textAlign="center"
					role="presentation"
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
					}}>
					<CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer(false)} />
					<Typography variant="h4" component="div">
						Menu
					</Typography>
				</Box>
				{/* Mens */}
				<Box display={'flex'} flexDirection={'column'} width={'90%'} pl={'10%'}>
					<Accordion elevation={0}>
						<AccordionSummary
							expandIcon={<AddIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header">
							<Typography textAlign={'center'}>MAN</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<List>
								<ListItem onClick={() => setOpenDrawer(false)}>
									<Link href={'/man/tops/tops'}>Tops</Link>
								</ListItem>

								<ListItem onClick={() => setOpenDrawer(false)}>
									<Link href={'/man/bottoms/bottoms'}>Bottoms</Link>
								</ListItem>

								<ListItem onClick={() => setOpenDrawer(false)}>
									<Link href={'/man/footwear/footwear'}>Footwear</Link>
								</ListItem>
							</List>
						</AccordionDetails>
					</Accordion>
					{/* Women */}
					<Accordion elevation={0}>
						<AccordionSummary
							expandIcon={<AddIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header">
							<Typography textAlign={'center'}>WOMAN</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<List onClick={() => setOpenDrawer(false)}>
								<ListItem>
									<Link href={'/woman/tops/tops'}>Tops</Link>
								</ListItem>

								<ListItem>
									<Link href={'/woman/bottoms/bottoms'}>Bottoms</Link>
								</ListItem>

								<ListItem>
									<Link href={'/woman/footwear/footwear'}>Footwear</Link>
								</ListItem>
							</List>
						</AccordionDetails>
					</Accordion>
					{/* Accessories */}
					<Accordion elevation={0}>
						<AccordionSummary
							expandIcon={<AddIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header">
							<Typography textAlign={'center'}>ACCESSORIES</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<List onClick={() => setOpenDrawer(false)}>
								<ListItem>
									<Link href={'/accessories/all/accessories'}>All</Link>
								</ListItem>
								{/* <ListItem>Towels</ListItem>
								<ListItem>Bags</ListItem>
								<ListItem>Headwear</ListItem> */}
							</List>
						</AccordionDetails>
					</Accordion>
				</Box>
			</Drawer>
		</>
	);
};

export default MuiDrawer;
