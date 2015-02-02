define([
	"angular",
	"app/controller",
	"util/kendo.ui.directives"
],
function(angular, controller){
	var app = angular.module("myApp",["kendo.ui.directives"]);
	app.controller("myController", controller);
	return app;
});