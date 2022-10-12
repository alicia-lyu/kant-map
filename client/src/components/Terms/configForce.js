export const configForce = (windowWidth) => {
    let repulsion, gravity
    if (windowWidth < 576) {
      repulsion = 40;
      gravity = 0.2
    } else if (windowWidth < 768) {
      repulsion = 60;
      gravity = 0.2
    } else if (windowWidth < 1200) {
      repulsion = 100;
      gravity = 0.1;
    } else {
      repulsion = 200;
      gravity = 0.1
    }
    return {repulsion, gravity}
}