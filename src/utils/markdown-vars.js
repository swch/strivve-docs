//See: https://github.com/gatsbyjs/gatsby/issues/10174
// Changed from % due to desire to use variables in inline URL's and could not find a way to escape them through markdown converting to %25 encoding
export default function markvars(content, data) {
    return content.replace(/\$(.+)\$/g, (match, key) => {
        const value = data[key]
        if (typeof value !== 'undefined') {
            return value
        }
        return match // guards against some unintentional prefix
    });
}
