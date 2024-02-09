import { CategoryTypes, IEpisodeInfo, IRatingInfo } from "@/interfaces/IRatingInfo";
import { XMLParser } from "fast-xml-parser";
import ratingsJson from "@/data/ratings.json";

export async function getRatings() {
  const ratings: IRatingInfo[] = ratingsJson as any;
  ratings.sort((a, b) => b[CategoryTypes.OVERALL] - a[CategoryTypes.OVERALL]).forEach((rating, index) => {
    const currentScore = rating[CategoryTypes.OVERALL];
    const lastScore = index > 0 ? ratings[index - 1][CategoryTypes.OVERALL] : null;
    rating[CategoryTypes.RANK] = lastScore && (currentScore === lastScore) ? ratings[index - 1][CategoryTypes.RANK] : index + 1;
  });
  //console.log(JSON.stringify(ratings));

  console.log(ratings);
  return ratings;
}

export async function getEpisodes(sort = false) {
  const result = await fetch("https://anchor.fm/s/f1e37190/podcast/rss");
  const txt = await result.text();

  const parser = new XMLParser();
  const jobj = parser.parse(txt);
  const episodes: IEpisodeInfo[] = jobj.rss.channel.item;

  if (!sort) {
    console.log(episodes);
    return episodes;
  }
  
  episodes.sort((epA, epB) => {
    return (new Date(epB.pubDate) as any) - (new Date(epA.pubDate) as any);
  });

  return episodes;
}