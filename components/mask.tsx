import React from 'react';
import { IMaskInput } from 'react-imask';

interface PhoneInputMaskProps {
	inputRef: React.RefObject<HTMLInputElement>;
	// Add other props if needed
}

export const PhoneInputMask = (props: PhoneInputMaskProps) => {
	const { inputRef, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask={[/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/]}
			inputRef={inputRef}
			alwaysShowMask={true}></IMaskInput>
	);
};

// <Controller
// name="phone"
// defaultValue=""
// control={control}
// rules={{
//   required: true,
//   pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
// }}
// render={({ field }) => (
//   <TextField
//     sx={{ mb: 2.5 }}
//     className="register"
//     required
//     id="phone"
//     label="phone"
//     inputProps={{ type: 'tel' }}
//     error={Boolean(errors.phone)}
//     helperText={
//       errors.phone
//         ? errors.phone.type === 'pattern'
//           ? 'Invalid Telephone'
//           : 'Telephone Required'
//         : ''
//     }
//     {...field}
//   />
// )}
// />
