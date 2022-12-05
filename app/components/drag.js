import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import drag from './-utils/drag-2';
import { set } from '@ember/object';
import redResize from './red-resize';
import { later, next } from '@ember/runloop';

export default class DragDragComponent extends Component {
  constructor() {
    super(...arguments);
    this.transition = this.transition.bind(this);
  }

  motion = redResize;

  @tracked items = A([...this.args.model.toArray()]);

  @action beginDragging(item, event) {
    let dragState;
    let divElementViewPortHeight;

    function stopMouse() {
      set(item, 'dragState', null);
      item.isCollisionCheckStopped = null;
      if (isScrollable) {
      }
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
      if (isScrollable) {
        // handleMousemove(dragState.latestPointerY);
        // handleMousemove(event);
        //   // dragState.isScrollable = isScrollable;
        //   // dragState.pointerY = event.clientY - parentBoundingClientRects.top;
        //   // console.log(event.clientY - parentBoundingClientRects.top);
      }
    }

    dragState = {
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y,
    };

    const parentElement = document.querySelector('.deck-group');
    let parentBoundingClientRects = parentElement.getBoundingClientRect();

    const isScrollable =
      this.checkIfScrollBarPresent(parentElement) ||
      this.checkIfScrollBarPresent();

    console.log(isScrollable);

    if (isScrollable) {
      divElementViewPortHeight = this.elementViewPortHeight(parentElement);
      console.log(divElementViewPortHeight);
      console.log(parentElement.getBoundingClientRect());
    }

    window.addEventListener('mouseup', stopMouse);
    window.addEventListener('mousemove', updateMouse);
    set(item, 'dragState', dragState);
    item.isCollisionCheckStopped = false;
  }

  elementViewPortHeight(element) {
    const elementHeight = element.offsetHeight,
      documentElementHeight = document.documentElement.clientHeight,
      { top, bottom } = element.getBoundingClientRect();
    return Math.max(
      0,
      top > 0
        ? Math.min(elementHeight, documentElementHeight - top)
        : Math.min(bottom, documentElementHeight)
    );
  }

  checkIfScrollBarPresent(element) {
    if (element) {
      return element.scrollHeight > element.clientHeight;
    } else {
      return (
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
      );
    }
  }

  updateItemPositionInArray = (selected, other) => {
    const item = selected;
    const indexOfOther = this.items.indexOf(other);
    this.items.removeObject(item);
    this.items.insertAt(indexOfOther, item);
  };

  *transition(sprites) {
    const { keptSprites } = sprites;

    const ref = this;

    const activeSprite = keptSprites.find(
      (sprite) => sprite.owner.value.dragState
    );

    let others = keptSprites.filter((sprite) => sprite !== activeSprite);

    if (activeSprite) {
      drag(activeSprite, {
        others,
        onCollisionWaitFor: 500,
        onCollision(otherSprite) {
          let activeModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;
          ref.updateItemPositionInArray(activeModel, otherModel);
        },
      });
    }
    yield 25;
    others.forEach(move);
  }
}
