import net_data from '../../assets/net.json'
import * as Echarts from 'echarts'
import React, { useEffect, useRef } from 'react'
import './custom.scss'
import useWindowDimensions from '../../utils/useWindowDimensions'
import { processNode } from './processNode'
import { configForce } from './configForce'
import { getOption } from './getOption'
import NetWrapper from './NetWrapper'

export function Net() {
  const chartRef = useRef(null)
  const { width } = useWindowDimensions();
  // this.handleChartItemClicked = this.props.handleChartItemClicked;

  useEffect(() => {
    const chartDom = chartRef.current;
    const chart = Echarts.init(chartDom);
    
    

    let net = processNode(width, net_data);
    let { repulsion, gravity } = configForce(width);
    let option = getOption(net, repulsion, gravity)

    chart.setOption(option);
    // chart.setStyle(style)
    // chart.on('click', (e) => this.handleChartItemClicked(e));

    const resizeChart = async () => {
      console.log(width)
      let net = processNode(width, net_data);
      let { repulsion, gravity } = configForce(width);
      let option = getOption(net, repulsion, gravity)
      chart.setOption(option)
      chart.resize();
    }
    window.addEventListener("resize", () => resizeChart);

    return function cleanup() {
      chart.dispose();
    }
  })

  return (
    <NetWrapper>
      <div ref={chartRef} className="chart" />
    </NetWrapper>
  )
}

