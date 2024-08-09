import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import dynamic from 'next/dynamic';
//
import { useDispatch, useSelector } from 'react-redux';

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Divider,
	List,
	Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { cartAddItem } from '../store/slices/cartSlice';
import { RootState } from '../store/store';

interface ProductProps {
	products?: string[];
	image?: string;
	product: any;
	selectedSize?: any;
	size?: any;
	_key: String;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductScreen = ({ product }: any): React.ReactElement<ProductProps> => {
	const { cart } = useSelector((state: RootState) => state.cart);

	const [state, setState] = React.useState<ProductProps>({
		product: null,
		size: '',
		_key: '',
	});

	const dispatch = useDispatch();
	const router = useRouter();
	const [selectedSize, setSelectedSize] = React.useState(null);
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = product?.image.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	// Add to Cart
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x: any) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const path = router.asPath;

		dispatch(
			cartAddItem({
				path,
				_key: state._key,
				name: product.name,
				slug: product.slug,
				price: product.price,
				countInStock: product?.inventory,
				image: product.image[0],
				quantity,
				selectedSize: selectedSize,
			})
		);

		toast(`${product.name} Added to Cart`);
		router.push('/cart');
	};

	return (
		<>
			<Head>
				<title>{product?.name}</title>
			</Head>

			<Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
				<Grid
					width={'100%'}
					container
					sx={{
						gap: 5,
						mb: 5,
					}}>
					{/* Product Image */}
					<Grid item md={8} xs={12} width={'100%'}>
						<AutoPlaySwipeableViews
							interval={60000 * 2}
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={activeStep}
							onChangeIndex={handleStepChange}
							enableMouseEvents>
							{product?.image.map((step: any, index: number) => (
								<div key={step}>
									{Math.abs(activeStep - index) <= 2 ? (
										<Box
											loading="lazy"
											component={'img'}
											src={step}
											alt={product.slug}
											width={'100%'}
										/>
									) : null}
								</div>
							))}
						</AutoPlaySwipeableViews>

						<MobileStepper
							// sx={{ width: 750 }}
							variant="text"
							steps={maxSteps}
							position="static"
							activeStep={activeStep}
							nextButton={
								<Button
									size="medium"
									onClick={handleNext}
									disabled={activeStep === maxSteps - 1}>
									{theme.direction === 'rtl' ? (
										<KeyboardArrowLeft />
									) : (
										<KeyboardArrowRight />
									)}
								</Button>
							}
							backButton={
								<Button
									size="small"
									onClick={handleBack}
									disabled={activeStep === 0}>
									{theme.direction === 'rtl' ? (
										<KeyboardArrowRight />
									) : (
										<KeyboardArrowLeft />
									)}
								</Button>
							}
						/>
					</Grid>

					{/* Product Description */}
					<Grid maxHeight={992} item md={3} sx={{ backgroundColor: '#fffcf7', p: 3 }}>
						<Typography variant="h6">{product?.name}</Typography>
						<Typography variant="body1" sx={{ wordSpacing: -8 }}>
							$ {product?.price.toFixed(2)}
						</Typography>
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
								<Typography variant="body1">
									{product?.color.toUpperCase()}
								</Typography>
								<Box
									width={'1.1rem'}
									height={'1.1rem'}
									sx={{
										backgroundColor: product?.color,
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
									{product?.inventory?.map((prod: any) => (
										<Button
											sx={{
												width: 'auto',
												height: 'auto',
												backgroundColor:
													prod?.size?.toString() === selectedSize
														? '#999999'
														: '',
												border: '1px solid black',
												cursor: 'grab',
												'&:hover': {
													backgroundColor: '#999999',
												},
											}}
											onClick={(e: any) => {
												setSelectedSize(e.target.innerText);
												setState({
													...state,
													size: prod.size,
													_key: prod._id,
												});
											}}
											disabled={prod?.quantity === 0}
											key={prod.size}>
											{prod?.size}
										</Button>
									))}
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
							{product?.description}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: true });
