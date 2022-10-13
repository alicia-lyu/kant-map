export default function nameToUrl(name) {
    name = name.toLowerCase();
    nameArray = name.split(' ');
    return nameArray.join('-')
}