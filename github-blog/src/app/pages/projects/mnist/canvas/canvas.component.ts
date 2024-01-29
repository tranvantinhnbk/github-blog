// The source code from: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';
import { NgxOpenCVModule } from 'ngx-opencv';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef | undefined;

  @Input() public width = 400;
  @Input() public height = 400;

  private cx?: CanvasRenderingContext2D | null;
  capturedImageDataUrl: string | null = null;

  dataUrl: string = '';

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas?.nativeElement;
    
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    if (!this.cx) throw 'Cannot get context';

    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'red';

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res) => {
        const rect = canvasEl.getBoundingClientRect();
        const prevMouseEvent = res[0] as MouseEvent;
        const currMouseEvent = res[1] as MouseEvent;

        // previous and current position with the offset
        const prevPos = {
          x: prevMouseEvent.clientX - rect.left,
          y: prevMouseEvent.clientY - rect.top
        };

        const currentPos = {
          x: currMouseEvent.clientX - rect.left,
          y: currMouseEvent.clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  public clearCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas?.nativeElement;
    this.cx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

  }

  findCorners(image: number[][]): number[] {
    let topLeftX = 0;
    let topLeftY = 0;
    let bottomRightX = 0;
    let bottomRightY = 0;
    const rows = image.length;
    const columns = image[0].length;
  
    // Find top-left Y
    for (let y = 0; y < rows; y++) {
      let check = true;
      for (let x = 0; x < columns; x++) {
        if (image[y][x] > 0) {
          check = false;
          break;
        }
      }
      if (!check) {
        topLeftY = y;
        break;
      }
    }
  
    // Find top-left X
    for (let x = 0; x < columns; x++) {
      let check = true;
      for (let y = 0; y < rows; y++) {
        if (image[y][x] > 0) {
          check = false;
          break;
        }
      }
      if (!check) {
        topLeftX = x;
        break;
      }
    }
  
    // Find bottom-right X
    for (let x = columns - 1; x >= 0; x--) {
      let check = true;
      for (let y = 0; y < rows; y++) {
        if (image[y][x] > 0) {
          check = false;
          break;
        }
      }
      if (!check) {
        bottomRightX = x;
        break;
      }
    }
  
    // Find bottom-right Y
    for (let y = rows - 1; y >= 0; y--) {
      let check = true;
      for (let x = 0; x < columns; x++) {
        if (image[y][x] > 0) {
          check = false;
          break;
        }
      }
      if (!check) {
        bottomRightY = y;
        break;
      }
    }
  
    return [topLeftX, topLeftY, bottomRightX, bottomRightY];
  }


  preProcessImage() {
    if (this.cx && this.canvas) {
      let imageData: ImageData = this.cx.getImageData(0, 0, this.width, this.height);
      const rgbArray: Uint8ClampedArray = imageData.data;
      // Extract the black channel (assuming it's the first channel in the RGB format)
      const blackChannelArray: Uint8ClampedArray = new Uint8ClampedArray(this.width * this.height);

      for (let i = 0, j = 0; i < rgbArray.length; i += 4, j++) {
        const blackValue = rgbArray[i]; // Extract the black channel value
        blackChannelArray[j] = blackValue;
      }

      // Convert 1D array to 2D array
      const rows = this.height;
      const columns = this.width;
      const blackChannel2DArray: number[][] = [];

      for (let y = 0; y < rows; y++) {
        const row: number[] = [];
        for (let x = 0; x < columns; x++) {
          const index = y * columns + x;
          row.push(blackChannelArray[index]);
        }
        blackChannel2DArray.push(row);
      }
      const [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.findCorners(blackChannel2DArray)
      const canvasElement = this.canvas?.nativeElement as HTMLCanvasElement;
      const croppedWidth = bottomRightX - topLeftX;
      const croppedHeight = bottomRightY - topLeftY;
      const squareWidthHeight = Math.max(croppedWidth, croppedHeight);

      const cropImage = this.cx?.getImageData(topLeftX, topLeftY, squareWidthHeight, squareWidthHeight);

      let cropImageData = cropImage.data;
      const float32Array = new Float32Array(cropImageData);
      const tensor = tf.tensor(float32Array, [1, squareWidthHeight, squareWidthHeight, 4], 'float32');
      let grayScale = tf.slice(tensor, [0, 0, 0, 3], [1, squareWidthHeight, squareWidthHeight, 1]);
      let resizedAlphaChannel = tf.image.resizeNearestNeighbor(grayScale as tf.Tensor3D, [28, 28]);

      let rgbaData = new Uint8ClampedArray(28 * 28 * 4);
      const resizedAlphaChannelData = resizedAlphaChannel.dataSync(); // Retrieve the data from the tensor
      for (let i = 0; i < resizedAlphaChannelData.length; i++) {
        rgbaData[i * 4 + 0] = resizedAlphaChannelData[i]; // R
        rgbaData[i * 4 + 1] = resizedAlphaChannelData[i]; // G
        rgbaData[i * 4 + 2] = resizedAlphaChannelData[i]; // B
        rgbaData[i * 4 + 3] = 255; // A
      }

      let canvas = document.createElement('canvas');
      canvas.width = 28;
      canvas.height = 28;

      let ctx = canvas.getContext('2d');
      if (ctx) {
        let imgData = new ImageData(rgbaData, 28, 28);
        ctx.putImageData(imgData, 0, 0);

        let dataUrl = canvas.toDataURL();
        this.dataUrl = dataUrl;
      }
    }
  }
}

