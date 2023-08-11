import { useState } from "react";
import { NasaMediaItem } from "../../../model/ISearchItem";
import { API_URL } from "../../../model/constants";


interface SearchResponse {
  collection: {
    items: Array<{
      links: {
        href: string;
      }[];
      data: NasaMediaItem[];
    }>;
  };
}

interface SearchError {
    message: string;
}

function useSearch() {
  const [results, setResults] = useState<NasaMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, yearStart?: string, yearEnd?: string) => {
    setLoading(true);
    setError(null);
    
    const baseURL = `${API_URL}/search`;

    let params = new URLSearchParams();
    if (query) params.append("q", query);
    if (yearStart) params.append("year_start", yearStart);
    if (yearEnd) params.append("year_end", yearEnd);
    params.append("media_type", "image"); // Always search for images

    try {
      const response = await fetch(`${baseURL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }
      const data: SearchResponse = await response.json();

      // Transform the data as required
      const transformedResults = data.collection.items.map(item => ({
        ...item.data[0],
        thumbnailUrl: item.links[0].href,
    }));
      setResults(transformedResults);

    } catch (err) {
      setError((err as SearchError).message);
    } finally {
      setLoading(false);
    }
  };

  return { results, search, loading, error };
}

export default useSearch;
