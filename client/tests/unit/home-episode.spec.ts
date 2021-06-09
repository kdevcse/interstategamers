import { shallowMount } from '@vue/test-utils'
import HomeEpisode from 'src/components/HomeEpisode.vue';
import { IRankingInfo } from 'src/interfaces/IRankingInfo';

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
			"Episode": "2-10",
			"Game": "Metroid Prime",
			"Platform": "GC",
			"K. Gameplay": 93,
			"K. Visuals": 87,
			"K. Audio": 93,
			"K. Content": 92,
			"P. Gameplay": 80,
			"P. Visuals": 90,
			"P. Audio": 95,
			"P. Content": 95,
			"Episode Number": 25,
			"Guest": "Ryan",
			"G. Gameplay": 95,
			"G. Visuals": 99,
			"G. Audio": 98,
			"G. Content": 92,
			"IGN": 98,
			"Metacritic": 97,
			"Year": 2002,
			"IG Score": 92,
			"Kevin's Rating": 91.66666666666667,
			"Peter's Rating": 89.16666666666667,
			"Guest Rating": 95.16666666666667,
			"K. Aesthetics": 90,
			"P. Aesthetics": 92.5,
			"G. Aesthetics": 98.5,
			"Gameplay": 89.33333333333333,
			"Aesthetics": 93.66666666666667,
			"Visuals": 92,
			"Audio": 95.33333333333333,
			"Content": 93,
			"rank": 7,
			"GameImage": "metroid_prime.jpg"
        };

        (homeEpisode.vm as any).sendScore(rankInfo);
        homeEpisode.vm.$nextTick();
        const result = (homeEpisode.emitted('show-score')as any)[0][0];
        expect(result[0]).toBe(rankInfo);
        expect(result[1]).toBe('2:10: Metroid Prime');
    });
})