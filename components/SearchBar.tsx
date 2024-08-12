import { Box, InputAdornment, TextField } from '@mui/material';
import MuiDrawer from './Drawer';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace next/router with useNavigate

export default function SearchBar() {
	const navigate = useNavigate(); // Replace useRouter with useNavigate
	const [query, setQuery] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(`/search?query=${query}`);
		setQuery('');
		setIsSubmitted(true);
	};

	return (
		<Box display={'flex'} gap={2}>
			<MuiDrawer />
			<form onSubmit={submitHandler}>
				<TextField
					sx={{
						display: {
							xs: 'none',
							md: 'flex',
							'& .MuiInput-input': {
								width: 100,
							},
						},
					}}
					id="filled-search"
					placeholder="Search"
					type="search"
					variant="standard"
					value={query}
					focused={isSubmitted}
					onChange={queryChangeHandler}
					InputProps={{
						name: 'query',
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</form>
		</Box>
	);
}
