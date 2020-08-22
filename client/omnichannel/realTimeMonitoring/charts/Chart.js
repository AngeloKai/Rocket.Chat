import React, { forwardRef } from 'react';
import { Box } from '@rocket.chat/fuselage';

const Chart = forwardRef(function Chart(props, ref) {
	return <Box
		padding='x20'
		borderStyle='solid'
		borderWidth='x2'
		borderRadius='x2'
		borderColor='neutral-300'
		height='x300'
		{...props}
	>
		<canvas ref={ref}></canvas>
	</Box>;
});

export default Chart;
