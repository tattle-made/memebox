import { Heading } from "grommet"


const MemeHeader = (props) => {
	const { title } = props

	return (
		<Heading {...props}>
			{title}
		</Heading>
	)
}

export default MemeHeader;