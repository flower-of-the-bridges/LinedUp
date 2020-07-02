import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  registerSubject = new BehaviorSubject(null);
  buildingSubject = new BehaviorSubject(null);
  insertSubject = new BehaviorSubject(false);
  placeSubject = new BehaviorSubject(null);
  googleSubject = new BehaviorSubject(null);

  /** google variables */
  private gapiSetup: boolean = false;
  private googleAuthInstance: any;

  constructor(private httpClient: HttpClient, private storage: Storage, private googlePlus: GooglePlus) { }

  addUniversities(value: any) {
    this.registerSubject.next(value);
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: AuthResponse) => {
        console.log("res is %o", res);
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);

          this.authSubject.next(true);
        }
      })
    );

  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        console.log("res is %o", res);
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);

          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  async setBuilding(building: any) {
    this.buildingSubject.next(building);
  }

  async selectPlace(place: any) {
    this.placeSubject.next(place);
  }

  getBuilding() {
    return this.buildingSubject.asObservable();
  }

  getPlace() {
    return this.placeSubject.asObservable();
  }

  getFavourites(): Promise<any> {
    return this.storage.get("FAVOURITES");
  }

  isLoggedIn() {
    this.storage.ready().then(storage => storage.getItem("ACCESS_TOKEN").then(res => {
      if(res!=null){
        this.authSubject.next(true);
      }
    }));
    return this.authSubject.asObservable();
  }

  hasUniversitySelected() {
    return this.registerSubject.asObservable();
  }

  getUniversities(): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/universities`).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      }));
  }

  insertQueue(request: any) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/insert`, request).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
        this.insertSubject.next(true);
      }));
  }


  searchQueue(queue: string, filter: any) {
    let request = { queue: queue, filter: filter, university: "Sapienza" };
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/search`, request).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      }));
  }

  getNews() {
    let request = { university: "Sapienza" };
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/news`, request).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      }));
  }

  getFavouritePlaces(favourites: Array<any>) {
    let request = { university: "Sapienza", favourites: favourites };
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/favourites`, request).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      }));
  }

  addToFavourites(name: string) {
    this.storage.get("FAVOURITES").then(favourites => {
      if (favourites != null && favourites.length > 0) {
        let removed = false;
        favourites.forEach((favourite, index) => {
          if (favourite == name) {
            favourites.splice(index, 1);
            removed = true;
            this.storage.set("FAVOURITES", favourites).then(() => {
              console.log("removed element %s from favourites", name);
            });
          }
        })
        if (!removed) {
          favourites.push(name);
          this.storage.set("FAVOURITES", favourites).then(() => {
            console.log("added %s to favourites", name);
          });
        }
      }
      else {
        let newFavourites = [];
        newFavourites.push(name);
        this.storage.set("FAVOURITES", newFavourites).then(() => {
          console.log("added %s to favourites", name);
        });
      }
    })
  }

  sendReview(request: any) {
    request["university"] = "Sapienza"

    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/review`, request).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      }));
  }

  googleSignUp(isNative: boolean, callback: Function) {
    if (isNative) {
      return this.googlePlus.login({});
    }
    else {
      this.authenticate(callback);
    }

  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '90433769635-lc48o02jipfrufd0re9kgq0i3vq94cl7.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.googleAuthInstance = auth;
        });
    });
  }

  async authenticate(callback: Function): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.googleAuthInstance.signIn().then(
        (user: any) => {
          console.log(user);
          this.checkGoogleAccount(user.Qt, user.wc).subscribe(res => {
            this.googleSubject.next(user.Qt.Au);
            if (res.found != false) {
              this.authSubject.next(true);
            }
            else {
              callback(res.found);
            }
          });
        },
        (error: any) => console.log(error));
    });

  }

  checkGoogleAccount(userInfo: any, userToken: any) {
    this.storage.set("ACCESS_TOKEN", userToken.access_token);
    this.storage.set("EXPIRES_IN", userToken.expires_in);

    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/googlecheck`, { mail: userInfo.Au, name: userInfo.zW, surname: userInfo.zU }).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
      })
    );
  }

  isGoogleAuthentication() {
    return this.googleSubject.asObservable();
  }

  finishGoogleRegistration(mail: string, univerisity: string, faculty: string) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/googleupdate`, { mail: mail, university: univerisity, faculty: faculty }).pipe(
      tap(async (res: any) => {
        console.log("res is %o", res);
        res && res.msg && res.msg == "ok" && this.authSubject.next(true);
      }));
  }

}
