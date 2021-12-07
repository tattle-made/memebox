import { CardBody, Image, Video,  } from "grommet";

const MemeBody = ({type, src}) => {

	const HandleMemeBody = (type) => {
		if (type === 'image' || type === 'GIF') {
			return <Image fit="contain" src={ src } />
		}
		else {
			return (
				<Video fit="cover">
					<source key="video" src={ src } type="video/mp4" />
				</Video>
			)
		}
	}

	return (
		<CardBody pad="small">
			{HandleMemeBody(type)}
		</CardBody>
	)
}

export default MemeBody;