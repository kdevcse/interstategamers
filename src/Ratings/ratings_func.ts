/*
This file handles events occuring after load on the ratings table page
*/

import {loadData, checkScrollIndicators} from './ratings_table';

//Handle scroll icons
window.addEventListener('scroll', function () { checkScrollIndicators() });
window.addEventListener('resize', function () { checkScrollIndicators() });
window.addEventListener('load', function () { loadData() });