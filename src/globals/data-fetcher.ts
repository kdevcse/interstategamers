import { CategoryTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import ratingsJson from "@/data/ratings.json";

export function getRatings() {
  const ratings: IRatingInfo[] = ratingsJson as any;
  ratings.sort((a, b) => b[CategoryTypes.OVERALL] - a[CategoryTypes.OVERALL]).forEach((rating, index) => {
    const currentScore = rating[CategoryTypes.OVERALL];
    const lastScore = index > 0 ? ratings[index - 1][CategoryTypes.OVERALL] : null;
    rating[CategoryTypes.RANK] = lastScore && (currentScore === lastScore) ? ratings[index - 1][CategoryTypes.RANK] : index + 1;
  });
  
  return ratings;
}

export async function getEpisodes(sort = false) {
  const rssUrl = import.meta.env.VITE_RSS_URL;

  if (!rssUrl) {
    throw("RSS environment variable not found");
  }

  const result = await fetch(rssUrl);
  const txt = await result.text();

  const parserOptions: X2jOptions = {
    ignoreAttributes: false,
    allowBooleanAttributes: false
  };
  const parser = new XMLParser(parserOptions);
  const jobj = parser.parse(txt);
  const episodes: IEpisodeInfo[] = jobj.rss.channel.item;

  if (!sort) {
    return episodes;
  }
  
  episodes.sort((epA, epB) => {
    return (new Date(epB.pubDate) as any) - (new Date(epA.pubDate) as any);
  });

  return episodes;
}