require.config({
	baseUrl: "scripts",
	paths: {
		angular: "lib/angular/angular",
		jquery: "lib/jquery/jquery-1.8.3"
	},
	shim: {
		"angular": {
			exports: "angular"
		},
		"util/kendo.ui.directives": {
			deps: ["util/kendo.ui.config"]
		}
	}
});


require([
	"angular",
	"jquery",
	"app/app"
],
function(angular, $, app){
	angular.bootstrap($(document),["myApp"]);
});