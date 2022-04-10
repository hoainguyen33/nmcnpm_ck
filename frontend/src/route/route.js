const route = {
    path: "",
    title: "HOME",
    routes: [
        // {
        //     path: "/champions",
        //     title: "CHAMPIONS",
        //     routes: [
        //         // {
        //         //     path: "/home/champions",
        //         //     title: "LIST",
        //         // },
        //         {
        //             path: "/home/champions/:id",
        //             title: "GET",
        //             redux: "champion"
        //         },
        //     ]
        // },
        {
            path: "/team",
            title: "TEAMS",
            routes: [
                // {
                //     path: "/home/teams",
                //     title: "LIST",
                // },
                {
                    path: "/team/:id",
                    title: "GET",
                    redux: "team"
                },
            ]
        },
        {
            path: "/player",
            title: "PLAYERS",
            routes: [
                // {
                //     path: "/home/players",
                //     title: "LIST",
                // },
                {
                    path: "/player/:id",
                    title: "GET",
                    redux: "player"
                },
            ]
        },
    ]
}

export function Search(paths) {
    if (paths.length === 0) {
        return []
    }
    var to = paths[0], result = [], r = route
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
    if (slice.length > 0) {
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