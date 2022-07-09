
const ids = [
    "saved",
    "Project",
    "Collaborator",
    "Test3"
]
ids.forEach(element => {
    document.getElementById(element).style.display = 'none';
});




var currentTabUrl="";
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
if(tab.url.includes("dl.acm.org/doi"))
{
    currentTabUrl=tab.url;
    addPaperToProject("Unsorted",tab.url);
    document.getElementById("saved").style.display = 'block';
    // ids.forEach(element => {
    //     document.getElementById(element).style.display = 'block';
    // });
    document.getElementById("Project").style.display = 'block';
}
else
{
    ids.forEach(element => {
        document.getElementById(element).style.display = 'none';
    });
}
});



function viewProjects(){
chrome.runtime.sendMessage(
    //request type variable indicates what content user is requesting (project/collaborators ?)
    {request_type: "project"},
    function(response) {
        result = response.farewell;
        var ul = document.getElementById("project-list");
        var li = document.createElement("li");
        //result will be a list, add project names iteratively
        li.setAttribute('id',result);
        li.setAttribute("onclick",`addPaperToProject(${result},${currentTabUrl})`);
        li.appendChild(document.createTextNode(result)); //addbutton with onclick, when clicked url will be added to project
        ul.appendChild(li);
        
    });
}

function addPaperToProject(projectName, paperUrl){
    //send message to server with url of paper with project name
    if(projectName!="Unsorted")
    {
        document.getElementById("Collaborator").style.display = 'block';
    }
}