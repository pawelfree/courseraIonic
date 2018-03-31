import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(public navCtrl: NavController,
              public dishservice: DishProvider,
              public leaderservice: LeaderProvider,
              public promotionservice: PromotionProvider,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
                  .subscribe(dish => this.dish = dish,
                    err => this.dishErrMess = <any>err);
    this.promotionservice.getFeaturedPromotion()
                    .subscribe(promotion => this.promotion = promotion,
                      err => this.promoErrMess = <any>err);
    this.leaderservice.getFeaturedLeader()
                      .subscribe(leader => this.leader = leader,
                        err => this.leaderErrMess = <any>err);

  }

}
