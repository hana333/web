export default ({type, className = '', size = 'md', ...restProps}) => (
	<svg
		className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
		{...restProps}
	>
		<use xlinkHref={type} />
	</svg>
);