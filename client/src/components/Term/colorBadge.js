export default function colorBadge(categoryIndex) {
    classNameList = [
        'badge-category-0',
        'badge-category-1',
        'badge-category-2',
        'badge-category-3',
        'badge-category-4',
    ]
    return classNameList[categoryIndex]
}