// shapeUtils.js
import { editor } from 'express-document-sdk';

export const drawSquare = (size, x, y) => {
    const square = editor.createRectangle();
    square.width = size;
    square.height = size;
    square.translation = { x: x, y: y };
    editor.context.insertionParent.children.append(square);
};
