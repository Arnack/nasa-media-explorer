import { Button, FormControl, Input, Card, Flex, Text } from "@chakra-ui/react";
import { FC, useState } from "react";

interface SearchFormProps {
  onSearch: (query: string, yearStart: string, yearEnd: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [errors, setErrors] = useState<{ query?: string; yearStart?: string; yearEnd?: string }>({});

  const validate = () => {
    let validationErrors = {};

    if (!query) {
      validationErrors = { ...validationErrors, query: "Query is required." };
    }

    if (yearStart && yearEnd && parseInt(yearStart) > parseInt(yearEnd)) {
      validationErrors = { ...validationErrors, yearStart: "Start year should be less than end year." };
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSearchClick = () => {
    if (validate()) {
      onSearch(query, yearStart, yearEnd);
    }
  };

  return (
    <Card p={["1rem", "1rem", "1.2rem", "1.3rem"]} mt={["1rem", "1rem", "3rem", "0"]}>
      <Flex direction={{ base: "column", md: "row" }} gap="15px" alignItems="center">
        
        {/* Search Input */}
        <FormControl width={["100%", "100%", "40%", "50%"]}>
          <Input
            role={"textbox"}
            placeholder="Search NASA Media Library"
            _placeholder={{
              opacity: 0.4,
              color: "inherit",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search Input"
            isInvalid={!!errors.query}
          />
          {errors.query && <Text fontSize="sm" color="red.500">{errors.query}</Text>}
        </FormControl>

        {/* Start Date Input */}
        <FormControl width={["100%", "100%", "20%", "20%"]}>
          <Input 
            type="number" 
            placeholder="Start Year" 
            aria-label="Start Year Input"
            min="1900"
            max={new Date().getFullYear().toString()}
            value={yearStart}
            onChange={(e) => setYearStart(e.target.value)}
            isInvalid={!!errors.yearStart}
          />
          {errors.yearStart && <Text fontSize="sm" color="red.500">{errors.yearStart}</Text>}
        </FormControl>

        {/* End Date Input */}
        <FormControl width={["100%", "100%", "20%", "20%"]}>
          <Input 
            type="number" 
            placeholder="End Year" 
            aria-label="End Year Input"
            min="1900"
            max={new Date().getFullYear().toString()}
            value={yearEnd}
            onChange={(e) => setYearEnd(e.target.value)}
            isInvalid={!!errors.yearEnd}
          />
        </FormControl>
        
        <Button
          role={"button"}
          colorScheme="blue"
          width={["100%", "100%", "20%", "19%"]}
          aria-label="submit"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Flex>
    </Card>
  );
}

export default SearchForm;
