import { Component, Inject } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, ToastController, ActionSheetController} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMes: string;
  avgstar: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private favoriteService: FavoriteProvider,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private socialSharing: SocialSharing,
            @Inject('BaseURL') private BaseURL) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstar = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log("adding to favorites", this.dish.id)
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added to favorites',
      position: 'middle',
      duration: 3000
    }).present();
  }

  openAddComment() {
      let modal = this.modalCtrl.create(CommentPage);
      modal.onDidDismiss((data) => {
        this.dish.comments.push(data);
      });
      modal.present();
  }

  actions() {
    this.actionSheetCtrl.create({
      title: 'Select action',
      buttons: [
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + 
                      this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(()=> console.log('Failed to post to Facebook'))
          }
        },
        {
          text: 'Share via Twitte',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + 
                      this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(()=> console.log('Failed to post to Twitter'))
          }
        },
        {
          text: "Add to favorites",
          handler: () => { this.addToFavorites() }
        },
        {
          text: "Add comment",
          handler: () => { this.openAddComment() }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log('Cancel clicekd');
          }
        }
      ]
    }).present();
  }
}
