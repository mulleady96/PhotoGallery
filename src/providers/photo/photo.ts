import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

class Photo {
  data: any;
}

@Injectable()
export class PhotoProvider {

  //TODO: Use Firebase storage to store these photos online, then host on firebase.


  public photos: Photo[] = [];

  constructor(public camera: Camera, private storage: Storage) {
    console.log('Hello PhotoProvider Provider');

  }

  loadSaved() {
   this.storage.get('photos').then((photos) => {
     this.photos = photos || [];
   });
 }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
     }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
     });
  }

  cameraRoll(){
    const options2: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  this.camera.getPicture(options2).then((imageData) => {
    this.photos.unshift({
      data: 'data:image/jpeg;base64,' + imageData
    });
    // Save all photos for later viewing
    this.storage.set('photos', this.photos);
   }, (err) => {
    // Handle error
    console.log("Camera issue:" + err);
   });
    }

  }
