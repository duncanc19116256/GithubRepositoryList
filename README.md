
This page has been deployed onto Heroku: 
https://githubrepositorylist.herokuapp.com/

## MAIN COMPONENTS EXPLAINED:
App.tsx maintains ./components/Header.tsx and routes the user to two different 
pages based on user actions:
- ./components/repoList.tsx
  This is the main page where user can lookup public repositories belonged to 
  an existing user. The list loads the first 10 repositories, and would load 
  another 10 (if exists) when the user scrolls to the bottom of the list. 
  Instead of octokit (which requires personal authentication token), this page 
  uses fetch to make requests from Github's REST API 
  (GET /users/{username}/repos). It makes a new request whenever the username
  field is changed, which creates a better user experience compared to making
  a request upon "enter" is clicked. However, with the high amount of API 
  request rate, Github would eventually returns a 403 error message. 

- ./components/repoDetails.tsx
  This page is displayed when user clicks on a speicifc repo from the list 
  shown in the main page. A fetch request to Github's REST API is also used 
  (GET /repos/{owner}/{repo}). The page shows the fullname, description, and 
  stargazers_count of that specific repo. The two buttoms allows user to open
  the Github page on a new tab or return to the list of repos respectively. 

## SPECIFICATION DISPLAYED IN THE HELP PAGE (./components/Help.tsx):

Use the search field to get a list of public repositories under an existing Github user. The list will only display 10 repositories max on first load. Once you scroll to the bottom, it will reload the next 10 repositories, and so on (until there are no more repositories).
If you see **No more repos to load**, that means the existing user has no other repositories to be loaded.

Click on "Name" to get more details about the specific repo.

Once you are routed to the page that displays the detail (repo fullname, description, and stargazers_count), you also have the option to return to the original list, or to open the github page in a new tab.


