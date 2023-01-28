// Ellipsize text
const ellipsize = (text) => {
    if (text.length > (15+3)) {
        return text.substring(0, 15) + '...';
    }
    return text;
}