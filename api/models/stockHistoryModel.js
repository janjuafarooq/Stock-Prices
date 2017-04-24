const yahooFinance = require('yahoo-finance');

module.exports = (symbol) => {
    // Create new dates for the current date and 30 days ago in YYYY-MM-DD format
    const current = (new Date()).toISOString().split('T')[0];
    const previous = (new Date(new Date().setDate(new Date().getDate() - 30))).toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            yahooFinance.historical({
                symbol: symbol,
                from: previous,
                to: current,
            }, function (err, quotes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(quotes);
                }
            });
        }
    )
};