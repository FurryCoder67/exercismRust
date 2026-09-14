function filter<T>(list: T[], fn: Function, val: boolean): T[] {
	let newList = []
	for(let i = 0; i < list.length; i++) {
		if(fn(list[i]) === val) {
			newList.push(list[i])			
		}
	}
	return newList
}

function keep<T>(list: T[], fn: Function): T[] {
	return filter(list, fn, true)
}

function discard<T>(list: T[], fn: Function): T[] {
	return filter(list, fn, false)
}

export { keep, discard }