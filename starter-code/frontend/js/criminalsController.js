angular.module('CriminalApp', [])
  .controller('CriminalController', CriminalController);

CriminalController.$inject = ['$http'];
function CriminalController($http) {
	var self = this;
 	self.all = [];
 	self.addCriminal = addCriminal;
 	self.newCriminal = {};
 	self.getCriminals = getCriminals;
 	self.deleteCriminal = deleteCriminal;

	getCriminals();
	function getCriminals(){
		$http
		  .get('http://localhost:3000/criminals')
		  .then(function(response){
		    self.all = response.data;
		    console.log(self.all);
		});
	}

	function addCriminal(){
	console.log(self.newCriminal);
	  $http
	    .post('http://localhost:3000/criminals', self.newCriminal)
	    .then(function(response){
	      getCriminals();
	  });
	  self.newCriminal = {};
	}

	function deleteCriminal(criminal){
	    console.log(criminal);
	    $http
	      .delete("http://localhost:3000/criminals/" + criminal._id)
	      .then(function(response){
	        var index = self.all.indexOf(criminal);
	        self.all.splice(index, 1);
	      });
	}
}
