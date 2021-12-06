import { CardHeader, Text } from "grommet";

const MemeHeader = ({title}) => {
	return (
		<CardHeader background='light-1' pad='small'>
			<Text>{title}</Text>
		</CardHeader>
	)
}

export default MemeHeader;