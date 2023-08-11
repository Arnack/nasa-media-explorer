import React from "react";
import { Box } from "@chakra-ui/react";
import SearchForm from "./components/SearchForm";
import SearchResultList from "./components/SearchResultList";
import useSearch from "./hooks/useSearch";

const SearchPage = () => {
  const { results, search } = useSearch();

  return (
    <Box>
      <SearchForm onSearch={search} />
      <SearchResultList results={results} />
    </Box>
  
  );
}

export default SearchPage;
