import {ProgressBar} from '../../../Ratings/ratings_table';

test('Creating a progress bar',()=>{
    const val = 88;
    const progType = 'Overall';
    const progBar = new ProgressBar(val,progType);
    const header = progBar.createHeader();
    const bar = <HTMLElement> progBar.createProgressBar().firstChild;

    expect(bar.style.width).toBe('88%');
    expect(header.innerHTML).toBe(`${progType}: ${val}/100`);
});