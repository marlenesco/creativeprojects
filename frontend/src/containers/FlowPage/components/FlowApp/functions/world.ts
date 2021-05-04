import * as THREE from 'three';

import { lights } from './lights';
import { box } from './box';
import { imagePlane } from './imagePlane';
import { AppProps } from './application';

interface World {
  appProps: AppProps;
}

export const world = ({ appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const { container: lightsContainer } = lights();
  const { container: boxContainer } = box();
  const {
    destroy: destroyImagePlane,
    generatePlanes,
    container: imagePlaneContainer,
  } = imagePlane();

  container.add(new THREE.AxesHelper());
  container.add(lightsContainer);
  // container.add(boxContainer);
  container.add(imagePlaneContainer);
  generatePlanes(appProps.flowItemsArray);

  const destroy = () => {
    destroyImagePlane();
  };

  return {
    container,
    destroy,
  };
};
