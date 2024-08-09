import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

type ButtonProps = {
	setOpenSearch: Dispatch<SetStateAction<boolean>>;
};

const MobileSearch: React.FC<ButtonProps> = ({ setOpenSearch }) => {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const queryChangeHandler = (e: any) => {
		setQuery(e.target.value);
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		router.push(`/search?query=${query}`);
		setQuery('');
		setIsSubmitted(true);
	};

	return (
		<form onSubmit={submitHandler}>
			<TextField
				margin="normal"
				fullWidth
				id="filled-search"
				placeholder="Search"
				// type="search"
				onChange={queryChangeHandler}
				focused={isSubmitted}
				variant="standard"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
							<CloseIcon onClick={() => setOpenSearch(false)} />
						</InputAdornment>
					),
				}}
			/>
		</form>
	);
};

export default MobileSearch;
