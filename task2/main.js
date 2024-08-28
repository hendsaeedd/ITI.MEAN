// alert('Welcome to my site')

// var userName = prompt('Please enter your name:')

// if (userName) {
//   document.write('<h1>Welcome ' + userName + '!</h1>')
// } else {
//   document.write('<h1>Welcome!</h1>')
// }

///////////////
function sum(a, b) {
  return a + b
}

console.log(sum(3, 5))

//////////////////
function temp(temperature) {
  const x = temperature >= 30 ? 'hot' : 'cold'
  console.log(x)
}
temp(30)

/////////////////

function odd(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 !== 0) {
      console.log(i)
    }
  }
}
odd(1,20)
