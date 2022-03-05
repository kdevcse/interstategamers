import { computed } from "vue";

// We can use this once issue https://github.com/vuejs/core/issues/4294 is solved
export interface IHomeRankingProps {
  totalGames?: number,
  title?: string,
  gameplay?: number,
  aesthetics?: number,
  content?: number,
  overall?: number,
  rank?: number
}

export function useRankingValues(props: IHomeRankingProps) {
  const getTitle = computed((): string => {
    return props.title ? props.title : "Hover a review to see its ranking!";
  });

  const getGameplay = computed((): number => {
    return props.gameplay ? props.gameplay : 0;
  });

  const getAesthetics = computed((): number => {
    return props.aesthetics ? props.aesthetics : 0;
  });

  const getContent = computed((): number => {
    return props.content ? props.content : 0;
  });

  const getOverall = computed((): number => {
    return props.overall ? props.overall : 0;
  });

  return { getTitle, getGameplay, getAesthetics, getContent, getOverall };
}
