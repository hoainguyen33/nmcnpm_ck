const route = {
    path: "/home",
    title: "HOME",
    routes: [
        {
            path: "/home/champions",
            title: "CHAMPIONS",
            routes: [
                // {
                //     path: "/home/champions",
                //     title: "LIST",
                // },
                {
                    path: "/home/champions/:id",
                    title: "GET",
                    redux: "champion"
                },
            ]
        },
        {
            path: "/home/teams",
            title: "TEAMS",
            routes: [
                // {
                //     path: "/home/teams",
                //     title: "LIST",
                // },
                {
                    path: "/home/teams/:id",
                    title: "GET",
                    redux: "team"
                },
            ]
        },
        {
            path: "/home/players",
            title: "PLAYERS",
            routes: [
                // {
                //     path: "/home/players",
                //     title: "LIST",
                // },
                {
                    path: "/home/players/:id",
                    title: "GET",
                    redux: "player"
                },
            ]
        },
    ]
}

export function Search(paths) {
    var to = "", result = [], r = route
    if (!paths[0]) {
        return result
    }
    to = to + "/" + paths[0]
    if (r.path !== to) {
        return result
    }
    var slice = paths.slice(1)
    result.push({
        path : r.path,
        title : r.title,
        redux : r.redux,
    })
    r = r.routes
    if (slice[0]) {
        to = to + "/" + slice[0]
    }
    for (let path in slice) {
        r = SearchEach(r, to)
        if(!r) {
            return result
        }
        result.push({
            path : r.path,
            title : r.title,
            redux : r.redux,
        })
        to = to + "/" + path
        r = r.routes
    }
    return result
}

function SearchEach(r, to){
    for (let i in r) {
        if(r[i].path === to) {
            return r[i]
        }
    }
}

export default route