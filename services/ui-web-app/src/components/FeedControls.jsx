import PaginateAndFilter from "./PaginateAndFilterData";
import React, { useContext } from "react";
import { Box, Button } from "grommet";
import { DataContext } from "../App";

function FeedControls() {

	const { isDark, setIsDark } = useContext(DataContext);

	return (
		<Box direction='row' justify='between'>
			<PaginateAndFilter />
			<Button
				onClick={() => setIsDark(!isDark)}
				margin='large'
				label='Toggle Theme'
			/>
		</Box>
	);
}

export default FeedControls;

