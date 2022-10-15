import net_data from '../../assets/net.json'
import * as Echarts from 'echarts'
import React, { useEffect, useRef } from 'react'

import './custom.scss'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { processNode } from './processNode'
import { configForce } from './configForce'
import { getOption } from './getOption'
import NetWrapper from './NetWrapper'
import { withRouter } from '../../hooks/withRouter'
import nameToUrl from '../../utils/nameToUrl'

// might be better to change to a class component

function Net(props) {
  const chartRef = useRef(null)
  const { width } = useWindowDimensions();

  useEffect(() => {
    const chartDom = chartRef.current;
    const chart = Echarts.init(chartDom);

    let net = processNode(width, net_data);
    let { repulsion, gravity } = configForce(width);
    let option = getOption(net, repulsion, gravity)

    chart.setOption(option);
    chart.on('click', {dataType: 'node'}, (params) => {
      const urlEnding = nameToUrl(params.data.name);
      props.router.navigate(`/term/${urlEnding}`);
      window.location.reload();
    });

    const resizeChart = () => {
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

export default withRouter(Net); // wrap it up with router, make `props.router.navigate` valid
