"use strict";
var UserManager_1 = require('./user/UserManager');
var RoomManager_1 = require('./room/RoomManager');
var ClientEvent = {
    'disconnect': function () {
        var uid = this.user.uid;
        var rid = this.user.rid;
        var room = RoomManager_1.default.Instance.getRoom(rid);
        if (room) {
            RoomManager_1.default.Instance.io.to(rid).emit('game:scores', { scores: room.scoreHelper.getScore(), msg: '你的对手离开了游戏' });
            RoomManager_1.default.Instance.removeRoom(rid);
        }
        UserManager_1.default.Instance.removeUser(uid);
        RoomManager_1.default.Instance.removeFromWaitList(uid);
        console.log('===> [user ' + this.socket.id + '] disconnect');
    },
    'user:login': function (data) {
        this.user.name = data.name;
        this.socket.emit('user:loginSuccess', { uid: this.user.uid, username: data.name });
        console.log('System:  [name: ' + this.user.name + '] log in.');
    },
    'user:ready': function () {
        var rid = this.user.rid;
        var uid = this.user.uid;
        var room = RoomManager_1.default.Instance.getRoom(rid);
        if (room)
            room.getReady(uid);
    },
    'user:ctrl': function (ctrl) {
        var game;
        var rid = this.user.rid;
        var room = RoomManager_1.default.Instance.getRoom(rid);
        if (!room || room.status === 0) {
            this.socket.emit('sys:msg', { msg: 'room not exist' });
            return;
        }
        game = room.game;
        if (game)
            game.addCtrl(ctrl);
        else {
            this.socket.emit('sys:msg', { msg: 'game not exist' });
        }
    },
    'room:match': function () {
        RoomManager_1.default.Instance.addToWaitList(this.user);
    },
    'room:join': function () {
    },
    'room:create': function () {
    },
    'game:scorein': function (data) {
        var rid = this.user.rid;
        var room = RoomManager_1.default.Instance.getRoom(rid);
        switch (data.type) {
            case 'bulletExplosion': {
                room.scoreHelper.scorein(data.id, 'bulletExplosion');
                RoomManager_1.default.Instance.io.to(rid).emit('game:scorein', { id: this.user.uid, scores: room.scoreHelper.getScore(this.user.uid) });
                break;
            }
            case 'ballin': {
                room.scoreHelper.scorein(data.id, 'ballin');
                RoomManager_1.default.Instance.io.to(rid).emit('game:scorein', { id: this.user.uid, scores: room.scoreHelper.getScore(this.user.uid) });
                if (room.scoreHelper.checkWin(data.id)) {
                    RoomManager_1.default.Instance.io.to(rid).emit('game:scores', { scores: room.scoreHelper.getScore() });
                    RoomManager_1.default.Instance.removeRoom(rid);
                }
                break;
            }
        }
    }
};
var ConnectionManager = (function () {
    function ConnectionManager() {
    }
    ConnectionManager.prototype.initSocketEvent = function (socket, user) {
        this.socket = socket;
        this.user = user;
        for (var i in ClientEvent) {
            socket.on(i, ClientEvent[i].bind(this));
        }
    };
    return ConnectionManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConnectionManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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aEJBLEFBZ0JDLElBQUE7QUFoQkQ7bUNBZ0JDLENBQUEiLCJmaWxlIjoiQ29ubmVjdGlvbk1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlck1hbmFnZXIgZnJvbSAnLi91c2VyL1VzZXJNYW5hZ2VyJztcbmltcG9ydCBSb29tTWFuYWdlciBmcm9tICcuL3Jvb20vUm9vbU1hbmFnZXInO1xuXG4vLyDluKfmm7TmlrDljIVcbmludGVyZmFjZSBGcmFtZVBhY2sge1xuICAgIGtleWZyYW1lOiBudW1iZXI7XG4gICAgY3RybHM6IEFycmF5PEN0cmw+O1xufVxuXG4vLyDnlKjmiLfmk43kvZxcbmludGVyZmFjZSBDdHJsIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGN0cmw6IHtcbiAgICAgIGFuZ2xlOiBudW1iZXIsXG4gICAgICBwb3dlcjogbnVtYmVyLFxuICAgICAgYnVsbGV0VHlwZTogc3RyaW5nXG4gICAgfVxufVxuXG52YXIgQ2xpZW50RXZlbnQgPSB7XG4gICAgXG4gICAgJ2Rpc2Nvbm5lY3QnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCB1aWQgPSB0aGlzLnVzZXIudWlkO1xuICAgICAgICBsZXQgcmlkID0gdGhpcy51c2VyLnJpZDtcbiAgICAgICAgbGV0IHJvb20gPSBSb29tTWFuYWdlci5JbnN0YW5jZS5nZXRSb29tKHJpZCk7XG5cbiAgICAgICAgLy8g6YCa55+l5YW25LuW546p5a6255So5oi356a75byA5bm25Y+R6YCB5YiG5pWw5pWw5o2uXG4gICAgICAgIGlmKHJvb20pIHtcbiAgICAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpzY29yZXMnLCB7c2NvcmVzOiByb29tLnNjb3JlSGVscGVyLmdldFNjb3JlKCksIG1zZzogJ+S9oOeahOWvueaJi+emu+W8gOS6hua4uOaIjyd9KTtcbiAgICAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLnJlbW92ZVJvb20ocmlkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g5riF55CG5q6L55WZ55So5oi35pWw5o2uXG4gICAgICAgIFVzZXJNYW5hZ2VyLkluc3RhbmNlLnJlbW92ZVVzZXIodWlkKTtcbiAgICAgICAgUm9vbU1hbmFnZXIuSW5zdGFuY2UucmVtb3ZlRnJvbVdhaXRMaXN0KHVpZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnPT09PiBbdXNlciAnICsgdGhpcy5zb2NrZXQuaWQgKyAnXSBkaXNjb25uZWN0Jyk7XG4gICAgfSxcbiAgICBcbiAgICAvLyDku6XnlKjmiLflkI3nmbvlvZVcbiAgICAndXNlcjpsb2dpbic6IGZ1bmN0aW9uKGRhdGE6e25hbWU6c3RyaW5nfSkge1xuICAgICAgICB0aGlzLnVzZXIubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlcjpsb2dpblN1Y2Nlc3MnLCB7dWlkOiB0aGlzLnVzZXIudWlkLCB1c2VybmFtZTogZGF0YS5uYW1lfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTeXN0ZW06ICBbbmFtZTogJyArIHRoaXMudXNlci5uYW1lICsgJ10gbG9nIGluLicpO1xuICAgIH0sXG4gICAgXG4gICAgLy8g55So5oi35YeG5aSHXG4gICAgJ3VzZXI6cmVhZHknOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHJpZCA9IHRoaXMudXNlci5yaWQ7XG4gICAgICAgIGxldCB1aWQgPSB0aGlzLnVzZXIudWlkO1xuICAgICAgICBsZXQgcm9vbSA9IFJvb21NYW5hZ2VyLkluc3RhbmNlLmdldFJvb20ocmlkKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHJvb20pIHJvb20uZ2V0UmVhZHkodWlkKTtcbiAgICB9LFxuXG4gICAgLy8g55So5oi35pON5L2cXG4gICAgJ3VzZXI6Y3RybCc6IGZ1bmN0aW9uKGN0cmw6IEN0cmwpIHtcbiAgICAgICAgbGV0IGdhbWU7XG4gICAgICAgIGxldCByaWQgPSB0aGlzLnVzZXIucmlkO1xuICAgICAgICBsZXQgcm9vbSA9IFJvb21NYW5hZ2VyLkluc3RhbmNlLmdldFJvb20ocmlkKTtcblxuICAgICAgICBpZighcm9vbSB8fCByb29tLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc3lzOm1zZycsIHttc2c6ICdyb29tIG5vdCBleGlzdCd9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGdhbWUgPSByb29tLmdhbWU7XG5cbiAgICAgICAgaWYoZ2FtZSkgZ2FtZS5hZGRDdHJsKGN0cmwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3N5czptc2cnLCB7bXNnOiAnZ2FtZSBub3QgZXhpc3QnfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8vIOW8gOWni+WMuemFjeWvueaJi1xuICAgICdyb29tOm1hdGNoJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmFkZFRvV2FpdExpc3QodGhpcy51c2VyKTtcbiAgICB9LFxuICAgIFxuICAgIC8vIOWKoOWFpeaIv+mXtFxuICAgICdyb29tOmpvaW4nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICAvLyDliJvlu7rmiL/pl7RcbiAgICAncm9vbTpjcmVhdGUnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIC8vIOWtkOW8ueeIhueCuOW+l+WIhlxuICAgIC8vICdnYW1lOmV4cGxvc2lvbic6IGZ1bmN0aW9uKGRhdGE6IHtpZDogc3RyaW5nfSkge1xuICAgIC8vICAgICBsZXQgcmlkID0gdGhpcy51c2VyLnJpZDtcbiAgICAvLyAgICAgbGV0IHJvb20gPSBSb29tTWFuYWdlci5JbnN0YW5jZS5nZXRSb29tKHJpZCk7XG5cbiAgICAvLyAgICAgcm9vbS5zY29yZUhlbHBlci5jYXVzZUV4cGxvc2lvbihkYXRhLmlkKTtcblxuICAgIC8vICAgICBSb29tTWFuYWdlci5JbnN0YW5jZS5pby50byhyaWQpLmVtaXQoJ2dhbWU6c2NvcmVpbicsIHtpZDogdGhpcy51c2VyLnVpZCwgc2NvcmVzOiByb29tLnNjb3JlSGVscGVyLmdldFNjb3JlKHRoaXMudXNlci51aWQpfSk7XG4gICAgLy8gfSxcblxuICAgIC8vIC8vIOi/m+eQg+W+l+WIhlxuICAgIC8vICdnYW1lOmJhbGxpbic6IGZ1bmN0aW9uKGRhdGE6IHtpZDogc3RyaW5nfSkge1xuICAgIC8vICAgICBsZXQgcmlkID0gdGhpcy51c2VyLnJpZDtcbiAgICAvLyAgICAgbGV0IHJvb20gPSBSb29tTWFuYWdlci5JbnN0YW5jZS5nZXRSb29tKHJpZCk7XG5cbiAgICAvLyAgICAgbGV0IHJlc3VsdCA9IHJvb20uc2NvcmVIZWxwZXIuYmFsbEluKGRhdGEuaWQpO1xuXG4gICAgLy8gICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpzY29yZWluJywge2lkOiB0aGlzLnVzZXIudWlkLCBzY29yZXM6IHJvb20uc2NvcmVIZWxwZXIuZ2V0U2NvcmUodGhpcy51c2VyLnVpZCl9KTtcblxuICAgIC8vICAgICBpZihyZXN1bHQpIHtcbiAgICAvLyAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpzY29yZXMnLCB7c2NvcmVzOiByb29tLnNjb3JlSGVscGVyLmdldFNjb3JlKCl9KTtcbiAgICAvLyAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLnJlbW92ZVJvb20ocmlkKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0sXG5cbiAgICAvLyDlvpfliIbov5votKZcbiAgICAnZ2FtZTpzY29yZWluJzogZnVuY3Rpb24oZGF0YToge2lkOiBzdHJpbmcsIHR5cGU6IHN0cmluZ30pIHtcbiAgICAgICAgbGV0IHJpZCA9IHRoaXMudXNlci5yaWQ7XG4gICAgICAgIGxldCByb29tID0gUm9vbU1hbmFnZXIuSW5zdGFuY2UuZ2V0Um9vbShyaWQpO1xuXG4gICAgICAgIHN3aXRjaChkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J1bGxldEV4cGxvc2lvbic6IHtcbiAgICAgICAgICAgICAgICByb29tLnNjb3JlSGVscGVyLnNjb3JlaW4oZGF0YS5pZCwgJ2J1bGxldEV4cGxvc2lvbicpO1xuICAgICAgICAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpzY29yZWluJywge2lkOiB0aGlzLnVzZXIudWlkLCBzY29yZXM6IHJvb20uc2NvcmVIZWxwZXIuZ2V0U2NvcmUodGhpcy51c2VyLnVpZCl9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2JhbGxpbic6IHtcbiAgICAgICAgICAgICAgICByb29tLnNjb3JlSGVscGVyLnNjb3JlaW4oZGF0YS5pZCwgJ2JhbGxpbicpO1xuICAgICAgICAgICAgICAgIC8vIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpiYWxsZGlyZWN0aW9uJywge2lkOiB0aGlzLnVzZXIudWlkLCBkaXJlY3Rpb246IE1hdGgucmFuZG9tKCkgPiAuNT8gMSA6IDB9KTtcbiAgICAgICAgICAgICAgICBSb29tTWFuYWdlci5JbnN0YW5jZS5pby50byhyaWQpLmVtaXQoJ2dhbWU6c2NvcmVpbicsIHtpZDogdGhpcy51c2VyLnVpZCwgc2NvcmVzOiByb29tLnNjb3JlSGVscGVyLmdldFNjb3JlKHRoaXMudXNlci51aWQpfSk7XG5cbiAgICAgICAgICAgICAgICBpZihyb29tLnNjb3JlSGVscGVyLmNoZWNrV2luKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIFJvb21NYW5hZ2VyLkluc3RhbmNlLmlvLnRvKHJpZCkuZW1pdCgnZ2FtZTpzY29yZXMnLCB7c2NvcmVzOiByb29tLnNjb3JlSGVscGVyLmdldFNjb3JlKCl9KTtcbiAgICAgICAgICAgICAgICAgICAgUm9vbU1hbmFnZXIuSW5zdGFuY2UucmVtb3ZlUm9vbShyaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbm5lY3Rpb25NYW5hZ2VyIHtcbiAgICBwcml2YXRlIHVzZXI7XG4gICAgcHJpdmF0ZSBzb2NrZXQ7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgaW5pdFNvY2tldEV2ZW50KHNvY2tldCwgdXNlcikge1xuICAgICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgaSBpbiBDbGllbnRFdmVudCkge1xuICAgICAgICAgICAgc29ja2V0Lm9uKGksIENsaWVudEV2ZW50W2ldLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
