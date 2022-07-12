// // import { postData,serverhost,token } from './lib.js';

// //Authorization

// // const data = { username: 'tahmeed', password: 'tahmeed' };
// // //POST request with body equal on data in JSON format
// // fetch(serverhost + '/auth/token/', {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   body: JSON.stringify(data),
// // })
// // .then((response) => response.json())
// // //Then with the data from the response in JSON...
// // .then((data) => {
// // 	token = data.get('token');
// // 	console.log(token); // JSON data parsed by `data.json()` call
// // })
// // //Then with the error genereted...
// // .catch((error) => {
// //   console.error('Error:', error);
// // });

  
// //   postData(serverhost + '/auth/token/', { username: 'tahmeed', password: 'tahmeed' })
// // 	.then(data => {
// // 	  token = data.get('token');
// // 	  console.log(token); // JSON data parsed by `data.json()` call
// // 	});



// 	// chrome.runtime.onMessage.addListener(
// 	// 	function(request, sender, sendResponse) {
		  
			  
// 	// 		var url = serverhost + '/auth/token/' ;
			
// 	// 		console.log(url);
			
// 	// 		//var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"	
// 	// 		fetch(url)
// 	// 		.then(response => response.json())
// 	// 		.then(response => sendResponse({farewell: response}))
// 	// 		.catch(error => console.log(error))
				
// 	// 		return true;  // Will respond asynchronously.
		  
// 	// });
// var serverhost = 'http://127.0.0.1:8000';
// var headers =  {
//     'Content-Type': 'application/json'
// }

// async function postData(url = '', data = {}, h = {'Content-Type': 'application/json'}) {
// 	// Default options are marked with *
// 	const response = await fetch(url, {
// 	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
// 	  mode: 'cors', // no-cors, *cors, same-origin
// 	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// 	  credentials: 'same-origin', // include, *same-origin, omit
// 	  headers: h,
// 	  redirect: 'follow', // manual, *follow, error
// 	  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 	  body: JSON.stringify(data) // body data type must match "Content-Type" header
// 	});
// 	return response.json(); // parses JSON response into native JavaScript objects
//   }

//   if(!localStorage.getItem('token'))
//   {
// 	postData(serverhost + '/auth/token/', { username: 'tahmeed', password: 'tahmeed' }, headers)
// 	.then(data => {
//         localStorage['token'] = data['token'];
// 	   // JSON data parsed by `data.json()` call
// 	});
//   }
 