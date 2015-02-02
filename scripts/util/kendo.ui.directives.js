define([
	"angular",
	"kendo.data",
	"kendo.grid",
	"kendo.datepicker",
	"kendo.web"
],
function(angular){
	var kendoMod = angular.module("kendo.ui.directives",[]);

	function chainEvent(locals, events, event){
		var _evt = locals.settings[event],
			fn = events[event];
		return _evt && typeof _evt === 'function' ? function (e) { fn(); _evt.call(locals.widget, e); } : fn;
	}
	
	function kendoWidgetBase(obj)
	{
			return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel){
					var settingsattr = attrs.kendouiSettings || attrs.ngModel + "Settings";
					var settings = scope[settingsattr] || {};
					// allow the caller to override the watcher
					var watcher = obj.update && (obj.watcher || function() {
						var stop = null;
						function start() {
							this.stop = scope.$watch(attrs.ngModel,
								function dataChangedWatch(newValue, oldValue)
								{
									obj.update(locals);
								}, 
								true);
						};
						
						return {
							start: start,
							stop: stop
						}	
					}());

					var locals = {
						watcher: watcher,
						settings: settings,
						widgetName: obj.widgetName,
						widget: undefined,
						scope: scope,
						element: element,
						attrs: attrs,
						ngModel: ngModel
					}
					
					ngModel.$render = (obj.render && obj.render(locals)) || function () {
						try {
							var settingsProp = attrs.kendouiSettings || attrs.ngModel + "Settings",
								scopeSettings = scope[settingsProp] || {};
							locals.widget = $(element)[obj.widgetName](scopeSettings).data(obj.widgetName);
							if(obj.update)
								obj.update(locals);
						} catch (err) {
							throw err;
						}
					};
					
					var events = obj.getEvents && obj.getEvents(locals);
					
					// chain each event declared in the directive definition 
					// to the correspondingsettings event
					if(events){
						for(event in events)
						{
							locals.settings[event] = chainEvent(locals, events, event);
						}
					}
					
					if(watcher)
						watcher.start();
				}
			};
	}
	
	kendoMod.directive("kendouiAutocomplete", function(){
		return kendoWidgetBase({
			widgetName: "kendoAutoComplete",
			update: function (locals) {
				locals.widget.value(locals.ngModel.$modelValue);
			},
			getEvents: function(locals) { 
				return {
				change: function()
					{
						locals.watcher.stop();
						locals.scope.$apply(function(){
							locals.ngModel.$setViewValue(locals.widget.value());
						});
						locals.watcher.start();
					}
				}
			}
		});
	});
	
	kendoMod.directive("kendouiDropdownlist", function(){
		return kendoWidgetBase({
			widgetName: "kendoDropDownList",
			update: function (locals) {
				locals.widget.value(locals.ngModel.$modelValue);
			},
			getEvents: function(locals) { 
				return {
				change: function()
					{
						locals.watcher.stop();
						locals.scope.$apply(function(){
							locals.ngModel.$setViewValue(locals.widget.value());
						});
						locals.watcher.start();
					}
				}
			}
		});
	});
	
	kendoMod.directive("kendouiTreeview", function(){
		return kendoWidgetBase({
			widgetName: "kendoTreeView"
		});
	});
	
	kendoMod.directive("kendouiGrid", function() {
		var obj = {
			widgetName: "kendoGrid",
			update: function(locals){
				if(locals.widget && locals.widget.dataSource)
				{
					locals.widget.dataSource.data(locals.ngModel.$modelValue);
				}
			},
			// this is rather convoluted, but it shows it's possible to override the default render method
			renderx: function(locals) {
				return function() {
					var settingsProp = locals.attrs.kendouiSettings || locals.attrs.ngModel + "Settings",
						scopeSettings = locals.scope[settingsProp] || {};
					locals.widget = $(locals.element)[obj.widgetName](scopeSettings).data(obj.widgetName);
					obj.update(locals);
				}
			},
			getEvents: function (locals) {
				return {
				save: function() {
						locals.watcher.stop();
						locals.scope.$apply(function(){
							locals.ngModel.$setViewValue(locals.widget.dataSource.data());
						});
						locals.watcher.start();
					}
				}
			}
		};
		return kendoWidgetBase(obj);
	});

	kendoMod.directive("kendouiDatepicker", function(){
		return kendoWidgetBase({
			widgetName: "kendoDatePicker",
			update: function (locals) {
				locals.widget.value(locals.ngModel.$modelValue);
			},
			getEvents: function(locals) { 
				return {
				change: function()
					{
						locals.watcher.stop();
						locals.scope.$apply(function(){
							locals.ngModel.$setViewValue(locals.widget.value());
						});
						locals.watcher.start();
					}
				}
			}
		});
	});
	
	return {
		module: kendoMod,
		base: kendoWidgetBase
	}
	
});