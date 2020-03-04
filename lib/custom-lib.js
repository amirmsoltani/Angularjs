function union() {
    if (!arguments[0])
        return [];
    const list = [];
    let old_list = arguments[0];
    for (let i = 1; i < arguments.length; i++)
        old_list = old_list.concat(arguments[i]);
    for (let i = 0; i < old_list.length; i++)
        if (list.indexOf(old_list[i]) < 0)
            list.push(old_list[i]);
    return list;

}

function unity() {
    const list = [];
    for (let i = 0; i < arguments[0].length; i++) {
        let accept = list.indexOf(arguments[0][i]) < 0;
        for (let ap = 1; ap < arguments.length && accept; ap++)
            accept = accept && arguments[ap].indexOf(arguments[0][i]) + 1;
        if (accept)
            list.push(arguments[0][i]);
    }

    return list;
}

function serialize(hotels) {
    const locations = {};
    const stars = {};
    const prices = {max: 0, min: Infinity};
    const boardTypes = {other: []};
    const boardType_regex = /(all\sinclusive|half\sboard|full\sboard|breakfast|room\sonly)/g;
    const Hotels = [];
    for (let i = 0; i < hotels.length; i++) {
        Hotels.push(i);
        const hotel = hotels[i];
        if (locations[hotel.neighbourhood])
            locations[hotel.neighbourhood].push(i);
        else
            locations[hotel.neighbourhood] = [i];
        const star = parseInt(hotel.starRate);
        if (stars[star])
            stars[star].push(i);
        else
            stars[star] = [i];
        let boardType = union(hotel.boardTypes.join('').toLocaleLowerCase().match(boardType_regex));
        let other = true;
        for (let b in boardType) {
            if (boardTypes[boardType[b]])
                boardTypes[boardType[b]].push(i);
            else
                boardTypes[boardType[b]] = [i];
            other = false;
        }
        if (other)
            boardTypes.other.push(i);
        prices.max = Math.max(prices.max, hotel.priceToman);
        prices.min = Math.min(prices.min, hotel.priceToman);

    }
    return {prices, locations, boardTypes, stars};
}

function serializeByIndex(hotels, serializeData, filters) {
    const serialize = angular.copy(serializeData);
    let keys = Object.keys(filters);
    let list = filters[keys[0]];
    for (let i = 1; i < keys.length; i++)
        list = unity(list, filters[keys[i]]);
    // get new stars numbers
    keys = Object.keys(serializeData.stars);
    for (let i = 0; i < keys.length; i++)
        serialize.stars[keys[i]] = unity(list, serialize.stars[keys[i]]);
    keys = Object.keys(serializeData.locations);
    for (let i = 0; i < keys.length; i++)
        serialize.locations[keys[i]] = unity(list, serialize.locations[keys[i]]);
    keys = Object.keys(serializeData.boardTypes);
    for (let i = 0; i < keys.length; i++)
        serialize.boardTypes[keys[i]] = unity(list, serialize.boardTypes[keys[i]]);
    serialize.prices = {max: 0, min: Infinity};
    for (let l in list) {
        serialize.prices.max = Math.max(serialize.prices.max, hotels[list[l]].priceToman);
        serialize.prices.min = Math.min(serialize.prices.min, hotels[list[l]].priceToman);
    }
    console.log(list,serialize);
    return [list,serialize];
}
