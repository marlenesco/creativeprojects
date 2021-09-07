import TWEEN, { Tween } from '@tweenjs/tween.js';

import { CardItemProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: CardItemProps;
  domEl: HTMLElement;
}

interface AnimateProps {
  duration?: number;
  delay?: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class CardItem3DAnimated extends CardItem3D {
  _opacityTween: Tween<{ progress: number }> | null = null;

  constructor({ domEl, cardItem, geometry }: Constructor) {
    super({ domEl, geometry, cardItem });
  }

  animateOpacity(props: AnimateProps) {
    const {
      destination,
      duration = 400,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  animateIn(props: AnimateProps) {
    this.animateOpacity({
      delay: props.delay,
      destination: props.destination,
    });
  }
}