import {
    ProgressBar, RankingsChart, GameData, GameCritic,
    tableInsert, checkScrollIndicators, loadData, GameRankings, GameBreakdown
} from '../../src/ratings/ratings_table';

//Mocked data
const starFoxData = {
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
    "type": "full",
    "updated_at": "2019-05-12T21:31:13.049868-07:00"
};

const metroidData = {
    "Game Image": "metroid_zero_mission.jpg",
    "Rank": 14,
    "Ranking Info": {
        "Aesthetics": 92.66666666666667,
        "Audio": 92,
        "Content": 84.33333333333333,
        "Episode": "1-5",
        "Episode Number": 5,
        "G. Aesthetics": 96.5,
        "G. Audio": 98,
        "G. Content": 85,
        "G. Gameplay": 92,
        "G. Visuals": 95,
        "Game": "Metroid: Zero Mission",
        "Gameplay": 92,
        "Guest": "Ryan",
        "Guest Rating": 91.16666666666667,
        "IG Score": 89.66666666666667,
        "IGN": 0,
        "K. Aesthetics": 89,
        "K. Audio": 88,
        "K. Content": 83,
        "K. Gameplay": 89,
        "K. Visuals": 90,
        "Kevin's Rating": 87,
        "Metacritic": 0,
        "P. Aesthetics": 92.5,
        "P. Audio": 90,
        "P. Content": 85,
        "P. Gameplay": 95,
        "P. Visuals": 95,
        "Peter's Rating": 90.83333333333333,
        "Platform": "GBA",
        "Visuals": 93.33333333333333,
        "Year": 2004
    },
    "description": "In this Kraid-sized episode, the boys recruit resident Metroid expert Ryan Everitt to help them navigate the labyrinth of Metroid: Zero Mission for the Game Boy Advance.",
    "number": 5,
    "published_at": "2018-03-12T05:00:00.000000-07:00",
    "slug": "mzm",
    "status": "published",
    "title": "1-5: Metroid Zero Mission",
    "type": "full",
    "updated_at": "2019-05-12T21:30:52.072266-07:00"
}

beforeAll(()=>{
    //Create rankings table
    const table = document.createElement('table');
    table.id = 'rankings-table';
    window.document.body.appendChild(table);
});

//Helper functions used to help find a game in the table and its info
function hasGame(table: HTMLTableElement, game: string): boolean {
    const rows = table.getElementsByClassName('rankings-table-row');
    for(let i = 0; i < rows.length; i++){
        if (rows[i].getAttribute('game') === game){
            return true;
        }
    }
    return false;
}

function findGame(table: HTMLTableElement, game: string): Element {
    const rows = table.getElementsByClassName('rankings-table-row');
    for(let i = 0; i < rows.length; i++){
        if (rows[i].getAttribute('game') === game){
            return rows[i];
        }
    }
    return null;
}

function hasGameInfo(table: HTMLTableElement, game: string): boolean {
    const rows = table.getElementsByClassName('rankings-row-info');
    for(let i = 0; i < rows.length; i++){
        if (rows[i].getAttribute('game') === game){
            return true;
        }
    }
    return false;
}

function findGameInfo(table: HTMLTableElement, game: string): Element {
    const rows = table.getElementsByClassName('rankings-row-info');
    for(let i = 0; i < rows.length; i++){
        if (rows[i].getAttribute('game') === game){
            return rows[i];
        }
    }
    return null;
}

describe('Creating table elements',()=>{
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

    test('Creating Game Rankings Row (no guest)',()=>{
        const rankings = new GameRankings(starFoxData);
        const fakeTable = document.createElement('table');
        expect(fakeTable.childNodes.length).toBe(0);
        rankings.insertInTable(fakeTable);
        expect(hasGame(fakeTable,starFoxData['Ranking Info']['Game'])).toBeTruthy();

        const row = findGame(fakeTable,starFoxData['Ranking Info']['Game']);
        const rank = <HTMLElement>row.childNodes[0];
        expect(rank.innerHTML).toBe(`${starFoxData['Rank']}`);
        const title = <HTMLElement>row.childNodes[1];
        expect(title.innerHTML).toBe(`${starFoxData['Ranking Info']['Game']}`);
        const year = <HTMLElement>row.childNodes[2];
        expect(year.innerHTML).toBe(`${starFoxData['Ranking Info']['Year']}`);
        const platform = <HTMLElement>row.childNodes[3];
        expect(platform.innerHTML).toBe(`${starFoxData['Ranking Info']['Platform']}`);
        const overall = <HTMLElement>row.childNodes[4];
        expect(overall.innerHTML).toBe(`${starFoxData['Ranking Info']['IG Score'].toFixed(2)}`);
        const gameplay = <HTMLElement>row.childNodes[5];
        expect(gameplay.innerHTML).toBe(`${starFoxData['Ranking Info']['Gameplay'].toFixed(2)}`);
        const aesthetics = <HTMLElement>row.childNodes[6];
        expect(aesthetics.innerHTML).toBe(`${starFoxData['Ranking Info']['Aesthetics'].toFixed(2)}`);
        const content = <HTMLElement>row.childNodes[7];
        expect(content.innerHTML).toBe(`${starFoxData['Ranking Info']['Content'].toFixed(2)}`);
        const pOverall = <HTMLElement>row.childNodes[8];
        expect(pOverall.innerHTML).toBe(`${starFoxData['Ranking Info']['Peter\'s Rating'].toFixed(2)}`);
        const kOverall = <HTMLElement>row.childNodes[9];
        expect(kOverall.innerHTML).toBe(`${starFoxData['Ranking Info']['Kevin\'s Rating'].toFixed(2)}`);
    });

    test('Creating Game Rankings Row (no guest)',()=>{
        const rankings = new GameRankings(metroidData);
        const fakeTable = document.createElement('table');
        expect(fakeTable.childNodes.length).toBe(0);
        rankings.insertInTable(fakeTable);
        expect(hasGame(fakeTable,metroidData['Ranking Info']['Game'])).toBeTruthy();

        const row = findGame(fakeTable,metroidData['Ranking Info']['Game']);
        const rank = <HTMLElement>row.childNodes[0];
        expect(rank.innerHTML).toBe(`${metroidData['Rank']}`);
        const title = <HTMLElement>row.childNodes[1];
        expect(title.getAttribute('title')).toBe(`${metroidData['Ranking Info']['Game']}`);
        expect(title.innerHTML.includes('fa-user-plus')).toBeTruthy();
        const year = <HTMLElement>row.childNodes[2];
        expect(year.innerHTML).toBe(`${metroidData['Ranking Info']['Year']}`);
        const platform = <HTMLElement>row.childNodes[3];
        expect(platform.innerHTML).toBe(`${metroidData['Ranking Info']['Platform']}`);
        const overall = <HTMLElement>row.childNodes[4];
        expect(overall.innerHTML).toBe(`${metroidData['Ranking Info']['IG Score'].toFixed(2)}`);
        const gameplay = <HTMLElement>row.childNodes[5];
        expect(gameplay.innerHTML).toBe(`${metroidData['Ranking Info']['Gameplay'].toFixed(2)}`);
        const aesthetics = <HTMLElement>row.childNodes[6];
        expect(aesthetics.innerHTML).toBe(`${metroidData['Ranking Info']['Aesthetics'].toFixed(2)}`);
        const content = <HTMLElement>row.childNodes[7];
        expect(content.innerHTML).toBe(`${metroidData['Ranking Info']['Content'].toFixed(2)}`);
        const pOverall = <HTMLElement>row.childNodes[8];
        expect(pOverall.innerHTML).toBe(`${metroidData['Ranking Info']['Peter\'s Rating'].toFixed(2)}`);
        const kOverall = <HTMLElement>row.childNodes[9];
        expect(kOverall.innerHTML).toBe(`${metroidData['Ranking Info']['Kevin\'s Rating'].toFixed(2)}`);
    });

    test('Creating Game Breakdown (no guest)',()=>{
        const breakdown = new GameBreakdown(starFoxData);
        const fakeTable = document.createElement('table');
        expect(fakeTable.childNodes.length).toBe(0);

        breakdown.insertInTable(fakeTable);
        const row = fakeTable.getElementsByClassName('rankings-table-info')[0];
        const tableData = <HTMLElement>row.firstChild;

        expect(tableData.className).toBe('charts');
        const charts = tableData.childNodes;

        const brkdowninfo = <HTMLElement>charts[0];
        expect(brkdowninfo.className).toBe('breakdown-info');
        const chart1 = <HTMLElement>charts[1];
        expect(chart1.className).toBe('chart');
        const chart2 = <HTMLElement>charts[2];
        expect(chart2.className).toBe('chart');
    });

    test('Creating Game Breakdown (guest)',()=>{
        const breakdown = new GameBreakdown(metroidData);
        const fakeTable = document.createElement('table');
        expect(fakeTable.childNodes.length).toBe(0);

        breakdown.insertInTable(fakeTable);
        const row = fakeTable.getElementsByClassName('rankings-table-info')[0];
        const tableData = <HTMLElement>row.firstChild;

        expect(tableData.className).toBe('charts');
        const charts = tableData.childNodes;

        const brkdowninfo = <HTMLElement>charts[0];
        expect(brkdowninfo.className).toBe('breakdown-info');
        const chart1 = <HTMLElement>charts[1];
        expect(chart1.className).toBe('chart');
        const chart2 = <HTMLElement>charts[2];
        expect(chart2.className).toBe('chart');
        const chart3 = <HTMLElement>charts[3];
        expect(chart3.className).toBe('chart');
    });
});

describe('Critic info',()=>{
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
});

describe('Populating table data',()=>{
    //Not working. XMLHttpRequests need to be mocked.
    test.skip('Loading data on webpage',()=>{
        loadData();
        const table = <HTMLTableElement>document.getElementById("rankings-table");
        expect(table.childNodes.length).toBeGreaterThan(0);
    });
    
    test('Inserting table data (with ranking info)',()=>{
        const table = <HTMLTableElement>document.getElementById("rankings-table");
        tableInsert(starFoxData);
        expect(hasGame(table,starFoxData['Ranking Info']['Game'])).toBeTruthy();
        expect(hasGame(table,'A Game That Does Not Exist')).toBeFalsy();
    });
    
    test('Inserting table data (with no ranking info)',()=>{
        const table = <HTMLTableElement>document.getElementById("rankings-table");
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
        expect(hasGame(table,'We Are The Interstate Gamers \u2013 Promo')).toBeFalsy();
    });
});

describe('Table functionality',()=>{
    //Can't fully test scrolling, only default position.
    test('Check scroll indicators',()=>{
        let left = document.createElement('div');
        let indicators = document.createElement('div');
        let right = document.createElement('div');
    
        indicators.id = "scroll-indicators";
        left.id = "scroll-indicator-left";
        right.id = "scroll-indicator-right";
    
        document.body.appendChild(left);
        document.body.appendChild(indicators);
        document.body.appendChild(right);
    
        checkScrollIndicators();
        expect(left.style.visibility).toBe('hidden');
        expect(indicators.style.visibility).toBe('hidden');
        expect(right.style.visibility).toBe('hidden');
    });
});