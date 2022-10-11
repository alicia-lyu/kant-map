import net from '../../assets/net.json'
import * as Echarts from 'echarts'
import React, {useEffect, useRef} from 'react'
import './custom.scss'
import useWindowDimensions from '../../utils/useWindowDimensions'

const processNode = (windowWidth) => {
  let subtractee
  let scaler
    if (windowWidth < 768) {
      subtractee = 3
      scaler = 2
    } else if (windowWidth < 1200) {
      subtractee = 3
      scaler = 6
    } else {
      subtractee = 4
      scaler = 10
    }
    net.nodes.forEach(function (node) {
      node.label = {
        show: true
      };
      node.value = node.symbolSize;
      node.symbolSize = (node.symbolSize - subtractee) * scaler;
    });
    net.links.forEach((link) => {
      link.lineStyle = {width: (link.weight-0.7)*200,}
    });
}

export function Net() {
  const chartRef = useRef(null)
  const { windowWidth } = useWindowDimensions();
  this.handleChartItemClicked = this.props.handleChartItemClicked;

  useEffect(() => {
    processNode(windowWidth);

    const chartDom = chartRef.current;
    const chart = Echarts.init(chartDom);
    const option = {
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
          layout: 'circular',
          circular: {
            rotateLabel: true
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
    chart.setOption(option);
    // chart.setStyle(style)
    chart.on('click', (e) => this.handleChartItemClicked(e));
  })

  return (
    <div className="netWrapper">
      <div ref={chartRef} className="chart"/>
    </div>
  )
}

