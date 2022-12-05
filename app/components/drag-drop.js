import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';
import { tracked } from 'tracked-built-ins';
import { notifyPropertyChange } from '@ember/object';
import fade from 'ember-animated/transitions/fade';
import { get, set } from '@ember/object';
import { later } from '@ember/runloop';
import drag from './-utils/drag-1';

export default class DragDropComponent extends Component {
  constructor() {
    super(...arguments);
    console.log(this.decks);
  }

  data = [
    { itemId: 1, isBeingDragged: false },
    { itemId: 2, isBeingDragged: false },
    { itemId: 3, isBeingDragged: false },
    { itemId: 4, isBeingDragged: false },
    { itemId: 5, isBeingDragged: false },
    { itemId: 6, isBeingDragged: false },
    { itemId: 7, isBeingDragged: false },
    { itemId: 8, isBeingDragged: false },
    { itemId: 9, isBeingDragged: false },
    { itemId: 10, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
  ];

  decks = tracked([...this.data]);

  dummyFlag = false;

  selectedItem;
  selectedElement;
  allElements;
  intervalId;
  minimumAreaRequiredToCollide = 20;

  isDragingAction = false;

  @action mouseEvent(event) {
    console.log(event);
    debugger;
    console.log('Mouse event', event.clientX, event.clientY);
  }

  @action beginDragging(item, event) {
    if (this.isDragingAction) return;
    item.isAnimating = false;
    this.isDragingAction = true;
    console.log('Begin Dragging', item, event);
    this.allElements = document.querySelectorAll('.deck');
    // .filter((x) => x.offsetWidth !== 0 || x.offsetHeight !== 0);
    this.addEventListeners();
    this.selectedItem = item;
    this.selectedElement = event.target;
    this.onMouseDown(event);
    let dragState = {
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y,
    };

    set(item, 'dragState', dragState);
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
    event.preventDefault();
    console.log('On Mouse Down');
    this.updateItemBeingDragged(this.selectedItem, true);
    this.selectedItem.isAnimating = false;
    // this.intervalId = window.requestAnimationFrame(() => {
    //   this.checkForCollision(this.selectedElement, this.allElements);
    // });
    // debugger
  };

  onMouseMove = (event) => {
    event.preventDefault();

    this.selectedItem.dragState.latestPointerX = event.x;
    this.selectedItem.dragState.latestPointerY = event.y;
    this.dummyFunction();
  };

  dummyFunction = () => {
    if (!this.dummyFlag) {
      this.dummyFlag = this.checkForCollision(
        this.selectedElement,
        this.allElements
      );
      if (this.dummyFlag) {
        later(
          this,
          () => {
            this.dummyFlag = false;
          },
          500
        );
      }
    }
  };

  onMouseUp = (event) => {
    event.preventDefault();

    console.log('On Mouse Up');
    set(this.selectedItem, 'dragState', null);
    this.selectedItem.isAnimating = false;
    this.removeEventListener();
    this.updateItemBeingDragged(this.selectedItem, false);
    this.isDragingAction = false;
  };

  updateItemBeingDragged = (item, status) => {
    set(item, 'isBeingDragged', status);
  };

  relativeCoords(event) {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  didCollide = (a, b) => {
    let item1 = a.getBoundingClientRect();
    let item1Top = item1.top;
    let item1Left = item1.left;
    let item1Right = item1.right;
    let item1Bottom = item1.bottom;

    let item2 = b.getBoundingClientRect();
    let item2Top = item2.top;
    let item2Left = item2.left;
    let item2Right = item2.right;
    let item2Bottom = item2.bottom;

    let verticalMatch =
      (item2Top > item1Top && item2Top < item1Bottom) ||
      (item2Bottom > item1Top && item2Bottom < item1Bottom);

    let horizontalMatch =
      (item2Right > item1Left && item2Right < item1Right) ||
      (item2Left < item1Right && item2Left > item1Left);
    return horizontalMatch && verticalMatch;
  };

  getAreaOfCollision = (a, b) => {
    let item1 = a.getBoundingClientRect();
    let item1Top = item1.top;
    let item1Left = item1.left;
    let item1Width = item1.width;
    let item1Height = item1.height;

    let item2 = b.getBoundingClientRect();
    let item2Top = item2.top;
    let item2Left = item2.left;
    let item2Width = item2.width;
    let item2Height = item2.height;
    const length =
      item1Left < item2Left
        ? item1Left + item1Width - item2Left
        : item2Left + item2Width - item1Left;
    const width =
      item1Top < item2Top
        ? item1Top + item1Height - item2Top
        : item2Top + item2Height - item1Top;
    return Math.abs(length) * Math.abs(width);
  };

  getAreaPrecentage = (total, present) => {
    return Math.floor((present / total) * 100);
  };

  checkForCollision = (targetElement, allTargetElements) => {
    console.log('check for clooussin');
    let maxAreaItem = -1;
    let maxAreaSelectedItem = -1;
    let maxArea = -1;
    let currentItemId = null;
    let otherItemId = null;
    // console.log(allTargetElements);
    allTargetElements.forEach((otherItem, i) => {
      if (targetElement !== otherItem) {
        if (this.didCollide(targetElement, otherItem)) {
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
      } else {
        // console.log(i, maxAreaItem);
        // currentItemId = i;
        maxAreaSelectedItem = i;
      }
    });
    // console.log('PPPPPP', maxAreaSelectedItem, maxAreaItem);
    if (maxAreaItem > -1) {
      if (
        this.getAreaPrecentage(252 * 256, maxArea) >
        this.minimumAreaRequiredToCollide
      ) {
        allTargetElements[maxAreaItem].style.background = 'green';
        this.updateItemPositionInArray(
          maxAreaItem,
          maxAreaSelectedItem,
          currentItemId,
          otherItemId
        );
        return true;
      }
    }
    // this.intervalId = window.requestAnimationFrame(() =>
    //   this.checkForCollision(targetElement, allTargetElements)
    // );
  };

  updateItemPositionInArray = (a, b, selectedItem, otherItem) => {
    console.count('called');
    let item = this.decks.find((item) => item.itemId == Number(selectedItem));
    let item1 = this.decks[b];
    console.log('item1===item', item1 === item);
    // debugger
    // console.log(a, selectedItem);
    console.log(a, b);
    this.decks.removeObject(item);
    this.decks.insertAt(a, item);

    this.allElements = document.querySelectorAll('.deck');

    // console.log(this.selectedItem);
    // this.selectedItem = this.decks.find((item) => item.isAnimating);
    // console.log(this.selectedItem);
  };

  // Animation
  *transition(sprites) {
    console.log('ANIMATAION begins');
    console.log('ANIMATAION begins');
    console.log('ANIMATAION begins');
    let { keptSprites, receivedSprites, sentSprites } = sprites;
    console.log('Animating');
    console.log(sprites);
    let activeSprite = keptSprites.find(
      (sprite) => sprite.owner.value.isBeingDragged
    );

    let otherSprites = keptSprites.filter((sprite) => sprite !== activeSprite);

    // activeSprite.applyStyles({
    //   left: `0px`,
    //   top: `0px`,
    //   background: 'black',
    //   'z-index': '1222',
    // });

    // activeSprite.applyStyles({
    //   'border-style': 'dashed',
    //   'border-width': '5px',
    // });

    if (activeSprite) {
      console.log('ACTIVE');
      drag(activeSprite, {
        otherSprites,
        onCollision(otherSprite) {
          let myModel = activeSprite.owner.value.id;
          let otherModel = otherSprite.owner.value.id;
          console.log('clooision', myModel, otherModel);
        },
      });
    }

    for (let sprite of otherSprites) {
      move(sprite);
    }
    yield wait(200);

    console.log('ANIMATIONS ENDS');
    console.log('ANIMATIONS ENDS');
    console.log('ANIMATIONS ENDS');
  }
}
