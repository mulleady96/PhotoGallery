import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { PhotoProvider } from '../../providers/photo/photo';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public photoLibrary: PhotoLibrary,
  public photoService: PhotoProvider) {

  }

  ngOnInit(){
    this.photoService.loadSaved();
  }

}
