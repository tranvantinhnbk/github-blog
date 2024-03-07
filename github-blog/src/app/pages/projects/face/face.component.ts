import { CommonModule } from '@angular/common';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {WebcamImage , WebcamUtil} from 'ngx-webcam';
import {WebcamModule} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TagComponent } from 'src/app/shared/tag/tag.component';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss'],
  standalone: true,
  imports: [WebcamModule, MatIcon, CommonModule, HttpClientModule, TagComponent]
})
export class FaceComponent implements OnInit {

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public videoOptions: MediaTrackConstraints = {};
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage | null= null;
  public boundingBox: any;
  // webcam snapshot trigger
  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

    public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
      const base64Data = webcamImage.imageAsBase64;
      this.sendImageToEndpoint(base64Data);
    }

    private sendImageToEndpoint(base64Data: string): void {
      const endpoint = 'http://localhost:4000/api/v1/faces_analyze';
      const requestData = { data: base64Data };

      this.http.post(endpoint, requestData).subscribe(
        (response: any) => {
          this.boundingBox = response.box;
          alert(`Age: ${response.age}, Gender: ${response.gender}, Race: ${response.race}`);

        },
        (error) => {
          // Handle any errors that occur during the request
          console.error(error);
        }
      );
    }

  public capture(){
    this.trigger.next();

  }

}
