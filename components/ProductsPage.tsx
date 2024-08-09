import {
	Box,
	Container,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ProductsPageProps {
	title: string;
	productName: string;
	imgSrc: string;
	price: number;
}

export const ProductPage: React.FC<ProductsPageProps> = ({ title, productName, imgSrc, price }) => {
	return (
		<Container maxWidth="xl">
			{/* Title */}
			<Typography variant="h5" mb={1}>
				Men
			</Typography>
			<Divider />
			<Box
				sx={{
					backgroundColor: '#fff',
					height: '4rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Typography ml={1} variant="h5">
					{title}
				</Typography>
				{/* Price Sort */}
				<FormControl sx={{ border: 'none' }}>
					<InputLabel id="select">Sort Price</InputLabel>
					<Select variant="standard" className="search" disableUnderline>
						<MenuItem value={'Highest'}>Highest</MenuItem>
						<MenuItem value={'Lowest'}>Lowest</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Divider sx={{ mb: 2 }} />
			{/* Product Grid */}
			<Box>
				<Grid container gap={2} justifyContent="center" mb={10}>
					<Grid item md={2.4}>
						<Image src={imgSrc} alt="" />
						<Typography variant="h6">{productName}</Typography>
						<Typography variant="body1">$ {price}</Typography>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};
