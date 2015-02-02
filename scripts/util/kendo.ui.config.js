define([],
function(){
	var libpath = "lib/kendo"; //point to your kendoui path. if relative, this will still be based off any preconfigured baseUrl!
	var min = ""; // set to min if using the compressed libs
	
	require.config({
		paths: {
			"kendo.core": libpath + "/kendo.core" + min,
			"kendo.web": libpath + "/kendo.web" + min,
			"kendo.data": libpath + "/kendo.data" + min,
			"kendo.calendar": libpath + "/kendo.calendar" + min,
			"kendo.datepicker": libpath + "/kendo.datepicker" + min,
			"kendo.grid": libpath + "/kendo.grid" + min,
		},
		shim: {
			"kendo.core" : {
				deps: ["jquery"]
			},
			"kendo.data" : {
				deps: ["kendo.core"]
			},
			"kendo.web" : {
				deps: ["kendo.core"]
			},
			"kendo.calendar" : {
				deps: ["kendo.core"]
			},
			"kendo.datepicker" : {
				deps: ["kendo.calendar"]
			},
			"kendo.grid" : {
				deps: ["kendo.data", "kendo.web"]
			}
		}
	});
});