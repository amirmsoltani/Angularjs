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
            accept = accept && (arguments[ap].indexOf(arguments[0][i]) + 1);
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
    const boardType_regex = /all\sinclusive|half\sboard|full\sboard|breakfast|room\sonly/g;
    const Hotels = [];
    for (let i = 0; i < hotels.length; i++) {
        Hotels.push(i);
        const hotel = hotels[i];
        //hotel.Price = hotel.price.total;
        hotel.i = i;
        if(hotel.star === "" || hotel.star === null)
            hotel.starRate = 0;
        if (locations[hotel.location])
            locations[hotel.location].push(i);
        else
            locations[hotel.location] = [i];
        const star = parseInt(hotel.star);
        if (stars[star])
            stars[star].push(i);
        else
            stars[star] = [i];
        let boardType = hotel.board_types.join('').toLocaleLowerCase().match(boardType_regex);
        let other = 0;
        for (let b in boardType) {
            if (boardTypes[boardType[b]])
            {
                if(boardTypes[boardType[b]].indexOf(i)=== -1)
                boardTypes[boardType[b]].push(i);
            }
            else
                boardTypes[boardType[b]] = [i];
            other +=1;
        }
        if (other < hotel.board_types.length)
            boardTypes.other.push(i);
        prices.max = Math.max(prices.max, hotel.price.total);
        prices.min = Math.min(prices.min, hotel.price.total);

    }
    return [Hotels, {prices, locations, boardTypes, stars}];
}

function serializeByIndex(hotels, serializeData, filters) {
    const serialize = angular.copy(serializeData);
    let keys = Object.keys(filters);
    let list = [];
    let sort = keys.indexOf('sorting');
    if (sort+1) {
        list = filters['sorting'];
        sort = keys.splice(sort, 1);
    }
    else {
        list = filters[keys[0]];
        keys.splice(0,1);
    }
    for (let i = 0; i < keys.length; i++)
        list = unity(list, filters[keys[i]]);
    serialize.prices = {max: 0, min: Infinity};
    for (let l in list) {
        serialize.prices.max = Math.max(serialize.prices.max, hotels[list[l]].priceToman);
        serialize.prices.min = Math.min(serialize.prices.min, hotels[list[l]].priceToman);
    }

    // get new stars numbers
    for (let k in serializeData)
        if (k !== 'prices' && k !== 'sort') {
            keys = Object.keys(serializeData[k]);
            for (let i = 0; i < keys.length; i++)
                serialize[k][keys[i]] = unity(list, serialize[k][keys[i]]);
        }
    return [list, serialize];
}
