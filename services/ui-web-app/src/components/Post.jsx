import { Box } from "grommet";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataContext } from "../App";
import MemeBody from "./MemeBody";
import MemeHeader from "./MemeHeader";

const Post = () => {

	const [openPost, setOpenPost] = useState({})
	const { postId } = useParams();
	const { filterCurrentData } = useContext(DataContext)

	useEffect(() => setOpenPost(filterCurrentData[postId-1]),[filterCurrentData, postId, openPost])

	console.log(postId, openPost, 1 );
	return (
		<Box
			pad='medium'
			justify='center'
			basis='small'
			responsive
			height='large'
		>
			<MemeHeader
				title={openPost?.data?.title}
				level="2"
				textAlign='center'
				fill
			/>
			<MemeBody
				type={openPost?.type}
				src={openPost?.data?.url}
			/>
		</Box>
	)

}

export default Post;

// Box
// 	- Header
// 	- Image