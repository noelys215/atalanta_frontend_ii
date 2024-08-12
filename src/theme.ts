import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			// main: 'rgb(68, 68, 68)',
			main: '#231f20',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: 'rgb(246, 241, 235)',
		},
	},
	typography: {
		fontFamily: 'Source Code Pro',
	},
});

export default theme;
