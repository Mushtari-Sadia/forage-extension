// import { postData,serverhost,token } from './lib.js';
var serverhost = 'http://127.0.0.1:8000';
// var token='2a1f52e7dfab9ef3658b1263daa5dc3df5448eed'; 
var token;
var executed = false;
var executed_colab = false;
var executed_lists = false;
var headers =  {
    'Content-Type': 'application/json'
}

async function postData(url = '', data = {}, h = {'Content-Type': 'application/json'}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: h,
	  redirect: 'follow', // manual, *follow, error
	  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
  }



  if(!localStorage.getItem('token'))
  {
	postData(serverhost + '/auth/token/', { username: 'tahmeed', password: 'tahmeed' }, headers)
	.then(data => {
        localStorage['token'] = data['token'];
        console.log("inside function call="+localStorage['token']);
	   // JSON data parsed by `data.json()` call
	});
  }

  
  console.log("token="+localStorage['token']);
  token = localStorage['token'];

 headers =  {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        
        
const ids = [
    "saved",
    "Project",
    "Collaborator",
    "Status"
]
ids.forEach(element => {
    document.getElementById(element).style.display = 'none';
});


var currentTabUrl="";
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
if(tab.url.includes("dl.acm.org/doi"))
{

    chrome.tabs.sendMessage(tab.id, {get: "info"}, function(response) {
        console.log(response);
        currentTabUrl=tab.url;
        addPaperToUnsorted(tab.url,response.name,response.authors,response.abstract);
        document.getElementById("saved").style.display = 'block';
        document.getElementById("Project").style.display = 'block';
    });

    
}
else
{
    ids.forEach(element => {
        document.getElementById(element).style.display = 'none';
    });
}
});
        



function viewProjects(){
    if(!executed)
    {
        // document.getElementById("view_projects_button").style.display = 'none';
        fetch(serverhost + '/api/projects/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("project-list");
            
            data['results'].forEach(element => {
                if(element['name']!="Unsorted")
                {
                    var button = document.createElement("a");
                    button.setAttribute('id',element['name']);
                    button.style.display = 'block';
                    button.onclick = function () { addPaperToProject(element['name'],currentTabUrl,element['id']); };
                    button.innerHTML = element['name'];
                    ul.appendChild(button);
                }
            }); 
        })
        executed=true;
    }
    
}
document.getElementById("view_projects_button").addEventListener("mouseover", viewProjects);


function viewCollaborators(projectID){
    if(!executed_colab)
    {
        // document.getElementById("view_collaborators_button").style.display = 'none';
        fetch(serverhost + '/api/projects/'+projectID+'/collaborators/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("collaborator-list");
            
            data.forEach(element => {
                var button = document.createElement("a");
                button.setAttribute('id',element['name']+element['id']);
                button.style.display = 'block';
                button.onclick = function () { assignCollaboratorToPaper(element['id'],projectID,currentTabUrl); };
                button.innerHTML = element['username'];
                ul.appendChild(button);
            }); 
        })
    }
    executed_colab=true;
    
}

function viewLists(projectID){
    if(!executed_lists)
    {
        // document.getElementById("view_status_button").style.display = 'none';
        fetch(serverhost + '/api/projects/'+projectID+'/lists/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("status-list");
            
            data.forEach(element => {
                var button = document.createElement("a");
                button.setAttribute('id',element['name']+element['id']);
                button.style.display = 'block';
                button.onclick = function () { assignStatusToPaper(element['id'],projectID,currentTabUrl); };
                button.innerHTML = element['name'];
                ul.appendChild(button);
            }); 
        })
        executed_lists=true;
    }
}

function addPaperToUnsorted( paperUrl, paperName, paperAuthors, paperAbstract)
{
    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    postData(serverhost + '/extension/add-paper/', { doi: doi, name: paperName, authors: paperAuthors, abstract: paperAuthors}, headers)
        .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        });
}


function addPaperToProject(projectName, paperUrl, projectID){

    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    console.log(projectName);
    document.getElementById("Collaborator").style.display = 'block';
    var vcb = document.getElementById("view_collaborators_button");
    vcb.onmouseover = function () { viewCollaborators(projectID) };

    document.getElementById("Status").style.display = 'block';
    var vsb = document.getElementById("view_status_button");
    vsb.onmouseover = function () { viewLists(projectID) };
    //add api call for adding paper to project

}


function assignCollaboratorToPaper(collaboratorID,projectId,paperUrl)
{
    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    console.log("collaboratorID="+collaboratorID+" projectId="+projectId+" doi="+doi)
}

function assignStatusToPaper(statusID,projectId,paperUrl)
{
    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    console.log("statusID="+statusID+" projectId="+projectId+" doi="+doi)
}
