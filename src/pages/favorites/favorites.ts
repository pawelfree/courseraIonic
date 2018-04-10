import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCtrl: ToastController,
    private lodingCtrl: LoadingController,
    private alertCtrl: AlertController,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
        .subscribe(favorites => this.favorites = favorites,
                    err => this.errMess = err);
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('Delete', id);

    let alert = this.alertCtrl.create({
      title: 'Confirm title',
      message: 'Do you want to delete favorite ' + id,
      buttons: [
        { text: 'Cancel', 
          role: 'cancel', 
          handler: () => {
          console.log('Delete cancelled');}
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.lodingCtrl.create({
              content: 'Deleting ...'
            });
            let toast =     this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfuly',
              duration: 3000
            });
            loading.present();
            this.favoriteService.deleteFavorite(id)
                .subscribe(favorites => { 
                    this.favorites = favorites;
                    loading.dismiss();
                    toast.present();
                  },
                  err => { this.errMess = err;
                    loading.dismiss();
                  }); 
          }
        }
      ]
    });
    alert.present();
    item.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
