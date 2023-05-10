// utils.js
export function setTransitionName(to, from) {
    const fromName = from.name;
    const toName = to.name;
    let transitionName = "";
    if (toName === 'Home' && fromName === 'About') {
      transitionName = 'slide-down';
    } else if (toName === 'About' && fromName === 'Home') {
      transitionName = 'slide-up';
    } else if (
      ['Import', 'Display', 'Analysis'].includes(toName) &&
      ['Home', 'About'].includes(fromName)
    ) {
      transitionName = 'slide-left';
    } else if (
      ['Home', 'About'].includes(toName) &&
      ['Import', 'Display', 'Analysis'].includes(fromName)
    ) {
      transitionName = 'slide-right';
    } else if (
      ['Import'].includes(toName) &&
      ['Display', 'Analysis'].includes(fromName)
    ) {
      transitionName = 'slide-right';
    } else if (
      ['Display', 'Analysis'].includes(toName) &&
      ['Import'].includes(fromName)
    ) {
      transitionName = 'slide-left';
    } else if (
      ['Display'].includes(toName) &&
      ['Analysis'].includes(fromName)
    ) {
      transitionName = 'slide-right';
    } else if (
      ['Analysis'].includes(toName) &&
      ['Display'].includes(fromName)
    ) {
      transitionName = 'slide-left';
    }
    return transitionName;
  }
  