
function getInvCount (arr) {
  let invCount = 0;
  for (let i=0;i<arr.length-1; i++) {
    for (let j = i+1;j< arr.length; j++) {
      if(arr[j].value && arr[i].value && arr[i].value>arr[j].value) {
        invCount ++
      }
    }
  }
  return invCount
}

function getEmptyPos (arr) {
  for (let i = 0; i<Math.sqrt(arr.length); i++) {
    let rowArr = arr.slice(Math.sqrt(arr.length) * i, Math.sqrt(arr.length) * (i+1))
    for (let j = 0; j<rowArr.length; j++) {
      if (rowArr[j].value === false) {
        return i+1
      }
    }
  }
}

export function isSolvable(arr) {
  let invCount = getInvCount(arr)
  let emptyPos = getEmptyPos(arr)
  if (Math.sqrt(arr.length) % 2 != 0) {
    if (invCount % 2 === 0) {
      return true
    }
    else {
      return false
    }
  }
  else {
    if (emptyPos % 2 != 0) {
      if (invCount % 2 != 0) {
        return true
      }
      else {return false}
    }
    else {
      if (invCount % 2 === 0) {
        return true
      }
      else {
        return false
      }
    }
  }
}

