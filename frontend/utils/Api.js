import { Promise } from "core-js";

 class Api {
    constructor(options) {
        this._options = options;
        this._token = options.token;
        this._address = options.address;
        this._owner = options.owner;
    }

    _checkResult() {
    return  (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      }
    }

    getUserInfoFromServer() {
        return fetch(`${this._address}/users/${this._owner}`, {
            headers: {
                authorization: this._token
              }
        }).then(this._checkResult())
    }

    pushNewAvatar(link) {
        return fetch(`${this._address}/users/${this._owner}/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: link
            })
          }).then(this._checkResult())
    }

    getAllNeededDataForCards() {
      return Promise.all([this.getUserInfoFromServer(), this.getCards()])
    }

    pushNewUserInfo(UserName, UserAbout) {
      return fetch(`${this._address}/users/${this._owner}`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: UserName,
                about: UserAbout
            })
            }).then(this._checkResult())
    }

    deleteLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
          }).then(this._checkResult())
    }

    addLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
          }).then(this._checkResult())
    }

    removeCard(cardId) {
      console.log('kkk')
      return fetch(`${this._address}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
          }).then(this._checkResult())
    }
    
    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
            authorization: this._token,
            }
        }).then(this._checkResult())
    }

    pushCard(name, link) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              link: link
            })
          }).then(this._checkResult())
    }

}
const setings = {
  address: 'https://nomoreparties.co/v1/cohort-50',
  owner: 'me',
  token: '045f163c-447c-47f7-ad86-3f0afd434fd4'
}
const myApi = new Api(setings)
export default myApi


