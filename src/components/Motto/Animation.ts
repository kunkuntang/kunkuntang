export function fadeInTransition(
  node: HTMLElement,
  { duration = 200, scrollTop = 0 }
) {
  let opacity = 1;
  console.log('fadeInTransition scrollTop',scrollTop)

  if (scrollTop > 200) {
    opacity = 0;
  } else {
    opacity = scrollTop * 0.5;
  }

  return {
    duration,
    tick: (t) => {
      node.style.opacity = opacity;
    },
  };
}
