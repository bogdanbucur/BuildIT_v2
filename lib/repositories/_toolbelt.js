module.exports = {
    performQueries,
    extractOrderBy,
    applyPagination,
    extractQueryFilters,
};
/* eslint-enable no-use-before-define */

async function performQueries({ query, countQuery }, selectFields) {
    return Promise.all([query.select(selectFields), countQuery])
        .then(([queryResult, countQueryResult]) => ({ queryResult, countQueryResult: countQueryResult.count }));
}

/**
 * Extracts order-by clause from a dataTable query
 * @param dataTable the DataTable query
 * @param query the Knex query object
 * @returns {*} the Knex query object, with added order-by clause
 */
function extractOrderBy(dataTable, query) {
    if (!dataTable || !dataTable.sort || !dataTable.sort.field || dataTable.sort.field === '') {
        if (!dataTable || !dataTable.pagination || !dataTable.pagination.field || dataTable.pagination.sort === '') {
            return query;
        }

        return query.orderBy(dataTable.pagination.field, dataTable.pagination.sort || 'asc');
    }

    return query.orderBy(dataTable.sort.field, dataTable.sort.sort || 'asc');
}

function applyPagination(dataTable, query) {
    const countQuery = query.clone().modify((qb) => qb.count().first());

    if (!dataTable || !dataTable.pagination) {
        return { query, countQuery };
    }

    const q = query.limit(dataTable.pagination.perpage).offset((dataTable.pagination.page - 1) * dataTable.pagination.perpage);

    return { query: extractOrderBy(dataTable, q), countQuery };
}

function extractQueryFilters(dataTable, query, freeTextSearchColumns = []) {
    if (!dataTable || !dataTable.query) {
        return query;
    }

    if (dataTable.query.generalSearchInput && freeTextSearchColumns) {
        // eslint-disable-next-line no-param-reassign
        query = query.where(function freeTextSearchQuery() {
            return freeTextSearchColumns.reduce((q, colName) => q.orWhere(colName, 'ILIKE', `%${dataTable.query.generalSearchInput}%`), this);
        });
    }

    return Object.keys(dataTable.query).reduce((q, key) => (key === 'generalSearchInput' ? q : q.where(key, dataTable.query[key])), query);
}