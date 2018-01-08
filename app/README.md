This project is the front-end part of FundIT: https://fundit.proj.kth.se/



# FUNDIT Frontend Document

## Overview

The project is build with Redux and D3.js. In order to work with the code, you need to have good knowledge of redux, like redux-router, redux-form, redux-thunk, HOC(higher order components). You might also need to know how D3.js works.

Firstly enter `/app` , then install all the dependencies:  `npm install` , then `npm start` to run the project, the port is 3000.

**If you have any questions, please contact yinglai@kth.se**

To access the vHost for fundit.proj.kth.se, you must first ask IT support for access, then connect it in KTH or via VPN: \\[cdn03.ug.kth.se](http://cdn03.ug.kth.se/)\cdnroot\csc\fundit

Or MAC/Linux :  smb://[cdn03.ug.kth.se/cdnroot/csc/fundit](http://cdn03.ug.kth.se/cdnroot/csc/fundit)



The code is structured as the typical Redux project with "components", "actions" and "reducers".

## Components

You may notice there are two folders called "components" and "containers". The files in these two folders are used to render the html page. All the files that use D3 are prefixed with d3-*. 

> There is a saying that any component that uses actions should be upgraded as a container, I followed the rule first, then as the project grew, I may missed up with two folders, so please don't care the naming too much.

All the pages (tabs) are wrapped with Navigation and Footer component.

###Search Topics###

In Search Topics tab, I used the component SearchBar and TopicsList. Here are some key points to test if SearchBar works normally:

####SearchBar####

- [ ] Enter one word, like "information", either press enter or the submit button, a search request will send out to server.
- [ ] Use OR and NOT to link search words, then a search query will send out.
- [ ] Four checkboxes under "Search queries" are default checked.
- [ ] "Limit the search results" is default checked.
- [ ] Toggle any one of the checkbox will trigger the search action.
- [ ] Hover over each checkbox's label, the tooltips will show up.
- [ ] If the response from API is an empty string, the results will be "No results found…"
- [ ] If the response from API is not an empty string , a table will show up.

#### TopicsLIst####

- [ ] **Number of searched topics** should always be the number of topics from search API.
- [ ] **Number of filtered topics** should equal "Number of searched topics" first, and it should change to according number when using filter.
- [ ] **Table columns** have in total 7 checkboxes and they should always been displayed in order as: Pillar, Type of actions, Call title, Planned opening date, Budget history, Keywords, Tags.
- [ ] **Type of actions** and **Call title** are checked by default.
- [ ] When toggling checkboxes from **Table columns**, the topic list table should be update accordingly, show and hide column in a certain order.
- [ ] Hover over the label of checkboxes, there will be tooltips show up.
- [ ] **Topic Title**, **Call status** and **Deadline dates** are always been displayed, no checkboxes to control them.
- [ ] **Topic Title**: Topic titles are links to the H2020 topic page, when clicking one, an new window will be opened.
- [ ] **Call Status**: Call status is ordered by "open", "forthcoming" then "closed" by default, there is a sort arrow next to the column header to control the sorting.
- [ ] **Deadline Dates** and **Planned Opening Date**: No specific order for the deadline dates and planned opening date by default (I only sort the topics by call status by default). But the deadlines dates and planned opening date can be sorted by clicking arrows besides the column header.
- [ ] **Call Title**, **keywords** and **Tags** can be filtered by entering words to the input form. When filtering the topics, the **Number if filtered topics** should change accordingly.
- [ ] Click **Keywords** and **Tags** columns, the column will expand to show all the keywords and topics.
- [ ] When switching between different tabs, like between "search topics" and "keyword dictionary", the settings of "Table columns" won't lose. I used a reducer to store the setting. (However, if you refresh the page, the setting will lose, this is because I didn't use any cache or link params to remember the setting, takes some efforts to do but gets little out of it.)
- [ ] The table is paged every 10 column.



### Keyword Dictionary###

#### KeywordTreeSearch###

- [ ] The search bar handles multiple words, all the chosen words are displayed like tags.

- [ ] When choosing or selecting one word, the graph will change accordingly.

- [ ] Words can be deleted by clicking the delete X before each word, or deleted all by clicking the X on the right of the bar.

- [ ] The keywords are sorted in alphabet order by default.

      ​

#### KeywordTreeGraph####

The tree graph is implemented with D3.js, I inserted D3 code into React.

- [ ] Use mouse drag to move the graph.
- [ ] Use mouse scroll wheel to zoom in or out the graph.
- [ ] Double click the graph, the graph will back to the center.
- [ ] Click node to expand the graph.
- [ ] Click the label, then the page will jump to "search topics" and search the word.
- [ ] All the searched / chosen words will be marked with a red line and outline.
- [ ] Hover the labels, a tooltip will show up that includes the full name of the keyword, the topic and open topic's number.
- [ ] Click "download graph to png" to download the tree graph.
- [ ] Two ways to display the graph, the **default graph** shows the parent/children relation of the keywords (white node is a leaf, blue node is a node).
- [ ] The **colored graph** fills a node by a color that represents the number of topics of the keyword, the darker, the more topics.



### Signup, Login and Mypage###

- [ ] The user should be able to **Sign up**, **Sign in** and **Sign out** from the page.
- [ ] The user should be able to enter **My page** after sign in.
- [ ] In **My page**, the user can save maximum 3 queries.
- [ ] Every query is able to create, save, delete and update.



## Open source libraries and dependencies

All the dependencies are open sourced and under MIT licenses. Please read `package.json` for the detail information.

| Dependency                        | Version |
| --------------------------------- | ------- |
| Axios                             | 0.16.2  |
| D3                                | 4.9.1   |
| React                             | 15.6.1  |
| React-addons-css-transition-group | 15.6.0  |
| React-addons-transition-group     | 15.6.0  |
| React-bootstrap-table             | 4.0.2   |
| React-dom                         | 15.6.1  |
| React-redux                       | 5.0.5   |
| React-router                      | 4.1.1   |
| React-router-dom                  | 4.0.0   |
| React-select                      | 1.0.0   |
| React-tooltip                     | 3.4.0   |
| React-virtualized                 | 9.9.0   |
| Redux                             | 3.7.1   |
| Redux-form                        | 7.1.2   |
| Redux-logger                      | 3.0.6   |
| Redux-promise                     | 0.5.3   |
| Redux-thunk                       | 2.2.0   |
| Save-svg-as-png                   | 1.2.0   |
