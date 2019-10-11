import { ProgressBar, RankingsChart, GameData, GameCritic } from '../../../Ratings/ratings_table';

test('Creating a progress bar',()=>{
    const val = 88;
    const progType = 'Overall';
    const progBar = new ProgressBar(val,progType);
    const header = progBar.createHeader();
    const bar = <HTMLElement> progBar.createProgressBar().firstChild;

    expect(bar.style.width).toBe('88%');
    expect(header.innerHTML).toBe(`${progType}: ${val}/100`);
});

test('Creating a rankings chart',()=>{
    const title = "Kevin's Scores";
    const gameplay = 95;
    const visuals = 92;
    const audio = 47;
    const content = 52;
    const overall = 99;
    const chart = new RankingsChart(title,gameplay,visuals,audio,content,overall).create();

    expect(chart.childNodes.length).toBe(11);
    const titleE = <HTMLElement>chart.childNodes[0];
    expect(titleE.innerHTML).toBe(title);

    const overallH = <HTMLElement>chart.childNodes[1];
    expect(overallH.innerHTML).toBe(`Overall: ${overall}/100`);
    const overallP = <HTMLElement>chart.childNodes[2].firstChild;
    expect(overallP.style.width).toBe(`${overall}%`);

    const gameplayH = <HTMLElement>chart.childNodes[3];
    expect(gameplayH.innerHTML).toBe(`Gameplay: ${gameplay}/100`);
    const gameplayP = <HTMLElement>chart.childNodes[4].firstChild;
    expect(gameplayP.style.width).toBe(`${gameplay}%`);

    const visualsH = <HTMLElement>chart.childNodes[5];
    expect(visualsH.innerHTML).toBe(`Visuals: ${visuals}/100`);
    const visualsP = <HTMLElement>chart.childNodes[6].firstChild;
    expect(visualsP.style.width).toBe(`${visuals}%`);

    const audioH = <HTMLElement>chart.childNodes[7];
    expect(audioH.innerHTML).toBe(`Audio: ${audio}/100`);
    const audioP = <HTMLElement>chart.childNodes[8].firstChild;
    expect(audioP.style.width).toBe(`${audio}%`);

    const contentH = <HTMLElement>chart.childNodes[9];
    expect(contentH.innerHTML).toBe(`Content: ${content}/100`);
    const contentP = <HTMLElement>chart.childNodes[10].firstChild;
    expect(contentP.style.width).toBe(`${content}%`);
});

test('Creating Game Data (no sort/no title)',()=>{
    const dataType = 'gameplay';
    const dataVal = '92';
    const data = new GameData(dataType, dataVal).create();
    expect(data.className).toBe(`rankings-table-${dataType}`);
    expect(data.innerHTML).toBe(dataVal);
});

test('Creating Game Data (sort/title)',()=>{
    const dataType = 'platform';
    const dataVal = 'N64';
    const data = new GameData(dataType, dataVal, true).create(true);
    expect(data.className).toBe(`rankings-table-${dataType} sorted`);
    expect(data.innerHTML).toBe(dataVal);
    expect(data.title).toBe(dataVal);
});

test('Creating metacritic info',()=>{
    const critic = new GameCritic('Metacritic',97);
    const criticElement = critic.createElement();
    expect(criticElement.className).toBe('meta-container');
    expect(criticElement.title).toBe('Metacritic Score');
    expect(critic.ImageName).toBe('MetaLogo.png');
    const score = <HTMLElement> criticElement.lastChild;
    expect(score.innerText).toBe('97');
});

test('Creating ign info',()=>{
    const critic = new GameCritic('IGN',82);
    const criticElement = critic.createElement();
    expect(criticElement.className).toBe('ign-container');
    expect(criticElement.title).toBe('IGN Score');
    expect(critic.ImageName).toBe('IgnLogo.png');
    const score = <HTMLElement> criticElement.lastChild;
    expect(score.innerText).toBe('82');
});