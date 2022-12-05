import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';
import { tracked } from 'tracked-built-ins';
import { notifyPropertyChange } from '@ember/object';
import fade from 'ember-animated/transitions/fade';

export default class MainComponent extends Component {
  constructor() {
    super(...arguments);
    console.log(this.decks);

    // setTimeout(() => {
    //   let item = this.decks.find((item) => item.itemId == 4);
    //   this.decks.removeObject(item);
    //   this.decks.insertAt(4, item);
    // }, 1000);
  }

  decks = tracked([...this.args.model]);

  get sortedDecks() {
    return this.decks;
  }

  itemPostiton = {
    ix: null,
    iy: null,
    fx: null,
    fy: null,
    sx: null,
    sy: null,
  };

  selectedItem;
  selectedElement;
  allElements;
  intervalId;
  minimumAreaRequiredToCollide = 30;

  isDragingAction = false;

  @action mouseEvent(event) {
    console.log(event);
    console.log('Mouse event', event.clientX, event.clientY);
  }

  @action beginDragging(item, event) {
    if (this.isDragingAction) return;
    this.isDragingAction = true;
    console.log('Begin Dragging', item, event);
    this.allElements = document.querySelectorAll('.deck');
    this.addEventListeners();
    this.selectedItem = item;
    this.selectedElement = event.target;
    this.onMouseDown(event);
  }

  addEventListeners = () => {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    console.log('EventListiners Added');
  };

  removeEventListener = () => {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    console.log('EventListiners removed');
  };

  onMouseDown = (event) => {
    console.log('On Mouse Down');
    this.updateItemBeingDragged(this.selectedItem, true);
    this.initializeElementStyle(this.selectedElement);

    this.moveElementAt(event.x, event.y);
    this.intervalId = window.requestAnimationFrame(() =>
      this.checkForCollision(this.selectedElement, this.allElements)
    );
    // debugger
  };

  onMouseMove = (event) => {
    this.moveElementAt(event.x, event.y);
  };

  onMouseUp = (event) => {
    console.log('On Mouse Up');
    this.removeEventListener();
    this.updateItemBeingDragged(this.selectedItem, false);
    this.resetElementPostiton();
    this.resetElementStyle(this.selectedElement);
    this.isDragingAction = false;
    window.cancelAnimationFrame(this.intervalId);
  };

  updateItemBeingDragged = (item, status) => {
    console.log('updateItemBeingDragged', status);
    item.isBeingDragged = status;
  };

  initializeElementStyle = (element) => {
    // element.style.position = 'absolute';
    element.style.zIndex = 1000;
  };

  resetElementStyle = (element) => {
    element.style.position = '';
    element.style.zIndex = '';
  };

  moveElementAt = (pageX, pageY) => {
    this.selectedElement.style.left =
      pageX - this.selectedElement.offsetWidth / 2 + 'px';
    this.selectedElement.style.top =
      pageY - this.selectedElement.offsetHeight / 2 + 'px';
  };

  resetElementPostiton = () => {
    this.selectedElement.style.left = '';
    this.selectedElement.style.top = '';
  };

  relativeCoords(event) {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  didCollide = (a, b) => {
    a.offsetBottom = a.offsetTop + a.offsetHeight;
    a.offserRight = a.offsetLeft + a.offsetWidth;
    b.offsetBottom = b.offsetTop + b.offsetHeight;
    b.offserRight = b.offsetLeft + b.offsetWidth;
    return !(
      a.offsetBottom < b.offsetTop ||
      a.offsetTop > b.offsetBottom ||
      a.offserRight < b.offsetLeft ||
      a.offsetLeft > b.offserRight
    );
  };

  getAreaOfCollision = (a, b) => {
    // console.log(a, b);
    const length =
      a.offsetLeft < b.offsetLeft
        ? a.offsetLeft + a.offsetWidth - b.offsetLeft
        : b.offsetLeft + b.offsetWidth - a.offsetLeft;
    const width =
      a.offsetTop < b.offsetTop
        ? a.offsetTop + a.offsetHeight - b.offsetTop
        : b.offsetTop + b.offsetHeight - a.offsetTop;
    return Math.abs(length) * Math.abs(width);
  };

  getAreaPrecentage = (total, present) => {
    return Math.floor((present / total) * 100);
  };

  checkForCollision = (targetElement, allTargetElements) => {
    // console.log('check for clooussin');
    let maxAreaItem = -1;
    let maxArea = -1;
    let currentItemId = null;
    let otherItemId = null;
    allTargetElements.forEach((otherItem, i) => {
      if (targetElement !== otherItem) {
        // console.log(item.innerText, otherItem.innerText);
        if (this.didCollide(targetElement, otherItem)) {
          // console.log(targetElement, otherItem);

          let area = this.getAreaOfCollision(targetElement, otherItem);
          if (area > maxArea) {
            maxArea = area;
            maxAreaItem = i;
            otherItemId = otherItem.dataset.itemId;
            currentItemId = targetElement.dataset.itemId;
          }
          otherItem.style.background = 'red';
        } else {
          otherItem.style.background = 'grey';
        }
      }
    });
    if (maxAreaItem > -1) {
      if (
        this.getAreaPrecentage(180 * 256, maxArea) >
        this.minimumAreaRequiredToCollide
      ) {
        allTargetElements[maxAreaItem].style.background = 'green';
        this.updateItemPositionInArray(maxAreaItem, currentItemId, otherItemId);
      }
    }
    this.intervalId = window.requestAnimationFrame(() =>
      this.checkForCollision(targetElement, allTargetElements)
    );
  };

  updateItemPositionInArray = (a, selectedItem, otherItem) => {
    let item = this.decks.find((item) => item.itemId == selectedItem);
    this.decks.removeObject(item);
    this.decks.insertAt(a, item);
    // let aa = [];
    // this.decks.forEach((ele) => aa.push(ele.itemId));
    // console.log(aa.toString());
    // notifyPropertyChange(this.decks);
  };

  // Animation
  *transition(sprites) {
    let { keptSprites, receivedSprites, sentSprites } = sprites;
    console.log('Animating');
    console.log(sprites);
    let activeSprite = keptSprites.find(
      (sprite) => sprite.owner.value.isBeingDragged
    );
    // // let currentItem = {
    // //   x: activeSprite._originalInitialBounds.left,
    // //   y: activeSprite._originalInitialBounds.top
    // // }
    // activeSprite.applyStyles({
    //   left: `0px`,
    //   top: `0px`,
    //   background: 'black',
    //   'z-index': '1222',
    // });

    let otherSprites = keptSprites.filter((sprite) => sprite !== activeSprite);

    for (let sprite of keptSprites) {
      move(sprite);
    }

    yield wait(100);

    // for (let sprite of keptSprites) {
    //   move(sprite);
    // }
    // yield wait(100);
  }
}
