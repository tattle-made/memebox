import { Grid } from "grommet";
import { useContext } from "react";
import { DataContext } from "../App";
import Meme from "./MemeCard/Meme";
import { Link } from "react-router-dom";


const Feed = () => {

  const { filterCurrentData } = useContext(DataContext)
  
  const Memes = filterCurrentData?.map(value => {
    return (
      <Link
        to={`/${value.id}`}
      >
        <Meme value={value} />
        </Link>
    )
  });

	return (
    <Grid
      // fill='horizontal'
      gap="medium"
      pad='medium'
      columns={{ count: 'fit', size: '1/4' }}
    >
      {Memes}
    </Grid>
	);
}

export default Feed;