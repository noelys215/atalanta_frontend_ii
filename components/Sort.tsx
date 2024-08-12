import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface ProductProps {
	handleSort?: (event: SelectChangeEvent) => void;
}

const Sort: React.FC<ProductProps> = ({ handleSort }) => {
	return (
		<Box sx={{ height: '4rem' }}>
			<FormControl sx={{ border: 'none' }}>
				<InputLabel id="select">Sort Price</InputLabel>
				<Select
					variant="standard"
					className="search"
					disableUnderline
					defaultValue={''}
					onChange={handleSort}>
					<MenuItem disabled value={'Sort'}>
						Sort
					</MenuItem>
					<MenuItem value={'Highest'}>Highest</MenuItem>
					<MenuItem value={'Lowest'}>Lowest</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default Sort;
