import { CategoryTypes, EpisodeTypes, IRatingInfo } from "@/interfaces/IRatingInfo";
import { XMLParser } from "fast-xml-parser";
import ratingsJson from "@/data/ratings.json";

export async function getRatings() {
  const ratings: IRatingInfo[] = ratingsJson as any;
  ratings.sort((a, b) => b[CategoryTypes.OVERALL] - a[CategoryTypes.OVERALL]).forEach((rating, index) => {
    const currentScore = rating[CategoryTypes.OVERALL];
    const lastScore = index > 0 ? ratings[index - 1][CategoryTypes.OVERALL] : null;
    rating[CategoryTypes.RANK] = lastScore && (currentScore === lastScore) ? ratings[index - 1][CategoryTypes.RANK] : index + 1;
  });
  
  return ratings;
}

export async function getEpisodes(sort = false) {
  const result = await fetch("https://anchor.fm/s/f1e37190/podcast/rss");
  const txt = await result.text();

  const parserOptions = {
    ignoreAttributes: false,
    allowBooleanAttributes: false
  };
  const parser = new XMLParser(parserOptions);
  const jobj = parser.parse(txt);
  const episodes: any[] = jobj.rss.channel.item;
  episodes.map(ep => {
    const regex = new RegExp(/\d-\d+: */, "g");
    ep["itunes:episodeType"] = regex.test(ep.title) ? EpisodeTypes.REVIEW : EpisodeTypes.BONUS;
    return ep;
  });

  if (!sort) {
    return episodes;
  }
  
  episodes.sort((epA, epB) => {
    return (new Date(epB.pubDate) as any) - (new Date(epA.pubDate) as any);
  });

  return episodes;
}