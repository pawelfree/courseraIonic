import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
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
    console.log("adding to favorites ", this.dish.id)
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }
}
