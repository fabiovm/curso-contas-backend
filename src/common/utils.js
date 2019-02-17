
const orderByToMongo = req => {

    if (req.query.sort !== undefined && req.query.sortOrder !== undefined) {
        const SORT = req.query.sort.split(",");
        const SORT_ORDER = req.query.sortOrder.split(",");

        if (SORT.length == SORT_ORDER.length) {
            for (let x = 0; x < SORT_ORDER.length; x++) {
                SORT_ORDER[x] = SORT_ORDER[x] == "asc" ? "1" : "-1"
            }

            let orderBy = "{"
            for (let i = 0; i < SORT.length; i++) {
                orderBy = orderBy + `"${SORT[i]}":${SORT_ORDER[i]},`
            }
            orderBy = orderBy.substring(0, orderBy.length - 1) + "}";
            return JSON.parse(orderBy);
        } else {
            return {}
        }
    }
}

module.exports = { orderByToMongo }