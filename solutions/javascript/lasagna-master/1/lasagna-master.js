/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

// Task 1
export function cookingStatus(timeRemaining) {
  switch(timeRemaining) {
    case 0:
      return 'Lasagna is done.';
      break;
    case undefined:
      return 'You forgot to set the timer.';
      break;
    default:
      return 'Not done, please wait.';
  }
}


// Task 2
export function preparationTime(layers, time) {
  if (time >= 0) {
    return layers.length * time;
  } else {
    return layers.length * 2;
  }  
}

// Task 3
export function quantities(layers) {
  const obj = {
    noodles: 0,
    sauce: 0
  }

  for (let i = 0; i <= layers.length; i++) {
    if (layers[i] == "noodles") {
      obj.noodles += 50;
    } else if (layers[i] == "sauce") {
      obj.sauce += 0.2;
    }
  }
  return obj;
}

// Task 4
export function addSecretIngredient(friendsList, myList) {
  myList.push(friendsList[friendsList.length - 1]);
}

// Task 5
export function scaleRecipe(recipe, portions) {
  let newRecipe = {}; // creates new object
  for (let key in recipe) {
    newRecipe[key] = recipe[key] * (portions/2); // divide by two, as the original recipe was already for two people
  }
  return newRecipe;
}