// Thinking in Ramda: Immutability and Arrays
(() => {
	console.log('Thinking in Ramda: Immutability and Arrays');

	// reading array elements
	const codes = [
		'123',
		'745',
		'689',
		'999',
		'145',
		'379',
		'000',
		'658'
	];

	console.log(`Codes: ${codes}`);

	// nth
	console.log(`codes[4] = ${R.nth(4, codes)}`);

	// slice
	console.log(`codes[2-4] = ${R.slice(2, 5, codes)}`); // codes[5] is not included

	// contains
	console.log(`Has code '124'? ${R.contains('124', codes) ? 'Yes': 'No'}.`);
	console.log(`Has code '745'? ${R.contains('745', codes) ? 'Yes': 'No'}.`);

	// head
	console.log(`The oldest code: ${R.head(codes)}.`);

	// tail
	console.log(`Newer codes: ${R.tail(codes)}.`);

	// last
	console.log(`The latest code: ${R.last(codes)}.`);

	// init
	console.log(`Older codes: ${R.init(codes)}.`);

	// take
	console.log(`Three oldest codes: ${R.take(3, codes)}.`);

	// takeLast 
	console.log(`Three newest codes: ${R.takeLast(3, codes)}.`);

	// adding, updating and removing array elements
	// insert
	const codesWithNewCode = R.insert(
		4,
		'359',
		codes
	);

	console.log(`Codes: ${codesWithNewCode}`);

	// append
	const appendedCodes = R.append(
		'756',
		codesWithNewCode
	);

	console.log(`Codes: ${appendedCodes}`);

	// prepend
	const prependedCodes = R.prepend(
		'842',
		appendedCodes
	);

	console.log(`Codes: ${prependedCodes}`);

	// update
	const updatedCodes = R.update(
		4,
		'934',
		prependedCodes
	);

	console.log(`Codes: ${updatedCodes}`);

	// concat
	const concatenatedCodes = R.concat(
		updatedCodes,
		[
			'736',
			'498',
			'359'
		]
	);

	console.log(`Codes: ${concatenatedCodes}`);

	// remove
	const removedCodes = R.remove(4, 2, concatenatedCodes);

	console.log(`Codes: ${removedCodes}`);

	// without
	const withoutCodes = R.without(
		['000', '689'],
		removedCodes
	);

	console.log(`Codes: ${withoutCodes}`);

	// drop
	const droppedCodes = R.drop(
		1,
		withoutCodes
	);

	console.log(`Codes: ${droppedCodes}`);

	// dropLast
	const droppedLastCodes = R.dropLast(
		1,
		droppedCodes
	);

	console.log(`Codes: ${droppedLastCodes}`);

	// transforming elements
	const adjustedCodes = R.adjust(
		2,
		code => `${code}-${code}`,
		droppedLastCodes
	);

	console.log(`Codes: ${adjustedCodes}`);
})();
