import { v4 as uuidv4 } from "uuid";
import { Node } from "../types";
import { BOARD } from "../constants";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createNode = (row: number, col: number): Node => {
  return {
    id: uuidv4(),
    row,
    col,
    distance: Infinity,
    isWall: false,
    isVisited: false,
    previousNode: null,
    isStart:
      row === BOARD.DEFAULT_START_NODE_ROW &&
      col === BOARD.DEFAULT_START_NODE_COL,
    isFinish:
      row === BOARD.DEFAULT_FINISH_NODE_ROW &&
      col === BOARD.DEFAULT_FINISH_NODE_COL,
  };
};

export const convertImgTo2DArray = (imgSrc: string) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const imageArray: any[] = [];

  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const image = new Image();

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const pixelData = imageData.data;
        const width = image.width;
        const height = image.height;

        for (let y = 0; y < height; y++) {
          const row = [];
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4; // 4 channels (RGBA)
            const red = pixelData[offset];
            const green = pixelData[offset + 1];
            const blue = pixelData[offset + 2];
            const alpha = pixelData[offset + 3];
            row.push({ red, green, blue, alpha });
          }
          imageArray.push(row);
        }

        ctx.putImageData(imageData, 0, 0);

        return imageArray;
      };

      image.src = imgSrc;
    }
  }
  return imageArray;
};

export const generateRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
