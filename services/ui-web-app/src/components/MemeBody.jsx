import { Box, Video, Image } from "grommet"


const MemeBody = ({type, src}) => {

	const HandleMemeBody = (type) => {
		if (type === 'image' || type === 'GIF') {
			return <Image fit="contain" src={ src } />
		}
		else {
			return (
				<Video fit="contain">
					<source key="video" src={ src } type="video/mp4" />
				</Video>
			)
		}
	}

	return (
		<Box pad="small">
			{HandleMemeBody(type)}
		</Box>
	)
}

export default MemeBody;