This project is the front-end part of FundIT: https://fundit.proj.kth.se/



# FUNDIT Front-end

## Overview

The project is build with Redux and D3.js. In order to work with the code, you need to have good knowledge of redux, like redux-router, redux-form, redux-thunk, HOC(higher order components). You might also need to know how D3.js works.

Firstly enter `/app` , then install all the dependencies:  `npm install` , then `npm start` to run the project, the port is 3000.

**If you have any questions, please contact yinglai@kth.se**

To access the vHost for fundit.proj.kth.se, you must first ask IT support for access, then connect it in KTH or via VPN: \\[cdn03.ug.kth.se](http://cdn03.ug.kth.se/)\cdnroot\csc\fundit

Or MAC/Linux :  smb://[cdn03.ug.kth.se/cdnroot/csc/fundit](http://cdn03.ug.kth.se/cdnroot/csc/fundit)



The code is structured as the typical Redux project with "components", "actions" and "reducers".

## Components

You may notice there are two folders called "components" and "containers". The files in these two folders are used to render the html page. All the files that use D3 start with d3-*. 

> There is a saying that any component that uses actions should be upgraded as a container, I followed the rule first, then as the project grew, I may missed up with two folders, so please don't care the naming too much.

## Action

There is only one file under `/action` named `index.js`. There is the place to control and manipulate the data. 

## Reducers

