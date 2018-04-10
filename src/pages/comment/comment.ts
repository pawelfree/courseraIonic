import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public fb: FormBuilder) {       
    this.comment = this.fb.group({
      author: ['', Validators.required],
      rating: 5,
      comment: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.viewCtrl.dismiss({author: this.comment.value.author, 
                            rating: this.comment.value.rating,
                            comment: this.comment.value.comment,
                            date: (new Date()).toISOString()} );
  }
}
