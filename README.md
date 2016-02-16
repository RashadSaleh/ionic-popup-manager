This popup manager allows you to show popups only when a certain "state" is active. (This is different from the "states" of the $stateProvider). States are defined by you like this:
```language-javascript
popupManager.register_state('state #1');
popupManager.register_state('state #2');
//and so on...
```
And then you can switch to any state like this:

```language-javascript
popupManager.switch_state('state #1');
```
To push a popup to show only when a certain state is switched to, write this:

```language-javascript
var popup = {};
popup.type = 'alert';
popup.options = {
    title: 'my title',
    scope: $scope,
    okType: 'button button-calm button-outline',
    okText: 'OK'
};
popupManager.push_popup(popup, 'state #2');
```

Now, if you take all the code snippets as a whole, since 'state #2' is not active (but 'state #1' is), the popup will be saved in a stack until we switch with `popupManager.switch_state('state #2');` and *then* show to the user. If we before switching push more  popups, the popups will be shown in the correct order (first come first served). This is also true if you push popups to an active state while an older popup is still showing: the popping order will always be exactly the same as the order in which the popups were pushed.

Finally, if you want to get a handle to your popup so you can close it programmatically, then add the "variable" field to your popup object:
```
popup.variable = $scope //or some over variable.
```
Now you can close the popup with `$scope.popup.close();`

