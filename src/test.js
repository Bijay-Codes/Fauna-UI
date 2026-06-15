import { colorAnim } from './Data/animalsData.ts';
checkCategory(colorAnim)
function checkCategory(list) {
    const categories = {};
    list.forEach(data => {
        data.categories.forEach(cat => {
            if (categories[cat]) {
                categories[cat]++;
            } else {
                categories[cat] = 1;
            }
        });
    });
    console.log(categories)
}
