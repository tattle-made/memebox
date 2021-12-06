import { Box, Pagination, Select } from 'grommet';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../App';
import memes from '../data-structure';


function PaginateAndFilter() {
  const [allFilters, setAllFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [currentData, setCurrentData] = useState([]);

  const { memesData, setFilterCurrentData } = useContext(DataContext);
  
    useEffect(() => {
    const memesType = memesData.map(elem => elem.type)
    setAllFilters(['all', ...new Set(memesType)])
    setCurrentData(memesData.slice(0, 4));
  }, [memesData])
  
  useEffect(() => {
    selectedFilter === 'all' || selectedFilter === '' ? setFilterCurrentData(currentData) : setFilterCurrentData(currentData.filter(value => value.type === selectedFilter))
  }, [selectedFilter, currentData])

  const handleChange = (event) => {
    const { startIndex, endIndex } = event;
    const nextData = memesData.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setSelectedFilter('');
  };
 

  return (
    <Box direction='row' alignContent="center" justify="start">
      <Select
        placeholder="All"
        value={selectedFilter}
        options={allFilters}
        onChange={(e) => setSelectedFilter(e.target.value)}
        clear
        margin='medium'
      />
      <Pagination
        alignSelf='center'
        numberEdgePages={5}
        numberItems={memesData.length}
        onChange={handleChange}
        step={4}
      />
    </Box>
  );
}

export default PaginateAndFilter;