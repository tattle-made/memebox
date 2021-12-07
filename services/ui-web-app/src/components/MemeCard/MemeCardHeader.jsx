import { CardHeader, Text, Anchor } from "grommet";

const MemeHeader = ({title}) => {
	return (
		<CardHeader style={{textTransform: 'capitalize'}} background='light-1' pad='small'>
			<Text>
				{title}
			</Text>
		</CardHeader>
	)
}

export default MemeHeader;