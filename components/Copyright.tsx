import { Box, Chip, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import image from '../public/assets/footerLogo.png';

export default function Copyright() {
	return (
		<>
			<Box>
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent="centered"
					height={'100%'}>
					<Box
						width={'100%'}
						textAlign="center"
						sx={{
							backgroundColor: '#fff',
							background: 'linear-gradient(0deg, #fff 15%, #f6f1eb 100%)',
						}}>
						<Divider sx={{ mt: 2, mb: 1 }}>
							<Chip label={<q>Run free under starlight</q>} />
						</Divider>
						<Image src={image} alt="Woman Running" />

						<Typography
							textAlign={'center'}
							fontFamily={'Source Code Pro'}
							variant="body2"
							color="text.secondary">
							&copy; {new Date().getFullYear()} Atalanta A.C., All Rights Reserved.
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
}
