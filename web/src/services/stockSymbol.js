export function getStockSymbol(symbol) {
    return new Promise(
        (resolve, reject) => {
            const url = 'http://localhost:3001/symbolsearch/' + symbol;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(url, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response.json());
                    } else {
                        return Promise.reject(new Error(response.statusText));
                    }
                })
                .then(payload => {
                    resolve(payload);
                })
                .catch(error => {
                    reject(error);
                });
        }
    );
}