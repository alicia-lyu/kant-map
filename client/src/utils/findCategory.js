import net_data from '../assets/net.json'

const { categories } = net_data;

export default function findCategory(index) {
    const categoryName = categories.find(element => element.id === index)
    return categoryName
}