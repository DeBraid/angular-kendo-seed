angular-kendo
=============

A pattern for integrating [kendo-ui widgets] into [angular.js] with [require.js] for AMD loading.

Kendo has a fantastic set of widgets and angular provides seamless binding to HTML, while require takes care of your resource management and dependencies.

Initially you may be tempted to instantiate your kendo widgets in the controller, but this can cause issues with the widgets and since angular does away with element id's there's no nice and clean way to bind angular and kendo out-of-the-box. 

Fortunately angular is designed to be extensible, and allows you to define your own directives.

## Configuration

**kendo.ui.config** contains a requirejs configuration script. This basically sets up the aliases and dependencies for the kendo library and widgets.  I have created this as a separate file and in AMD module format so it can be require'd by your script separately from your main config. This is to keep the kendo stuff out of your own application's require configuration. 

This is possible as calling **require.config** apparently adds on the existing configuration instead of overwriting it.

## Directives

**kendo.ui.directives.js** contains the directive definitions. I have provided a base function **kendoWidgetBase** for declaring angular-kendo widgets. It's not necessary to use this function but it aims to cover most simple usage scenarios and get you started up quickly, and is designed to be extensible.

The directive should handle the creation of the widget and also handle the updating of the widget from the model value and vice versa if supported by the widget.

## Widget Initialization

To initialize the widget the element can declare a **kendoui-settings** attribute. The value for this attribute should exist as a $scope property in your controller definition. For example:

`<div kendoui-grid kendoui-settings="settings" ng-model="grid"></div>`

Your controller should declare:

`$scope.settings = { columns: { ... } };`

This is equivalent to:

`$(element).kendoGrid( settings )`

If no **kendoui-settings** attribute is defined, by convention the expected scope property would be the ng-model attribute value + 'Settings'. So an `ng-model="grid"` would require a scope property `$scope.gridSettings` for initialization.

[kendo-ui widgets]: http://www.kendoui.com
[angular.js]: http://angularjs.org
[require.js]: http://requirejs.org
