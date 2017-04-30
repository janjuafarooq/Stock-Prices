export const getCompanyData = (symbol, page, pageSize) => {
    const url = `/companyData/${symbol}?page=${page}&pageSize=${pageSize}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, options)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response.json());
            } else {
                return Promise.reject(response);
            }
        });
}