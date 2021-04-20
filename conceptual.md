# Conceptual Exercise

Answer the following questions below in Markdown.
Check out the
[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## CSS

### What are differences between ``display: inline`` and ``display: block``?
An element with a display property of 'inline' only takes up as much width as its content requires. Left and right margins can set it off from its neighbor, and the padding can be changed, but height and width properties are ignored. If the next element is also 'inline', it will be placed side-by-side on the screen. A 'display: block' element will take up the whole width of the parent, generating a new line above and below it so the next element will be placed below it. Width can be set to a different value.

### What are some advantages to using a CSS framework like Twitter Bootstrap?
CSS frameworks make designing a website much easier by providing predefined CSS classes and other properties. Its 12-column system makes column layouts easy and makes it easy to design sites that are responsive to different sized screens. It takes care of cross-browser support so your site will have a consisent look in different browsers. Bootstrap also includes interactive components such as carousels and dropdowns so you don't have to build them from scratch. All of the abstraction allows the code to have a 'declarative' style. By providing such a reliable CSS standard, it can make it easier for a companies or developers to trust that new team members will know how to work with a codebase.

---

## jQuery

### What is jQuery?
jQuery is an extremely popular javascript library that greatly simplifies traversing and manipulating the DOM, adding event listeners, animating elements, and using AJAX. It provides a simple syntax to chain together multiple functions so code is easier to write and read, while still being shorter than using plain javascript.

### What are differences between finding things with
`document.querySelector(".book")` and `$(".book")`?
The jQuery version here acts like querySelectorAll(), selecting all the elements with that class, but querySelector only selects the first one.

---

## Advanced JavaScript

### What is event delegation? Why would you use it?
Event delegation is when you put an event listener on a parent element (like an ordered list), even though you know the events will be happening on its children (like list items). You can still take action based on which child received the event by using the event target, but with event delegation you only have to create one listener, and if you dynamically change the number of children, they will automatically be able to receive the events without needing their own event listener.

### What is the `event` object? What kinds of things are in it?
The 'event' object is an object created by an event listener that is automatially passed to event handler functions to provide various useful pieces of information, including a information about the target element where the event happened (and its parents and children), the exact location on the screen where the event happened, and a timestamp of when it happened, among hundreds of other properties.

### In the Hack or Snooze API project, what did we use async/await for?
We used the async and await keywords when creating and calling asynchronous functions that made axios requests to the hack-or-snooze api. We used 'await in those functions (and when calling them) so that the function would wait for the actual data from the api instead of just taking the promise and moving on.

### What happens if you forget the `async` keyword on  the declaration of a function that uses `await` inside of it?
You would get a syntax error. The await keyword can only be used in functions with the async keyword in its declaration.

### What happens if you forget the `await` keyword in front of an asynchronous expression?
The function would not pause and wait for that expression to have its promise resolved, it would just return the promise.

### What is the difference between a static method and an instance method?
A static method is called on the class itself, and an instance method is called on an instance of the method. Object.keys(objectName) is a static method, as you can see from it being called on the class of Object (with capital 'O'). Static methods are often helper or utility functions.

### In JS: `let a = [1, 2, 3]; b = a.slice(); a.push(4);`: does `b` contain 4? Why or why not?
No. If slice() is not passed any arguments, it just returns a copy of the array. So b is not a reference to the same array as 'a'. 'b' is a whole new array. Pushing to 'a' doesn't affect 'b'.

### What are some strategies you've learned for being organized in larger projects, like Hack or Snooze?
I have learned that it pays off to take my time to get familiar with the code before trying to change it, including by mapping out the functions and files and how they relate to each other. I think its important to be able to explain why each function is in the file it's in, so you will know where to put things when you build them. I will try to organize code in a similar pattern to the Hack or Snooze starter code, with the classes in one file, a main file to start and run the code and declare global variables, and then files for each of the main sections or functionalities of the site. Also, separating functions that do DOM manipulation from functions that do back-end logic is helpful. And writing doc strings that fully explain what is happening in the functions and what parameters they take and what it returns is helpful when other people need to read your code, and helps make sure you know the purpose of the function and why it is where it is.

---

## How the Web Works and APIs

### What is a hostname?
A hostname is the part of a URL between the protocol and the resource (or port). googel.com, for example.

### What is an IP address?
An IP address is a unique address to find a computer on a network. It is either 4 numbers (0-255) separated by dots, or the newer "IPv6" scheme with 6 numbers separated by colons.

### What is a port?
A port is a communication endpoint, represented by a number associated with a particular service, such as HTTP (port 80), HTTPS (port 443), File Transfer Protocol data transfer (20), which allows the server to route the request to the appropriate place. The port number comes after the hostname and before the resource in a URL, but it is usually hidden.

### What is DNS?
DNS stands for Domain Name System. It is a naming system that associates hostnames (domain names) with IP addresses. DNS servers receive a request for a website with a hostname and return the IP address for that hostname.

### What is an HTTP header?
An HTTP header is an addional piece of information added to a HTTP request or response. A request might include headers about the hostname to which the request is directed, the date and time of the request, the language the browser wants to read the response in, etc. A response might include headers about the Content Type, also the date and time, cookies, or caching information.

### What is an HTTP Response Code?
An HTTP response code is a 3 digit number that that comes with each HTTP response, which indicates how the request was recieved. A code in the 200s means the request was successful. A code in the 300s means the request needs to be redirected. A code in the 400s means there was a client error. A code in the 500s means the server failed to fulfill the request.

### What is the difference between GET and POST?
GET and POST are the most common request methods to use in HTTP requests. GET requests are used to request data from the server, and POST requests are used to send data to the server to update its database(s).

### What is AJAX? Why would you use it?
AJAX stands for Asychronous JavaScript And XML. AJAX is used to make HTTP requests (and receive responses) with javascript from within the browser, without refreshing the page. This makes for a far better user experience because the user can change smaller pieces of the website, like submitting form a form and getting an answer, without needing to reload the page, which can take longer than just updating one piece. AJAX is a technique and we have been using the axios library to make AJAX requests, but there are other ways.

### What is JSON?
JSON stands for JavaScript Object Notation. It is a way of formatting data in a string that looks like and can be easily converted to a javascript object. It is how APIs usually format information

### What is an API?
API stands for Application Programming Interface. As stated in lecture, an API is a set of clearly defined methods of communication between various components, meaning software that allows different applications to interact. For instance, Hack or Snooze has an API that set up communication endpoints that can receive HTTP requests of a certain type to interact with our websites, so different websites woule know how to make requests and updates to the Hack or Snooze server.

### What are some limitations of AJAX requests?
One limitation of AJAX requests is that because of the Same Origin Policy (define below), some sites simply can't access data on certain other sites. APIs can allow Cross-Origin Resource Sharing (CORS), but they might not. Other disadvantages of AJAX are that it's possible to overload the server or network with ongoing requests every few seconds and browsers with javascript disabled will not be able to use the AJAX feature.


### What is the Same Origin Policy?
The Same Origin Policy is a security measure in browsers that only allows scripts from websites to access data from another site if that second site has the same origin as the first, the 'origin' being the first 3 parts of the URL: protocol, hostname, and port. This prevents potential security threats posed by sites that might try to load information from another site, such as the login page for your bank account!
