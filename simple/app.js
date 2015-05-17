
 var app = angular.module('store',[]);

 app.controller('StoreController', function() {
 this.products = havaianas;
});





 var havaianas = [
{
	name: 'orange',
	image: '../images/orange.jpg',
	price: 25,
	description: 'Suitable for swimming pool',
	specifications: 'In precious plastic, all the sizes from 37 to 42',
	reviews: 'to be done'
},
{   name: 'black',
	image: '../images/black.jpg',
	price: 30,
	description: 'Perfect for the Brazilian beaches',
	specifications: 'In plastic, all the sizes available',
	reviews: 'to be done'
},
{   name: 'cuba',
	image: '../images/cuba.jpg',
	price: 30,
	description: 'Perfect for the Brazilian beaches',
	specifications: 'In plastic, all the sizes available',
	reviews: 'to be done'
},
{   name: 'city',
	image: '../images/city.jpg',
	price: 30,
	description: 'Perfect for the Brazilian beaches',
	specifications: 'In plastic, all the sizes available',
	reviews: 'to be done'
}
];


