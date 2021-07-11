import { EventDispatcher } from 'three';

import { UpdateInfo } from '../App';
import { lerp } from './utils/lerp';

interface Mouse {
  x: number;
  y: number;
}

export class MouseMove extends EventDispatcher {
  _mouseLast: Mouse = { x: 0, y: 0 };
  _isTouching = false;
  _ease = 0.09;
  mouse: Mouse = { x: 0, y: 0 };
  mouseLerp: Mouse = { x: 0, y: 0 };
  strength = 0;
  strengthLerp = 0;

  static _instance: MouseMove;
  static _canCreate = false;

  static getInstance() {
    if (!MouseMove._instance) {
      MouseMove._canCreate = true;
      MouseMove._instance = new MouseMove();
      MouseMove._canCreate = false;
    }

    return MouseMove._instance;
  }

  constructor() {
    super();

    if (MouseMove._instance || !MouseMove._canCreate) {
      throw new Error('Use MouseMove.getInstance()');
    }

    this.addEvents();

    MouseMove._instance = this;
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this._isTouching = true;
    this._mouseLast.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this._mouseLast.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    // Uncomment if should draw only when pressed
    // if (!this._isTouching) {
    //   return;
    // }

    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - this._mouseLast.x;
    const deltaY = touchY - this._mouseLast.y;

    this.strength = deltaX * deltaX + deltaY * deltaY;

    this._mouseLast.x = touchX;
    this._mouseLast.y = touchY;

    this.mouse.x += deltaX;
    this.mouse.y += deltaY;
  };

  onTouchUp = () => {
    this._isTouching = false;
  };

  onMouseLeave = () => {};

  addEvents() {
    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);

    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);

    window.addEventListener('mouseleave', this.onMouseLeave);
  }

  destroy() {
    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);

    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);

    window.removeEventListener('mouseleave', this.onMouseLeave);
  }

  update(updateInfo: UpdateInfo) {
    this.dispatchEvent({ type: 'mousemoved' });
    const { _ease, mouse, _mouseLast, mouseLerp } = this;

    _mouseLast.x = mouse.x;
    _mouseLast.y = mouse.y;

    mouseLerp.x = lerp(mouseLerp.x, mouse.x, _ease * updateInfo.slowDownFactor);
    mouseLerp.y = lerp(mouseLerp.y, mouse.y, _ease * updateInfo.slowDownFactor);

    //Update strengthLerp
    this.strengthLerp = lerp(
      this.strengthLerp,
      this.strength,
      _ease * updateInfo.slowDownFactor,
    );
  }
}

// //Update mouse3Ds
// mouse3D.x = (mouse.x / this.viewportSizes.width) * 2 - 1;
// mouse3D.y = -(mouse.y / this.viewportSizes.height) * 2 + 1;

// mouse3DLerp.x = (mouseLerp.x / this.viewportSizes.width) * 2 - 1;
// mouse3DLerp.y = -(mouseLerp.y / this.viewportSizes.height) * 2 + 1;
