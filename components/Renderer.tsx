import {useRef, useEffect, useState} from "react";
import Three from "./test";
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { OrbitControls } from 'OrbitControls';
 
// Размеры сцены и квадрата
const sceneSizes = {width: 800, height: 500};
 
const Renderer = () => {
  const threeRef: any = useRef(); // Используется для обращения к контейнеру для canvas
  const three: any = useRef(); // Служит для определения, создан ли объект, чтобы не создавать повторный
 
  // Создание объекта класса Three, предназначенного для работы с three.js
  useEffect(() => {
    // Если объект класса "Three" ещё не создан, то попадаем внутрь
    if (!three.current) {
      // Создание объекта класса "Three", который будет использован для работы с three.js
      // three.current = new Three({
      //   sceneSizes,
      //   canvasContainer: threeRef.current,
      // });
      // console.log(Three)
      // console.log(OrbitControls)
      three.current = new Three({
        sceneSizes,
        canvasContainer: threeRef.current,
      });
    }
  }, []);
  
  // return <Three />
  // Данный узел будет контейнером для canvas (который создаст three.js)
  return <div className="renderer" ref={threeRef} />;
};
 
export default Renderer;