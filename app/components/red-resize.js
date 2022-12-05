import { Resize } from 'ember-animated/motions/resize';
class RedResize extends Resize {
  *animate() {
    // Whatever styles are changed here will get cleaned up
    // automatically when the animation is done.
    this.sprite.applyStyles({
      color: 'red',
    });
    // Run the default Resize animation to completion
    yield* super.animate();
  }
}

export default function redResize(sprite, opts) {
  return new RedResize(sprite, opts);
}
