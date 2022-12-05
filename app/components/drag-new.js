import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import drag from './-utils/drag-new';
import { set } from '@ember/object';
import redResize from './red-resize';

export default class DragDragComponent extends Component {
  constructor() {
    super(...arguments);
    this.transition = this.transition.bind(this);
  }

  motion = redResize;

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
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },
    { itemId: 11, isBeingDragged: false },
    { itemId: 12, isBeingDragged: false },
    { itemId: 13, isBeingDragged: false },
    { itemId: 14, isBeingDragged: false },
    { itemId: 15, isBeingDragged: false },
    { itemId: 16, isBeingDragged: false },
    { itemId: 17, isBeingDragged: false },
    { itemId: 18, isBeingDragged: false },
    { itemId: 19, isBeingDragged: false },
    { itemId: 20, isBeingDragged: false },

  ];

  // decks = tracked([...this.data]);

  @tracked items = A([...this.data]);

  @action beginDragging(item, event) {
    let dragState;
    function stopMouse() {
      set(item, 'dragState', null);
      item.isCollisionCheckStopped = null;
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }

    dragState = {
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y,
    };

    window.addEventListener('mouseup', stopMouse);
    window.addEventListener('mousemove', updateMouse);
    set(item, 'dragState', dragState);
    item.isCollisionCheckStopped = false;
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
