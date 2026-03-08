---
> # Answers to five questions
---

# 1️⃣ What is the difference between var, let, and const?
---

var, let, and const are used to declare variables in JavaScript.

| Keyword | Can Reassign | Can Redeclare | Scope |
|--------|--------------|---------------|-------|
| var    | Yes          | Yes           | Function scope |
| let    | Yes          | No            | Block scope |
| const  | No           | No            | Block scope |

**Example**
```js
var name = "Rahim";
var name = "Karim"; // allowed
```
```let age = 20;
age = 25; // allowed
```

```
const country = "Bangladesh";
country = "India"; // ❌ Error (cannot reassign)
```

---

# 2️⃣ What is the spread operator (...)?

The spread operator (...) is used to expand elements of an array or object.

**Array Example**

```const arr1 = [1,2,3];
const arr2 = [4,5,6];

const result = [...arr1, ...arr2];

console.log(result);
```
**Output:**
```
[1,2,3,4,5,6]
```


**Object Example**

```const user = {name: "Rahim"};

const newUser = {...user, age: 25};

console.log(newUser);
```
**Output:**

`{name: "Rahim", age: 25}`


---

# 3️⃣ What is the difference between map(), filter(), and forEach()?

These are array methods used for looping through arrays.

| Method   | Purpose                              |
|----------|--------------------------------------|
| map()    | Creates a new array                  |
| filter() | Selects elements based on a condition|
| forEach()| Executes a function for each element |

---

map() Example

```const numbers = [1,2,3];

const result = numbers.map(num => num * 2);

console.log(result);
```
**Output:**

`[2,4,6]`


---

**filter() Example**

```const numbers = [1,2,3,4];

const result = numbers.filter(num => num > 2);

console.log(result);
```


**Output:**

`[3,4]`


---

**forEach() Example**

```const numbers = [1,2,3];

numbers.forEach(num => {
 console.log(num);
});
```
**Output:**
```
1
2
3
```

---

# 4️⃣ What is an arrow function?

An arrow function is a shorter and modern way to write functions in JavaScript.

**Normal Function**

```function add(a,b){
 return a + b;
}
```
**Arrow Function**

`const add = (a,b) => a + b;`

***Another Example**

```const greet = name => "Hello " + name;

console.log(greet("Rahim"));
```


**Output:**

`Hello Rahim`

- Advantages

- Shorter syntax

- More readable

- Commonly used in modern JavaScript



---

# 5️⃣ What are template literals?

Template literals allow you to insert variables inside strings easily.

They use backticks ( ) instead of quotes.

**Old Way**

`const name = "Rahim";`

`console.log("My name is " + name);`

**Template Literal**

```const name = "Rahim";

console.log(`My name is ${name}`);
```
**Output:**

`My name is Rahim`

**Multi-line String Example**
```
const text = `
Hello
How are you?
`;

console.log(text);
```

---
