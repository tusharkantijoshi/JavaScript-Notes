/* 
! How JavaScript Works & Execution Context
? First core fundamental is: "Everything in JavaScript happens inside the Execution Context"
* You can assume this execution context to be a big box or a container in which whole JavaScript code is executed and it has two components in it.
* The first component is also known as the memory component where all the variables and functions are stored as key-value pairs memory component and this memory component is also known as Variable environment
* The second component of this execution context is the code component. This is the place where code is executed one line at a time, it is also known as Thread of execution. So this Thread of execution is like a thread in which the whole code is executed one line at a time.
* JavaScript is a synchronous single-threaded language that means JavaScript can only execute one command at a time and in a specific order. So that means that it can only go to the next line once the current line has been finished executing.
* So when you run a JavaScript program an execution context is created.
*/

var n = 2;
function square(num) { // num is the parameter 
   var ans = num * num;
   return num;
}
var s2 = square(n); // n is the argument 
var s4 = square(4);

/* 
* Phase 1: (memory component phase) JS will scroll over the entire code line by line and allocate memory for variables and functions 

memory component           code component
------------------        ----------------
n: undefined
square: {whole code}
s2: undefined
s4: undefined

* Phase 2: (code component phase) JS will again scroll over the entire code line by line and execute it

memory component           code component
------------------        ----------------
n: 2

* Functions are the heart of JavaScript and they behave very differently in JavaScript than any other language. Functions are like a mini program and whenever a new function is invoked a new execution context is created. The whole program was inside the global execution context but now when you invoke a function a brand new execution context is created inside the global execution context. 

square: {whole code}       Phase 1 for square function       
                           memory component           code component
                           ------------------        ----------------
                           num: undefined
                           ans: undefined

                           Phase 2 for square function       
                           memory component           code component
                           ------------------        ----------------
                           num: 2                     num * num = 2 * 2
                           ans: 4
                                                      return ans

* Once the function is executed the whole execution context for that function will be completely deleted.

s2: 4
s4: 16                     again a new execution context is created, phase 1 and phase 2 for square as s4 arguments
*/

/*  
! Note: Important
* the whole code is allocated only works for functions if you are using function keyword to create function
* In case of arrow function it stores undefined

function fun(params) { }; //* whole code

fun = () => { }; //* undefined

var fun = function (params) { }; //* undefined

*/

/* 
! Call Stack
* All this is too much to manage for the JS engine, Execution context is created one by one, inside one and suppose if there was a function invocation inside the function then JS would have created an execution context inside an execution context over here and it can go to any deep level right? but JS does it very beautifully. It handles everything to manage this execution context creation, deletion, and the control It manages a stack. This is known as the call stack.

* In the bottom of the stack we have our global execution context
* Whenever a new execution context is created it is pushed in the stack above global execution context
* Once we are done with executing the function, we return the ans, So what happened, now the function is popped out of the stack, and the control goes back to the global execution context, where it left.

* So this call stack is only for managing these Execution contexts. Whenever an Execution context is created, it is pushed into the stack and whenever an Execution context is deleted, it will pop out of the stack. After this whole thing is executed, the call stack gets empty.
*/

/* 
! Hoisting in JavaScript (variables & functions)
* In JavaScript a variable and functions can be used before it has been declared.
*/

console.log(getName()); // Output: the whole function
getName(); // Output: Tusharkanti
console.log(x); // Output: undefined

var x = 7;
function getName() {
   console.log('Tusharkanti');
}

console.log(getName()); // Output: the whole function
getName(); // Output: Tusharkanti
console.log(x); // Output: 7

/* 
* This happens because in the Phase 1: (memory component phase) JS will scroll over the entire code line by line and allocate memory for variables and functions with values as of variables as undefined and function with the whole code.
*/

/* 
! Window Object and this keyword
* window is like a big object with a lot of functions and methods created by JS engine into the global execution context, you can access all these variables and functions anywhere in your JS program.

* And just like this window object JS engine also creates a this keyword and in the global level this points to the window object.

? When a JS program is run three things are created by JS engine:
* 1. A global execution context
* 2. A global object (in case of browser: window, NodeJS: global) 
* 3. A 'this' variable

! What is global space ?
* Any variable or function which is not inside any other function are considered in the global space

let a = 10; // a is in the global space
function name(params) { // name is in the global space
   let b = 10; // b is not in the global space
}

* if I log: (window.a) = (this.a) = (a), output will be 10, all are the same thing, all are referring to the same place in the memory space
* But if i log b it will be an error

* Whenever you create any variables or functions in the global space it gets attached to that global object.
*/

/* 
! Scope, Scope Chain & Lexical Environment
* Scope is directly proportional to Lexical Environment
* Scope determines the accessibility of variables.
*/

var num1 = 10; // here num1 is in global scope
function name() {
   var num2 = 10; // here num2 is in name's local scope
}
//* we can access num1 from any where, but we can only access num2 inside name function

/* 
! Lexical Environment
* When ever an execution context is created a lexical environment is also created. lexical environment is the local memory along with the reference of its parent's lexical environment.
* We know in Phase 1: (memory component phase) JS allocate memory for variables and functions, here js also gives us a reference to the lexical environment of it's parent. So in global level it points to null because global doesn't have any parent. 
*/

function a() {
   function b() { }
}

//* b is lexically inside a and a is lexically inside the global scope

/* 
! Scope chain
* Scope chain is all the chain of lexical environment and it's parent references. 
* Whenever our JS tries to access a variable during the function call, it starts the searching from local scope (inside the function body). And if the variable is not found, it’ll continue searching in its parent functions's scope until it reaches the global scope and completes searching. Searching for any variable happens in the scope chain. If the variable is not found in the global scope as well, a reference error is thrown.  
*/

function a() {
   function b() {
      function c() {

      }
   }
}
/* 
* c have it's local scope along with b's local, a's local and global's scope 
 
* b have it's local scope along with a's local and global's scope 

* a have it's local scope along with global's scope 
*/

/* 
! let & const and Temporal Dead Zone and var
* when we are using var, it is stored in the global object but when we are using let and const they are not stored in global object

! Temporal Dead Zone
* Before ES6 there was no other way to declare variables other than var. But ES6 brought us let and const. let and const declarations are both block-scoped, which means they are only accessible within the { } surrounding them. var, on the other hand, doesn't have this restriction. 
* TDZ is the term to describe the state where variables are un-reachable. They are in scope, but they aren't declared. The let and const variables exist in the TDZ from the start of their enclosing scope until they are declared. 
let age; // Declaring 
age = 20; // Initializing 

! Reference Error
* when ever we try to access a variable which is inside TDZ we get a reference error
*/

console.log(num1); // output: error, cannot access num1 before initialization 

console.log(num2); // output: undefined 

console.log(num3); // output: error, num3 not defined 

let num1 = 10;
var num2 = 10;

console.log(num1); // output: 10 //* we can cannot access num1 by window.num1 or this.num1 bcz when we use let and const they are not stored in global object

console.log(num2); // output: 10 //* we can also access num2 by window.num2 or this.num2 bcz when we use var, it is stored in the global object

/* 
! Strictness of let 
* Reference Error: when ever we try to access a variable which is inside TDZ we get a reference error
e.g. 1:
console.log(num1); // output: ReferenceError: cannot access num1 before initialization 
let num1 = 10;

e.g. 2:
console.log(a); // output: ReferenceError: a is not defined 

* Syntax Error: we cannot re declare a variable
let a = 10;
let a = 12; // output: SyntaxError identifier a has already been declared

// correct
let a = 10;
a = 20; 

! Strictness of const
* Syntax Error: we cannot declare and initialize a variable in different lines
const a;
a = 10; // output: SyntaxError: missing initializer in const declaration

const a = 10; // correct

* Type Error: we cannot change the data once declared
const a = 10;
a = 100; or a = 'abcd' // output: TypeError: assignment to constant variable

*/

/* 
! BLOCK SCOPE & Shadowing

! Block
* The block statement is often called compound statement. It allows you to use multiple statements where JavaScript expects only one statement. 

// syntax
{
... multiple statements
}

! Block Scope
* variables and functions we can access inside the block
* let and const are block scope, means we can not access them, outside of the block. If we are trying to access let and const from out side of the scope then it will JS will throw (ReferenceError: not defined)
*/

{
   var n1 = 10; //* n1 will be hosted in global scope
   let n2 = 10; //* n2 will be hosted in block scope
   const n3 = 10; //* n3 will be hosted in block scope
}

/*
! Shadowing
* If a variable is in both global and block scope then the variable which is in block scope will shadow the global scope variable
* in case of var it will shadow and change the global scoped value but in let and const it will just shadow but not change the global scoped value
*/

var n1 = 100;
let n2 = 100;
console.log(n1); // output: 100
console.log(n2); // output: 100

// Block
{
   var n1 = 10; //* n1 will be hosted in global scope
   let n2 = 10; //* n2 will be hosted in block scope
   console.log(n1); // output: 10, shadowed 
   console.log(n2); // output: 10, shadowed
}

console.log(n1); // output: 10, shadowed and change the global scoped value value
console.log(n2); // output: 100, shadowed and but not changed the global scoped value

/*
! Illegal Shadowing
* We cannot shadow let and const using var

? SyntaxError
let a = 10;
{
   var a = 10;
}

* but we can use function block to shadow let and const
? no error
let a = 10;
function fun() {
   var a = 10;
}

*/

/* 
* We can shadow var using let

? no error
var a = 10;
{
   let a = 10;
}
*/

/* 
! Note:
* whether you declare a function with function keyword or an arrow function all these scope rules are exactly same.
*/

/* 
! Closures in JS
* A closure is the combination of a function bundled together with references to its lexical environment. A function along with it lexical scope is a closure
*/

function fun1() {
   var name = 'name'; // name is a local scope of fun1
   function fun2() { // fun2 is inside fun1, fun2 is a closure
      console.log(name);
   }
   fun2(); // output: name
}
fun1(); // output: name

/* 
! Functions in JS is very Beautiful
* we can assign function to a variable
* we can return a function
* we can use function as another function's parameter

function fun1() {
   var num = 10;

   //* we can assign function to a variable
   var fun = function fun2() {
      console.log(num);
   }

   //* we can return a function
   return fun;
}

//* we can use function as another function's parameter
fun1(function fun2() {
   // body
}); 

*/

function fun1() {
   var num = 10;
   function fun2() {
      console.log(num);
   } //* fun2 ends
   return fun2;
}

var fun = fun1();
console.log(fun); // output: the entire fun2 code
fun(); // output: 10

/*
! Note:
* we know when the function is over it's execution context and lexical scope is deleted but when they are returned from another function they still maintains their lexical scope bcz when a function is returned it's not just that function but that whole closure along with its lexical scope is returned.
*/

//! Corner Case
function fun1() {
   var num = 10;
   function fun2() {
      console.log(num);
   }
   num = 100; //* we changed the num
   return fun2;
}

var fun = fun1();
console.log(fun);
fun(); //* output: 100, bcz it will store the reference not the value


//* Nested Function
function fun() {
   var num = 10;
   function fun1() { // fun1 is a closure
      var num1 = 100;
      function fun2() { // fun2 is a closure
         console.log(num, num1);
      }
      fun2();
   }
   fun1();
}
fun();

/* 

* If i would have returned fun2() so it would have retained these these memory locations of num and num1, would not have been garbage collected. Bcz we know a function is returned from another function they still maintains their lexical scope. 

? Summary
* lexical environment/ scope is the local memory along with the reference of its parent's lexical environment.
* lexical scope has all the variables and functions
*/

/* 
! 13. FIRST CLASS FUNCTIONS
* So during the hosting phase, function statement creates a memory and this function is assigned to it but in case of a function expression this it is treated like any other variable it is assigned undefined
*/
//! Function Statement/ Declaration  
function fun1(params) {

}

//! Function Expression
var fun2 = function (params) {

}

/*
* Anonymous functions are used when the functions are used as values
*/
//! Anonymous Functions
/*
function (params) {

}
 */
//* but this will be error because we cannot use function without a name but we can use it with Function Expression.

var b = function (params) {

}

b(); //* correct

//! Named Function Expression
var fun2 = function name(params) {
   name(); //* correct because it is created as a local variable. so we can access it inside the function body
}

fun2(); //* correct
name(); //* wrong, reference error name is not defined

/*
* name function is used as a value so in this case this name function is not created in the outer scope/ global scope but it is created as a local variable.
*/

//! Parameters and Arguments
/* 
* The values which we pass inside a function are known as arguments and these label and identifier which gets those values are known as parameters
*/
function fun(params1, params2) {

}

fun(args1, args2);

//! First class function

/* 
* Functions passed inside another functions as an arguments are treated as values e.g. anonymous function and you can even receive that function in the parameters. We can even return a function from a function

! what is First class function
? The ability of functions 
* 1. to be used as values OR
* 2. to be used as an argument to another functions OR
* 3. to be returned from the functions is known as first class functions/ first class citizens

*/