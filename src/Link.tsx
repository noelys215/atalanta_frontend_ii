import * as React from 'react';
import clsx from 'clsx';
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Replace next/link and next/router
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface LinkComposedProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
	to: string;
	replace?: boolean;
	scroll?: boolean;
	shallow?: boolean;
	prefetch?: boolean;
	locale?: string;
}

export const LinkComposed = React.forwardRef<HTMLAnchorElement, LinkComposedProps>(
	function LinkComposed(props, ref) {
		const { to, replace, scroll, shallow, prefetch, locale, ...other } = props;

		return <RouterLink to={to} ref={ref} {...other} />;
	}
);

export type LinkProps = {
	activeClassName?: string;
	as?: string;
	href: string;
	linkAs?: string; // Useful when the as prop is shallow by styled().
	noLinkStyle?: boolean;
} & Omit<LinkComposedProps, 'to' | 'href'> &
	Omit<MuiLinkProps, 'href'>;

// A styled version of the React Router Link component:
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
	const {
		activeClassName = 'active',
		as,
		className: classNameProps,
		href,
		linkAs: linkAsProp,
		noLinkStyle,
		replace,
		role, // Link doesn't have roles.
		scroll,
		shallow,
		...other
	} = props;

	const location = useLocation();
	const pathname = href;
	const className = clsx(classNameProps, {
		[activeClassName]: location.pathname === pathname && activeClassName,
	});

	const isExternal =
		typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

	if (isExternal) {
		if (noLinkStyle) {
			return <Anchor className={className} href={href} ref={ref} {...other} />;
		}

		return <MuiLink className={className} href={href} ref={ref} {...other} />;
	}

	const linkAs = linkAsProp || as;

	if (noLinkStyle) {
		return (
			<LinkComposed className={className} ref={ref} to={href} replace={replace} {...other} />
		);
	}

	return (
		<MuiLink
			component={LinkComposed}
			className={className}
			ref={ref}
			to={href}
			replace={replace}
			{...other}
		/>
	);
});

export default Link;
