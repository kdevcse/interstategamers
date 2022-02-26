import { shallowMount } from '@vue/test-utils'
import HomeEpisode from '@/components/HomeEpisode.vue';
import { IRankingInfo } from '@/interfaces/IRankingInfo';

describe('HomeEpisode', () => {
  it('Send score', () => {
    let homeEpisode = shallowMount(HomeEpisode, {
      propsData: {
        title: '2:10: Metroid Prime'
      },
      stubs: {
        'font-awesome-icon': true
      }
    });
    const rankInfo: IRankingInfo = {
      episode: "2-10",
      id: "asdkadsfhjfj123",
      game: "Metroid Prime",
      platform: "GC",
      k_gameplay: 93,
      k_visuals: 87,
      k_audio: 93,
      k_content: 92,
      p_gameplay: 80,
      p_visuals: 90,
      p_audio: 95,
      p_content: 95,
      episode_number: 25,
      guest: "Ryan",
      g_gameplay: 95,
      g_visuals: 99,
      g_audio: 98,
      g_content: 92,
      ign: 98,
      metacritic: 97,
      year: 2002,
      ig_score: 92,
      k_rating: 91.66666666666667,
      p_rating: 89.16666666666667,
      g_rating: 95.16666666666667,
      k_Aesthetics: 90,
      p_Aesthetics: 92.5,
      g_Aesthetics: 98.5,
      gameplay: 89.33333333333333,
      aesthetics: 93.66666666666667,
      visuals: 92,
      audio: 95.33333333333333,
      content: 93,
      game_image: "metroid_prime.jpg"
    };

    (homeEpisode.vm as any).sendScore(rankInfo.id);
    homeEpisode.vm.$nextTick();
    const result = (homeEpisode.emitted('show-score') as any)[0][0];
    expect(result[0]).toBe(rankInfo.id);
  });
})