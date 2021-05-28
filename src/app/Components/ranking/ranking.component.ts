import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/Service/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private http: RankingService) { }

  data: any;
  name: any;
  pointOne: any;
  pointTwo: any;
  pointThree: any;
  pointFour: any;
  roundActual: any = 1;
  idPlayer: any;
  position: any = 1;
  arrayPositions: any = [];

  ngOnInit(): void {
    this.searchFixedPlayers();
  }

  searchFixedPlayers() {
    this.http.fixedPlayers().subscribe((players: any) => {
      this.roundActual = 1;
      this.data = this.sortRanking(players);
    });
  }

  insertValue() {
    switch(this.roundActual) {
      
      case 1: 
        const newPlayer = { name: this.name, points: parseInt(this.pointOne) }
        this.http.insertPlayer(newPlayer).subscribe((players: any) => {
          this.data = this.sortRanking(players);
          players.forEach((data: any) => {
            if(data.name == this.name) {
              this.idPlayer = data.id;
            }
          });
        });
        this.roundActual = this.roundActual + 1;
      break;

      case 2:
        const changePointOne = { name: this.name, points: parseInt(this.pointTwo) }
        this.http.changePlayer(this.idPlayer, changePointOne).subscribe((players: any) => {
          this.data = this.sortRanking(players);
        });
        this.roundActual = this.roundActual + 1;
      break;

      case 3:
        const changePointsThree = { name: this.name, points: parseInt(this.pointThree) }
        this.http.changePlayer(this.idPlayer, changePointsThree).subscribe((players: any) => {
          this.data = this.sortRanking(players);
        });
        this.roundActual = this.roundActual + 1;
      break;

      case 4:
        const changePointsFour = { name: this.name, points: parseInt(this.pointFour) }
        this.http.changePlayer(this.idPlayer, changePointsFour).subscribe((players: any) => {
          this.data = this.sortRanking(players);
        });
        this.roundActual = this.roundActual + 1;
      break;

    }
  }

  sortRanking(list: any) {
    this.position = 1;
    this.arrayPositions = [];

    list.sort(function (a: any, b: any) {
      if (a.points < b.points) {
        return 1;
      }
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });

    list = this.orderRanking(list);

    return list;
  }

  orderRanking(list: any) {
    for(let x = 0; x < list.length; x++) {
      if(x == list.length-1) {
        if(list[x-1].points > list[x].points) {
          let ranking = { ranking: this.position };
          this.arrayPositions.push(ranking);
        } else if(list[x-1].points == list[x].points) {
          let ranking = { ranking: this.position };
          this.arrayPositions.push(ranking);
        }
      }

      if(x+1 < list.length) {
        if(list[x].points > list[x+1].points) {
          let ranking = { ranking: this.position };
          this.arrayPositions.push(ranking);
          this.position++;
        } else if (list[x].points == list[x+1].points) {
          let ranking = { ranking: this.position };
          this.arrayPositions.push(ranking);
        } 
      }
  }

    return list;
  }

  reset() {
    this.http.deletePlayer(this.idPlayer).subscribe((players: any) => {

      this.idPlayer = "";
      this.name = "";
      this.pointOne = "";
      this.pointTwo = "";
      this.pointThree = "";
      this.pointFour = "";
      this.roundActual = 1;

      this.searchFixedPlayers();
    });
  }

}
