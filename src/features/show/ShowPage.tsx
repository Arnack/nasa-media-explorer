import { useEffect, useState } from "react";
import {
    Box,
    Card,
    Text,
    Image,
    Flex,
    Stack,
    Heading,
    Button,
    SimpleGrid,
  } from "@chakra-ui/react";
  import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../model/constants";

  // placeholder images
  const imgUrl = "https://via.placeholder.com/500";
  const imgError = "https://via.placeholder.com/500?text=Image+not+found";

  interface AssetData {
    title: string;
    center: string;
    photographer?: string;
    secondary_creator?: string;
    date_created: string;
    description: string;
    keywords: string[];
    album?: string;
    href?: string;
    data: AssetData[];
  }

  interface AlbumItem {
    links?: { href: string }[];
  }
  
  interface FetchDataResponse<T> {
    collection: {
      items: T[];
    };
  }
  
  const ShowPage = () => {
    const [assetData, setAssetData] = useState<AssetData | null>(null);
    const [album, setAlbum] = useState<AlbumItem[] | null>(null);
    const [imgData, setImgData] = useState<string | null >(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { nasa_id } = useParams();
    const navigate = useNavigate();
  
    const fetchData = async (url: string, callback: Function) => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
        setError(null);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData(`${API_URL}/asset/${nasa_id}`, (data: FetchDataResponse<AssetData>) => {
        setImgData(data.collection.items[0].href ?? null);
      });
    }, [nasa_id]);
  
    useEffect(() => {
      if (assetData?.album) {
        fetchData(`${API_URL}/album/${assetData?.album}`, (data: FetchDataResponse<AlbumItem>) => {
          setAlbum(data.collection.items);
        });
      }
    }, [assetData]);
  
    useEffect(() => {
      fetchData(`${API_URL}/search?q=${nasa_id}`, (data: FetchDataResponse<AssetData>) => {
        setAssetData(data.collection.items[0].data[0]);
      });
    }, [nasa_id]);
  
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return;
      return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
  
    return (
        <Box w={"100% "}>
            <Button
              onClick={() => navigate("/")}
              width="1fr"
              colorScheme="blue"
              type="button"
            >
              Back
            </Button>
          {assetData !== null || !loading ? (
            <Card mt="2rem" p={["10px", "40px", "40px", "40px"]}>
              <Flex
                direction={["column", "column-reverse", "row", "row"]}
                gap="20px"
              >
                {!loading ? (
                  <Image
                    shadow="lg"
                    borderRadius="lg"
                    objectFit="cover"
                    width={["100%", "100%", "40%", "50%"]}
                    height={["auto"]}
                    maxH="500px"
                    fallbackSrc={imgUrl}
                    src={imgData || imgError}
                  />
                ) : null}
  
                <Box p={["50px", "20px", "40px", "40px"]}>
                  <Stack>
                    <Heading fontSize={"xl"}>{assetData?.title}</Heading>
  
                    <Flex direction="row" gap="10px" pt="10px" alignItems={"center"}>
                      📍
                      <Text fontSize={"xs"} fontWeight={"normal"}>
                        {assetData?.center}
                      </Text>
                    </Flex>
                    <Flex direction="row" gap="10px" pt="0px" align={"center"}>
                      📸
                      <Text fontSize={"xs"} fontWeight={"normal"}>
                        {assetData?.photographer
                          ? assetData?.photographer
                          : assetData?.secondary_creator
                          ? assetData?.secondary_creator
                          : "N/A"}
                      </Text>
                    </Flex>
                    <Flex direction={"row"} gap="10px" pt="0px" alignItems={"center"}>
                      📅
                      <Text fontSize={"xs"} fontWeight={"normal"}>
                        {formatDate(assetData?.date_created)}
                      </Text>
                    </Flex>
                    <Flex direction={"column"} gap="10px" pt="20px">
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        Description:
                      </Text>
                      <Text fontSize={"xs"} fontWeight={"normal"}>
                        {assetData?.description}
                      </Text>
                    </Flex>
                    
                    
                    <Box pb="20px">
                    <Text fontSize={"0.6rem"} fontWeight={"bold"}>
                      Keywords:
                    </Text>
                    <Flex direction={"row"} gap="5px" flexWrap={"wrap"}>
                      {assetData?.keywords.map((keyword) => {
                        return (
                          <Card p={["2px", "3px", "3px", "3px"]}>
                            <Flex
                              direction={"row"}
                              alignItems={"center"}
                              justify="center"
                              gap="3px"
                              p={["2px", "3px", "3px", "3px"]}
                            >
                              <Box>
                                🏷
                              </Box>
                              <Box>
                                <Text
                                  key={keyword}
                                  fontSize="0.6rem"
                                  fontWeight="light"
                                  mr="5px"
                                >
                                  {keyword}
                                </Text>
                              </Box>
                            </Flex>
                          </Card>
                        );
                      })}
                    </Flex>
                  </Box>

                  {album ? (
                    <Box width={"100%"}>
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        From Album:
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"normal"}>
                        {assetData?.album}
                      </Text>
                      <Text mt="10px" fontSize={"xs"} fontWeight={"light"}>
                        Other photos from this album:
                      </Text>
                    </Box>
                  ) : null}
                  </Stack>
                </Box>
              </Flex>
              <Box>
              <SimpleGrid
                    columns={[2, 3, 3, 3]}
                    gap={"10px"}
                    padding={["20px", "10px", "50px", "10px"]}
                  >
                    {album ? (
                      album?.map((item, index) => {
                        return (
                          <Box key={index} width="100%">
                            <Card
                              height={["300px", "110px", "150px", "180px"]}
                              variant="elevated"
                              overflow={"hidden"}
                              p={["10px", "10px", "10px", "10px"]}
                            >
                              <Image
                                shadow="sm"
                                borderRadius={"md"}
                                objectFit="cover"
                                width={["100%", "100%", "100%", "100%"]}
                                height={["90px", "90px", "130px", "160px"]}
                                fallbackSrc={imgUrl}
                                src={item.links !== undefined
                                      ? item.links[0].href
                                      : imgError}
                              />
                            </Card>
                          </Box>
                        );
                      })
                    ) : (
                      <Box>
                        <Text fontSize={"sm"} fontWeight={"bold"}>
                          No Album Found
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
              </Box>
            </Card>
          ) : (
            <Box>{error}</Box>
          )}
        </Box>  
    );
  };
  
  export default ShowPage;
  