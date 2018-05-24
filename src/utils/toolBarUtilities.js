export default function (location) {
     let arr = [];

    const regLocation = /\\?id=/g;
    const regLocations = /\/locations$|\/categories\//g;
    const regCategory = /\/categories$/g;

    if (regLocation.test(location.search)) {
        arr = [false, false];
    }
    else if (regLocations.test(location.pathname)) {
        arr = [false, false];
    }
    else if (regCategory.test(location.pathname)) {
        arr = [false, true];
    }
    return arr;
};

