"use strict";
var Game_1 = require('../Game');
var ScoreHelper_1 = require('./ScoreHelper');
var Room = (function () {
    function Room(rid, user1, user2) {
        this._readyList = [];
        this.status = 1;
        this._rid = rid;
        this._userList = [user1, user2];
        this._socketList = [user1.socket, user2.socket];
        this._userList[0].rid = this._rid;
        this._userList[1].rid = this._rid;
        this._socketList[0].join(this._rid);
        this._socketList[1].join(this._rid);
        this._scoreHelper = new ScoreHelper_1.default(user1.uid, user1.name, user2.uid, user2.name);
        var direction = Math.random() < 0.5 ? 0 : 1;
        this._socketList[0].emit('room:created', { opponent: user2.name, ballDirection: direction });
        this._socketList[1].emit('room:created', { opponent: user1.name, ballDirection: 1 - direction });
        console.log('System:  create room for [' + this._userList[0].uid + ' and ' + this._userList[1].uid + ']');
        console.log('<=== emit room:created to [' + this._userList[0].uid + ' and ' + this._userList[1].uid + ']');
    }
    Object.defineProperty(Room.prototype, "rid", {
        get: function () {
            return this._rid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "scoreHelper", {
        get: function () {
            return this._scoreHelper;
        },
        enumerable: true,
        configurable: true
    });
    Room.prototype.getReady = function (uid) {
        this._readyList.push(uid);
        if (this._readyList.length === 2) {
            this._game = new Game_1.default(this._rid, this._userList);
            this._game.start();
            this._readyList = [];
        }
    };
    Room.prototype.stopGame = function () {
        this.status = 0;
        if (this._game)
            this._game.stop();
    };
    Room.prototype.destroy = function () {
        this.stopGame();
        if (this._socketList[0])
            this._socketList[0].leave(this._rid);
        if (this._socketList[1])
            this._socketList[1].leave(this._rid);
    };
    Room.prototype.isObjectValueEqual = function (a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    };
    return Room;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Room;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUM7WUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsV0FBQztBQUFELENBdkdBLEFBdUdDLElBQUE7QUF2R0Q7c0JBdUdDLENBQUEiLCJmaWxlIjoicm9vbS9Sb29tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXIgZnJvbSAnLi4vdXNlci9Vc2VyJztcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xuaW1wb3J0IFNjb3JlSGVscGVyIGZyb20gJy4vU2NvcmVIZWxwZXInO1xuaW1wb3J0IFJvb21NYW5hZ2VyIGZyb20gJy4vUm9vbU1hbmFnZXInO1xuaW1wb3J0IFVzZXJNYW5hZ2VyIGZyb20gJy4uL3VzZXIvVXNlck1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIHtcbiAgICBwcml2YXRlIF9yaWQ6c3RyaW5nO1xuICAgIHByaXZhdGUgX3VzZXJMaXN0OiBBcnJheTxVc2VyPjtcbiAgICBwcml2YXRlIF9zb2NrZXRMaXN0OiBBcnJheTxTb2NrZXRJTy5Tb2NrZXQ+O1xuICAgIHByaXZhdGUgX3JlYWR5TGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHByaXZhdGUgX3Njb3JlSGVscGVyOiBTY29yZUhlbHBlcjtcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lO1xuICAgIC8vIOaIv+mXtOeKtuaAgeWAvO+8jCAx77ya5q2j5bi46L+Q6KGM54q25oCBIDDvvJroh7PlsJHmnInkuIDkuKrnjqnlrrbmlq3nur/vvIzmiL/pl7TlgZzmraLnirbmgIFcbiAgICBwdWJsaWMgc3RhdHVzOiBudW1iZXIgPSAxO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJpZDpzdHJpbmcsIHVzZXIxOlVzZXIsIHVzZXIyOlVzZXIpIHtcblxuICAgICAgICAvLyDliJ3lp4vljJbmiL/pl7Tlj7fjgIHnlKjmiLfpmJ/liJfjgIHnq6/lj6PpmJ/liJdcbiAgICAgICAgdGhpcy5fcmlkID0gcmlkO1xuICAgICAgICB0aGlzLl91c2VyTGlzdCA9IFt1c2VyMSwgdXNlcjJdO1xuICAgICAgICB0aGlzLl9zb2NrZXRMaXN0ID0gW3VzZXIxLnNvY2tldCwgdXNlcjIuc29ja2V0XTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3VzZXJMaXN0WzBdLnJpZCA9IHRoaXMuX3JpZDtcbiAgICAgICAgdGhpcy5fdXNlckxpc3RbMV0ucmlkID0gdGhpcy5fcmlkO1xuICAgICAgICB0aGlzLl9zb2NrZXRMaXN0WzBdLmpvaW4odGhpcy5fcmlkKTtcbiAgICAgICAgdGhpcy5fc29ja2V0TGlzdFsxXS5qb2luKHRoaXMuX3JpZCk7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW5YiG5pWw566h55CG5ZmoXG4gICAgICAgIHRoaXMuX3Njb3JlSGVscGVyID0gbmV3IFNjb3JlSGVscGVyKHVzZXIxLnVpZCwgdXNlcjEubmFtZSwgdXNlcjIudWlkLCB1c2VyMi5uYW1lKTtcblxuICAgICAgICAvLyDpmo/mnLrmlrnlkJFcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjU/IDAgOiAxO1xuXG4gICAgICAgIC8vIOaIv+mXtOWIm+W7uuaIkOWKn++8jOWPkemAgea2iOaBr+WIsOWuouaIt+err1xuICAgICAgICAvLyDliJ3lp4vljJbmr5TotZvnkIPnmoTliJ3lp4vmlrnlkJHvvIzlj5HpgIHnkIPliJ3lp4vljJbmtojmga9cbiAgICAgICAgdGhpcy5fc29ja2V0TGlzdFswXS5lbWl0KCdyb29tOmNyZWF0ZWQnLCB7b3Bwb25lbnQ6IHVzZXIyLm5hbWUsIGJhbGxEaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xuICAgICAgICB0aGlzLl9zb2NrZXRMaXN0WzFdLmVtaXQoJ3Jvb206Y3JlYXRlZCcsIHtvcHBvbmVudDogdXNlcjEubmFtZSwgYmFsbERpcmVjdGlvbjogMSAtIGRpcmVjdGlvbn0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdTeXN0ZW06ICBjcmVhdGUgcm9vbSBmb3IgWycgKyB0aGlzLl91c2VyTGlzdFswXS51aWQgKyAnIGFuZCAnICsgdGhpcy5fdXNlckxpc3RbMV0udWlkICsgJ10nKTtcbiAgICAgICAgY29uc29sZS5sb2coJzw9PT0gZW1pdCByb29tOmNyZWF0ZWQgdG8gWycgKyB0aGlzLl91c2VyTGlzdFswXS51aWQgKyAnIGFuZCAnICsgdGhpcy5fdXNlckxpc3RbMV0udWlkICsgJ10nKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhVc2VyTWFuYWdlci5JbnN0YW5jZS51c2VyTGlzdC5sZW5ndGgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhSb29tTWFuYWdlci5JbnN0YW5jZS5yb29tTGlzdC5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldCByaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yaWQ7XG4gICAgfVxuXG4gICAgZ2V0IGdhbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lO1xuICAgIH1cblxuICAgIGdldCBzY29yZUhlbHBlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlSGVscGVyO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDkuIDkuKrnlKjmiLflh4blpIdcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVhZHkodWlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcmVhZHlMaXN0LnB1c2godWlkKTtcbiAgICAgICAgaWYodGhpcy5fcmVhZHlMaXN0Lmxlbmd0aCA9PT0gMikgeyAgIFxuXG4gICAgICAgICAgICAvLyDlj4zmlrnnjqnlrrblh4blpIflsLHnu6rvvIwg5Yid5aeL5YyW5ri45oiP5a6e5L6LXG4gICAgICAgICAgICB0aGlzLl9nYW1lID0gbmV3IEdhbWUodGhpcy5fcmlkLCB0aGlzLl91c2VyTGlzdCk7XG4gICAgICAgICAgICB0aGlzLl9nYW1lLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgIC8vIOa4heepuuWHhuWkh+mYn+WIl1xuICAgICAgICAgICAgdGhpcy5fcmVhZHlMaXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmuLjmiI9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RvcEdhbWUoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcbiAgICAgICAgaWYodGhpcy5fZ2FtZSkgdGhpcy5fZ2FtZS5zdG9wKCk7XG4gICAgfVxuXG4gICAgLy8g5riF55CG5oi/6Ze05pWw5o2uXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RvcEdhbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuX3NvY2tldExpc3RbMF0pIHRoaXMuX3NvY2tldExpc3RbMF0ubGVhdmUodGhpcy5fcmlkKTtcbiAgICAgICAgaWYodGhpcy5fc29ja2V0TGlzdFsxXSkgdGhpcy5fc29ja2V0TGlzdFsxXS5sZWF2ZSh0aGlzLl9yaWQpO1xuICAgIH1cblxuICAgIC8vIOWIpOaWreS4pOS4quWvueixoeaYr+WQpuWAvOebuOetiVxuICAgIHByaXZhdGUgaXNPYmplY3RWYWx1ZUVxdWFsKGE6IE9iamVjdCwgYjogT2JqZWN0KSB7XG4gICAgICAgIHZhciBhUHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICAgICAgdmFyIGJQcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpO1xuIFxuICAgICAgICBpZiAoYVByb3BzLmxlbmd0aCAhPSBiUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IGFQcm9wc1tpXTtcblxuICAgICAgICAgICAgaWYgKGFbcHJvcE5hbWVdICE9PSBiW3Byb3BOYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iXX0=
