export const generateRandomString = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return (
        // Create array of 10 null values then populate it with a random character from letters then join it
        Array.apply(null, Array(10))
            .map(() => {
                return letters.charAt(Math.floor(Math.random() * letters.length));
            })
            .join('')
    );
};

export const generateNumberBetween1AndN = (n) => {
    return Math.floor(Math.random() * n) + 1;
};