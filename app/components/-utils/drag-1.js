import { Motion, rAF } from 'ember-animated';
import move from 'ember-animated/motions/move';

export default function drag(sprite, opts) {
  return new Drag(sprite, opts).run().then(() => {
    console.log('askdj');
    console.log('askdj');
    console.log('askdj');
    console.log('askdj');
  });
}

class Drag extends Motion {
  constructor(sprite, opts) {
    super(sprite, opts);
    this.prior = null;

    // This is our own sprite's absolute screen position that
    // corresponds to the real start of dragging (which may span many
    // Drag instances, because of interruption)
    this.dragStartX = null;
    this.dragStartY = null;

    // When moving by keyboard, this is the net number of steps in
    // each direction we have already taken from the start of the
    // whole activity.
    this.xStep = null;
    this.yStep = null;
  }

  interrupted(motions) {
    this.prior = motions.find((m) => m instanceof this.constructor);
  }

  *animate() {
    let sprite = this.sprite;
    sprite.owner.value.isAnimating = true;
    let initialTx, initialTy;
    if (this.prior) {
      this.dragStartX = this.prior.dragStartX;
      this.dragStartY = this.prior.dragStartY;
      // this.xStep = this.prior.xStep;
      // this.yStep = this.prior.yStep;
      initialTx =
        sprite.transform.tx -
        sprite.absoluteInitialBounds.left +
        this.dragStartX;
      initialTy =
        sprite.transform.ty -
        sprite.absoluteInitialBounds.top +
        this.dragStartY;
    } else {
      this.dragStartX = sprite.absoluteInitialBounds.left;
      this.dragStartY = sprite.absoluteInitialBounds.top;
      // this.xStep = 0;
      // this.yStep = 0;
      initialTx = sprite.transform.tx;
      initialTy = sprite.transform.ty;
    }

    // targets are all in absolute screen coordinates
    // console.log(this.opts);
    // let targets = this.opts.otherSprites.map((s) =>
    //   makeTarget(s.absoluteFinalBounds, s)
    // );

    // let dragState = sprite.owner.value.dragState;
    // let outline;
    // if (dragState && dragState.usingKeyboard) {
    //   outline = 'dashed red';
    // } else {
    //   outline = 'none';
    // }

    sprite.applyStyles({
      'z-index': '1',
      // outline,
    });

    // when we first start a new "keyboard" drag, adjust the active
    // sprite to catch up with any prior movement.
    // if (dragState) {
    //   yield move(sprite);
    // }

    while (sprite.owner.value.dragState) {
      let dragState = sprite.owner.value.dragState;
      // these track relative motion since the drag started
      let dx = dragState.latestPointerX - dragState.initialPointerX;
      let dy = dragState.latestPointerY - dragState.initialPointerY;

      // adjust our transform to match the latest relative mouse motion
      sprite.translate(
        dx + initialTx - sprite.transform.tx,
        dy + initialTy - sprite.transform.ty
      );

      // now this is our own absolute center position
      // let x = dx + this.dragStartX + sprite.absoluteFinalBounds.width / 2;
      // let y = dy + this.dragStartY + sprite.absoluteFinalBounds.height / 2;

      // let ownDistance =
      //   (x - ownTarget.x) * (x - ownTarget.x) +
      //   (y - ownTarget.y) * (y - ownTarget.y);
      // let closerTarget = targets.find((target) => {
      //   let partialX = target.x - x;
      //   let partialY = target.y - y;
      //   let distance = partialX * partialX + partialY * partialY;
      //   return distance < ownDistance;
      // });

      // if (closerTarget) {
      //   this.opts.onCollision(closerTarget.payload);
      // }
      yield rAF();
    }
    sprite.owner.value.isAnimating = false;
  }
}

function makeTarget(bounds, payload) {
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
    payload,
  };
}
