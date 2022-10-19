export default function nameToUrl(name) {
    const nameLower = name.toLowerCase();
    const nameArray = nameLower.split(' ');
    return nameArray.join('-')
}