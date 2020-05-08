import episodeData from '../database/data.json'

function sortEpisodesByDate (a: any, b: any) {
  return (new Date(b.published_at) as any) - (new Date(a.published_at) as any)
}

export default episodeData.sort(sortEpisodesByDate)
