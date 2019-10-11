import { ProgressBar, RankingsChart, GameData, GameCritic, tableInsert } from '../../../src/Ratings/ratings_table';

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

function findGame(game: string): boolean {
    const rows = document.getElementsByClassName('rankings-table-row');
    for(let i = 0; i < rows.length; i++){
        if (rows[i].getAttribute('game') === game){
            return true;
        }
    }

    return false;
}

test('Inserting table data (with ranking info)',()=>{
    const table = document.createElement('table');
    table.id = 'rankings-table';
    window.document.body.appendChild(table);

    const data = {
        "Game Image": "star_fox_64.jpg",
        "Rank": 8,
        "Ranking Info": {
            "Aesthetics": 92.75,
            "Audio": 94,
            "Content": 87,
            "Episode": "1-2",
            "Episode Number": 2,
            "G. Aesthetics": 0,
            "G. Audio": 0,
            "G. Content": 0,
            "G. Gameplay": 0,
            "G. Visuals": 0,
            "Game": "Star Fox 64",
            "Gameplay": 95,
            "Guest Rating": 0,
            "IG Score": 91.58333333333333,
            "IGN": 0,
            "K. Aesthetics": 93,
            "K. Audio": 93,
            "K. Content": 89,
            "K. Gameplay": 95,
            "K. Visuals": 93,
            "Kevin's Rating": 92.33333333333333,
            "Metacritic": 0,
            "P. Aesthetics": 92.5,
            "P. Audio": 95,
            "P. Content": 85,
            "P. Gameplay": 95,
            "P. Visuals": 90,
            "Peter's Rating": 90.83333333333333,
            "Platform": "N64",
            "Visuals": 91.5,
            "Year": 1997
        },
        "description": "The boys break down another N64 classic in Star Fox 64.",
        "number": 2,
        "published_at": "2018-01-21T23:35:00.000000-08:00",
        "slug": "sf64",
        "status": "published",
        "title": "1-2: Star Fox 64",
        "token": "127f8309",
        "type": "full",
        "updated_at": "2019-05-12T21:31:13.049868-07:00"
    };

    tableInsert(data);
    expect(findGame('Star Fox 64')).toBeTruthy();
    expect(findGame('A Game That Does Not Exist')).toBeFalsy();
});

test('Inserting table data (with no ranking info)',()=>{
    const table = document.createElement('table');
    table.id = 'rankings-table';
    window.document.body.appendChild(table);

    const data ={
        "description": "The boys record a promotional trailer for the Interstate Gamers podcast and tell you what the show is all about!",
        "enclosure_url": "https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/ce9369/ce93694b-1ad6-421b-af90-5a35ac2d1430/e8ed045d-938b-4104-b8a2-8d98e015680e/de3f727a_tc.mp3",
        "guid": "2d8e6e2b-2cb8-4b24-81f5-0c882b346105",
        "href": "https://api.simplecast.com/episodes/e8ed045d-938b-4104-b8a2-8d98e015680e?preview=true",
        "id": "e8ed045d-938b-4104-b8a2-8d98e015680e",
        "image_path": "/images/ce9369/ce93694b-1ad6-421b-af90-5a35ac2d1430/e8ed045d-938b-4104-b8a2-8d98e015680e/1536958547artwork.jpg",
        "image_url": "https://cdn.simplecast.com/images/ce9369/ce93694b-1ad6-421b-af90-5a35ac2d1430/e8ed045d-938b-4104-b8a2-8d98e015680e/1536958547artwork.jpg",
        "is_hidden": false,
        "number": 0,
        "published_at": "2018-01-01T00:00:00.000000-08:00",
        "season": {
            "href": "https://api.simplecast.com/seasons/d90ced51-cee4-4a27-88e1-90bfc877fe92",
            "number": 1
        },
        "slug": "promo",
        "status": "published",
        "title": "We Are The Interstate Gamers \u2013 Promo",
        "token": "de3f727a",
        "type": "trailer",
        "updated_at": "2019-05-12T21:30:39.424937-07:00"
    };

    tableInsert(data);
    expect(findGame('We Are The Interstate Gamers \u2013 Promo')).toBeFalsy();
});