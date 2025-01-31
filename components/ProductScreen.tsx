import React, { useState } from 'react';
import {
	Box,
	Divider,
	Grid,
	Typography,
	Button,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	CircularProgress,
	List,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import { cartAddItem, CartItem } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../src/api/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '../styles/globals.css';

// Define the custom type for Swiper's style
interface SwiperCustomStyle extends React.CSSProperties {
	'--swiper-navigation-color'?: string;
	'--swiper-navigation-size'?: string;
}

const ProductScreen: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['product', slug],
		queryFn: () => getProductBySlug(slug as string),
	});

	const cart = useSelector((state: RootState) => state.cart.cartItems);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [state, setState] = useState({
		size: '',
		_key: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<CircularProgress />
			</Box>
		);
	}

	if (isError || !product) return <div>Error loading product.</div>;

	const addToCartHandler = async () => {
		const existItem = cart.find(
			(x: CartItem) => x._id === product._id && x.selectedSize === selectedSize
		);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		dispatch(
			cartAddItem({
				_key: state._key,
				name: product.name,
				slug: product.slug,
				price: product.price,
				countInStock: product.inventory,
				image: product.image[0],
				quantity,
				selectedSize: selectedSize ?? '',
				_id: product._id,
				department: product.department,
				category: product.category,
				path: `/${product.department}/${product.category}/${product.slug}`,
			})
		);

		toast(`${product.name} Added to Cart`);
		navigate('/cart');
	};

	const swiperStyle: SwiperCustomStyle = {
		'--swiper-navigation-color': 'black',
		'--swiper-navigation-size': '25px',
	};

	return (
		<Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
			<Grid
				width={'100%'}
				container
				sx={{
					gap: 5,
					mb: 5,
				}}>
				<Grid item md={8} xs={12} width={'100%'}>
					<Swiper
						loop={true}
						spaceBetween={50}
						slidesPerView={1}
						navigation={true}
						modules={[Navigation]}
						pagination={true}
						style={swiperStyle} // Apply the style here
					>
						{product.image.map((step: string, index: number) => (
							<SwiperSlide key={index}>
								<Box
									component={'img'}
									src={step}
									alt={product.slug}
									width={'100%'}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</Grid>

				<Grid maxHeight={992} item md={3} sx={{ backgroundColor: '#fffcf7', p: 3 }}>
					<Typography variant="h6">{product.name}</Typography>
					<Typography variant="body1">$ {product.price}</Typography>
					<Divider />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: 48,
						}}>
						<Typography variant="body1">Color</Typography>

						<Box
							display={'flex'}
							justifyContent={'space-evenly'}
							alignItems="center"
							gap={1}>
							<Typography variant="body1">{product.color.toUpperCase()}</Typography>
							<Box
								width={'1.1rem'}
								height={'1.1rem'}
								sx={{
									backgroundColor: product.color,
									border: '1px solid black',
								}}
							/>
						</Box>
					</Box>

					<Divider />
					<Accordion elevation={0} sx={{ backgroundColor: '#fffcf7' }}>
						<AccordionSummary
							sx={{ p: 0 }}
							expandIcon={<AddIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header">
							<Typography>Size</Typography>
						</AccordionSummary>

						<AccordionDetails sx={{ m: 0, p: 0 }}>
							<List
								sx={{
									display: 'flex',
									justifyContent: 'center',
									flexWrap: 'wrap',
									gap: 1,
									p: 0,
									m: 0,
								}}>
								{product.inventory.map(
									(prod: { size: string; quantity: number; _id: string }) => (
										<Button
											sx={{
												width: 'auto',
												height: 'auto',
												backgroundColor:
													prod.size === selectedSize ? '#999999' : '',
												border: '1px solid black',
												cursor: 'grab',
												'&:hover': {
													backgroundColor: '#999999',
												},
											}}
											onClick={() => {
												setSelectedSize(prod.size);
												setState({
													...state,
													size: prod.size,
													_key: prod._id,
												});
											}}
											disabled={prod.quantity === 0}
											key={prod.size}>
											{prod.size}
										</Button>
									)
								)}
							</List>
						</AccordionDetails>
					</Accordion>
					<Divider />
					<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, mt: 1 }}>
						<Button
							variant="contained"
							onClick={addToCartHandler}
							disabled={selectedSize === null}>
							Add to Cart
						</Button>
					</Box>
					<Divider />
					<Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
						{product.description}
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductScreen;
