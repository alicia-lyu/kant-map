import net_data from '../assets/net.json'

const { categories } = net_data;

export default function findCategory(index) {
    const category = categories.find(element => element.id === index)
    return category.name
}