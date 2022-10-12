const showBool = (windowWidth, weight) => {
    if (windowWidth < 768) {
      return weight > 6
    } else if (windowWidth < 1200) {
      return weight > 5
    } else {
      return true
    }
  }

export const processNode = (windowWidth, net) => {
    let scaler
    if (windowWidth < 768) {
        scaler = 2
    } else if (windowWidth < 1200) {
        scaler = 6
    } else {
        scaler = 10
    }
    net.nodes.forEach(function (node) {
        node.label = {
        show: showBool(windowWidth, node.weight)
        };
        node.value = node.weight;
        node.symbolSize = (node.weight - 4) * scaler;
    });
    net.links.forEach((link) => {
        link.lineStyle = {width: (link.weight-0.7)*100,}
    });
    return net
}