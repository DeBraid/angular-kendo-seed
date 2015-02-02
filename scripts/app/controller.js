define([],function(){
	return function($scope){
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				 .toString(16)
				 .substring(1);
		};

		function guid() {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			 s4() + '-' + s4() + s4() + s4();
		}
	
		$scope.birthDateSettings = {
			change: function (e) { alert($scope.birthDate); },
			format: "MMMM dd, yyyy"
		}
		$scope.widget = {};
		$scope.treeSelected = "Empty";
		$scope.sex = undefined;
		$scope.country = "";
		$scope.countrySettings = {
			dataSource: {
				data: ["Afghanistan","Algeria","Albania","Brussels","Cambodia","Denmark","Egypt","Ethiopia","France","Finland","Guatemala","Hungary","Pakistan","Panama","Philippines","Portugal"]
			}	
		};
		$scope.treeSettings = {
			select: function(e) {
				var self = this;
				$scope.$apply(function()
				{
					$scope.treeSelected = self.text(e.node); 
				});
			}
		};
		
		$scope.rowsSettings = {
			dataSource: {
				data: $scope.rows,
				schema: {
					model: {
						id: "id",
						fields: {
							id: { type: "string", validation: { required: true} },
							firstName: { type: "string", validation: { required: true } },
							lastName: { type: "string", validation: { required: true } },
							sex: { type: "string", validation: { required: true } },
							birthDate: { type: "date", validation: { required: true } },
							description: { type: "string", validation: { required: true } } 
						}
					}
				}
			},
			columns: [
				{ 
					field: "firstName",
					title: "First Name",
					template: "<a href='http://www.google.com/?q=${firstName + ' ' + lastName}'>${firstName}</a>"
				},
				{ 
					field: "lastName",
					title: "Last Name"
				},
				{ 
					field: "sex",
					title: "Sex"
				},
				{ 
					field: "birthDate",
					title: "Birth Date",
					format: "{0:MMMM dd, yyyy}"
				},
				{ 
					field: "description",
					title: "Description"
				},
				{
					command: [
						"edit",
						"destroy",
						{ text: "Delete", click: function(e) { 
							e.preventDefault();
								var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
								console.log("dataItem", dataItem);
							} 
						} 
					]
				}
			],
			editable: "inline",
			selectable: "multiple",
			save: function(){
				this.refresh();
			},
			cancel: function(){
				this.refresh();
			}
		};

		$scope.rows = [];

		$scope.firstName = "Bill";
		$scope.lastName = "Bazington";
		$scope.birthDate = new Date();

		$scope.description = "";

		$scope.addRow = function(){
			$scope.rows.push({ 
				id: guid(),
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				sex: $scope.sex,
				birthDate: $scope.birthDate,
				description: $scope.description
			});
		}
		
		$scope.delRow = function(index){
			$scope.rows.splice(index,1);
		}
	};
});