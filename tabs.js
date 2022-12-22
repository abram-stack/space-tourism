// to make the keyboard tab for accessive assitance

// TAB
// we can select the class or
// we reinforce, make sure thing accessible, person use the role
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;
  // console.log(e.keyCode);

  // change the tabindex of the current tab to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1);
    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    // if the left key is pushed, move to the next tab on the left
    else if(e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    // set the current tab to be 0, next tab can be focus on, but not focus immediately
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls'); //aria-controls goes to id
  const targetImage = targetTab.getAttribute('data-image');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // GOAL: not to make each article on top of each other.
  // make this disappear first. we find article element, set hidden to true,
  // find the selected tab(find the id),  to make it appears
  hideContent(mainContainer, '[role = "tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  // in our html, we created extra id to picture, and extra attribute to our tab
  hideContent(mainContainer, 'picture');
  showContent(mainContainer, [`#${targetImage}`]);

  // highlight of selected tab
  // if we change tabs, we remove the highlight and selected
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);
  targetTab.setAttribute('aria-selected', true);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
