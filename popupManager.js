app.factory('popupManager', function ($ionicPopup) {
    var manager = {};
    manager.states = {};
    manager.states.current;
    manager.is_showing_popup = false;
    

    manager.show_popup = function (popup) {
        manager.is_showing_popup = true;
        switch (popup.type) {
            case 'alert':
                if (popup.variable) {
                    popup.variable.popup = $ionicPopup.alert(popup.options);
                    popup.variable.popup.then(function () { manager.is_showing_popup = false; manager.exhaust(); });
                } else $ionicPopup.alert(popup.options).then(function () { manager.is_showing_popup = false; manager.exhaust(); });;
                break;
            case 'show':
                if (popup.variable) {
                    popup.variable.popup = $ionicPopup.show(popup.options);
                    popup.variable.popup.then(function () { manager.is_showing_popup = false; manager.exhaust(); });
                } else $ionicPopup.show(popup.options).then(function () { manager.is_showing_popup = false; manager.exhaust(); });;

                break;
            case 'confirm':
                if (popup.variable) {
                    popup.variable.popup = $ionicPopup.confirm(popup.options);
                    popup.variable.popup.then(function (res) {
                        popup.callback(res);
                        manager.is_showing_popup = false; manager.exhaust();
                    });
                } else {
                    $ionicPopup.confirm(popup.options)
                    .then(function (res) {
                        popup.callback(res);
                        manager.is_showing_popup = false; manager.exhaust();
                    });
                }

                break;
        }
    }

    manager.exhaust = function () {
        if (manager.states[manager.states.current].stack.length == 0) return;
        manager.show_popup(manager.states[manager.states.current].stack[0]);
        manager.states[manager.states.current].stack.splice(0, 1);
    }

    manager.push_popup = function (popup, state) {
        if (state == manager.states.current && !manager.is_showing_popup) {
            manager.show_popup(popup);
        } else {
            manager.states[state].stack.push(popup);
        }
    }

    manager.switch_state = function (state) {
        manager.states.current = state;
        if (manager.states[state].stack.length > 0) {
            for (var i = manager.states[state].stack.length - 1; i >= 0; i--) {
                manager.show_popup(manager.states[state].stack[i]);
                manager.states[state].stack.pop();
            }
        }
    }

    manager.register_state = function (state) {
        manager.states[state] = {};
        manager.states[state].stack = [];
    }

    return manager;
});
