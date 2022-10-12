export function getOption(net, repulsion, gravity) {
    let option = {
        title: {
            text: 'Kant Map',
            subtext: 'Circular layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [
            {
                data: net.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Kantian Term',
                type: 'graph',
                layout: 'force',
                force: {
                    repulsion: repulsion,
                    gravity: gravity,
                },
                data: net.nodes,
                links: net.links,
                categories: net.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    lineStyle: {
                        width: 20
                    }
                }
            }
        ]
    }
    return option
}