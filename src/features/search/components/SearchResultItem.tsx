import { Box, Image, Text, VStack, Icon, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdCameraAlt } from "react-icons/md";  // Importing location and camera icons from react-icons
import { FC } from "react";
import { NasaMediaItem } from "../../../model/ISearchItem";

interface SearchResultItemProps {
    item: NasaMediaItem
}

const SearchResultItem: FC<SearchResultItemProps> = ({ item }) => {

    return (
        <Link to={`/show/${item.nasa_id}`}>
            <VStack spacing={2} alignItems="start" p={2}>
                <Box boxSize="180px" bg="gray.200" overflow="hidden">
                    <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                </Box>
                <Text size="sm">{item.title}</Text>

                {/* Conditionally render location */}
                {item.location && (
                    <HStack>
                        <Icon as={MdLocationOn} color="teal.600" />
                        <Text>
                            {item.location}
                        </Text>
                    </HStack>
                )}

                {/* Conditionally render photographer */}
                {item.photographer && (
                    <HStack>
                        <Icon as={MdCameraAlt} color="blue.600" mr={1} mt="1px" />
                        <Text>
                            {item.photographer}
                        </Text>
                    </HStack>
                )}
            </VStack>
        </Link>
    );
}

export default SearchResultItem;
