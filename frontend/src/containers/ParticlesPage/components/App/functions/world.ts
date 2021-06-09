import * as THREE from 'three';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { model } from './model';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
  updateModel: (updateInfo: UpdateInfo) => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    initLights: null,
    updateModel: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const { update: updateModel, container: containerModel } = model({
      appObj,
      appProps,
    });
    container.add(containerModel);
    worldManager.updateModel = updateModel;
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateModel(updateInfo);
  };

  const destroy = () => {};

  return {
    init,
    container,
    destroy,
    update,
  };
};