let arr = [
  'js is hard to learn',
  'js is easy to learn',
  'js is the best language',
  'js is beauty',
]

function getRandom() {
  const x = Math.floor(Math.random() * arr.length)
  return arr[x]
}
console.log(getRandom())

////////////////////

function validateEmail(email) {
  const atIndex = email.indexOf('@')
  const atExists = atIndex !== -1
  const validPosition = atIndex > 0 && atIndex < email.length - 1

  return atExists && validPosition
}

// const userEmail = prompt('Please enter your email address:')

// if (validateEmail(userEmail)) {
//   alert('Your email is valid!')
// } else {
//   alert('Invalid email')
// }

///////////////////////

let array = [60, 100, 10, 15, 85]

array.sort((a, b) => b - a)

console.log('Sorted Grades (Descending):', array)

const highestGrade = array.find((grade) => grade <= 100)

console.log('Highest Grade:', highestGrade)

const belowSixtyGrades = array.filter((grade) => grade < 60)

console.log('Grades Below 60:', belowSixtyGrades)
