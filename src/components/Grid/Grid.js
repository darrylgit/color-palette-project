import React from 'react';

const Grid = props => {
	return(
		<figure style={props.gridContainerStyle}>
			<figcaption>
				{props.children}
			</figcaption>
		</figure>
	)
}

export default Grid;