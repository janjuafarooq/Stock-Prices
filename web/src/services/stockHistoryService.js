export const getStockHistory = (symbol) => {
    const url = `/stockHistory/${symbol}`;
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