import { Box, SimpleGrid, Card } from "@chakra-ui/react";
import SearchResultItem from "./SearchResultItem";
import { FC } from "react";
import { NasaMediaItem } from "../../../model/ISearchItem";

interface SearchResultListProps {
  results: NasaMediaItem[];
}

const SearchResultList: FC<SearchResultListProps> = ({ results }) => {
  return (
    <Box mt={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {results.map((item) => (
          <Card key={item.nasa_id} p={4} boxShadow="sm" rounded="md">
            <SearchResultItem item={item} />
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default SearchResultList;
