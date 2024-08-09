import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import sideImage from '../public/assets/joggingwoman.jpg';
// Framer

interface ProductProps {
	tanks?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
}

export const FeaturedItems = (): ReactElement<ProductProps> => {
	const [state, setState] = useState<ProductProps>({
		tanks: [],
		error: '',
		loading: true,
	});

	const { tanks, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.API_URL}/products`);
			try {
				const tanks = await data.filter(
					(prod: any) => prod.category === 'tanks' && prod.department === 'woman'
				);

				setState({ tanks, loading: false });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
	}, [error]);

	return (
		<>
			{loading ? (
				<Container maxWidth="xl">
					<Backdrop
						sx={{
							color: '#fff',
							opacity: 0.2,
							zIndex: (theme) => theme.zIndex.drawer + 1,
						}}
						open={loading}>
						<CircularProgress color="inherit" />
					</Backdrop>
				</Container>
			) : (
				<>
					<Box display={' flex'} flexDirection={'column'} alignItems={'center'} mb={5}>
						{/* Title */}
						<Typography
							variant="h2"
							fontSize={'1.875rem'}
							gutterBottom
							textAlign={'center'}>
							A Running Tradition
						</Typography>
						{/* Desc */}
						<Typography
							lineHeight={1.5}
							variant="body2"
							fontSize={'1.1rem'}
							gutterBottom
							textAlign={'center'}
							width={'80%'}>
							On warm summer days or hanging out at the gym, a good running tank or
							singlet is essential. Whether you need a racing singlet or a tank to
							show off the guns at the gym, we have cultivated the best running tanks
							and singlets for you to choose from.
						</Typography>
					</Box>

					<Box
						sx={{
							display: 'flex',
							flexDirection: {
								xs: 'column',
								md: 'row',
							},
							alignItems: 'center',
							width: '100%',
							height: 'auto',
							mb: 5,
						}}>
						{/* Side Image */}
						<Box sx={{ width: 'auto' }}>
							<Image src={sideImage} alt="logo" />
						</Box>
						{/* Four Products */}

						<Grid container gap={8} justifyContent="center" width={'auto'}>
							{tanks?.slice(0, 4).map((p: any) => (
								<Grid item md={5} xs={4} key={p?._id}>
									<Link href={`/woman/tops/${p?.slug}`}>
										<a>
											<Image
												onClick={() => setState({ loading: true })}
												src={p?.image[0]}
												width={450}
												height={450}
												alt={p?.name}
											/>
										</a>
									</Link>
									<Box p={1}>
										<Typography>{p?.name}</Typography>
										<Typography>{`$${p?.price.toFixed(2)}`}</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				</>
			)}
		</>
	);
};

export function getServerSideProps(context: any) {
	return {
		props: {
			slug: context.params.slug,
			path: context.query.type,
		},
	};
}
