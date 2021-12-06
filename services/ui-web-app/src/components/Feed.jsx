//call meme.js here
import { Box, Grid } from "grommet";
import { useContext } from "react";
import { DataContext } from "../App";
import Meme from "./Meme";

const Feed = () => {

  const {filterCurrentData} = useContext(DataContext)
  const Memes = filterCurrentData.map(value => <Meme value={value} />);

	return (
		<Box pad='medium'>
      <Grid gap="large" columns={{ count: 'fit', size: 'small' }}>
        {Memes}
      </Grid>
    </Box>
	);
}

export default Feed;