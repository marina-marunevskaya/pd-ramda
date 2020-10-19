// Thinking in Ramda: Combining Functions
(() => {
	console.log('Thinking in Ramda: Combining Functions');

	const books = [
		{
			name: 'Harry Potter and the Philosopher\'s Stone',
			price: 20,
			isPickOfWeek: true,
			isPickOfMonth: false,
			available: true
		},
		{
			name: 'The Foxhole Court',
			price: 15,
			isPickOfWeek: true,
			isPickOfMonth: true,
			available: false
		},
		{
			name: 'The Great Gatsby',
			price: 5,
			isPickOfWeek: false,
			isPickOfMonth: false,
			available: true
		},
		{
			name: 'The Last Wish',
			price: 25,
			isPickOfWeek: true,
			isPickOfMonth: true,
			available: true
		},
		{
			name: 'Mortal Engines',
			price: 23,
			isPickOfWeek: true,
			isPickOfMonth: false,
			available: false
		},
		{
			name: 'Vampire Academy',
			price: 17,
			isPickOfWeek: false,
			isPickOfMonth: true,
			available: true
		},
		{
			name: 'Stardust',
			price: 11,
			isPickOfWeek: false,
			isPickOfMonth: true,
			available: false
		},
		{
			name: 'The Phantom of the Opera',
			price: 4,
			isPickOfWeek: false,
			isPickOfMonth: false,
			available: false
		}
	];

	const printBookInfo = ({ name, price }) => console.log(`${name} ($${price})`);

	const isAvailable = book => book.available;
	const isPickOfWeek = book => book.isPickOfWeek;
	const isPickOfMonth =  book => book.isPickOfMonth;

	const availableBooks = R.filter(
		isAvailable,
		books
	);

	console.log('AVAILABLE BOOKS');
	R.forEach(
		printBookInfo,
		availableBooks
	);

	// complement
	const unavailableBooks = R.filter(
		R.complement(isAvailable),
		books
	);

	console.log('UNAVAILABLE BOOKS');
	R.forEach(
		printBookInfo,
		unavailableBooks
	);

	// both - or allPass
	const isExtremelyPopular = R.both(
		isPickOfWeek,
		isPickOfMonth
	);

	const extremelyPopularBooks = R.filter(
		isExtremelyPopular,
		books
	);

	console.log('EXTREMELY POPULAR BOOKS');
	R.forEach(
		printBookInfo,
		extremelyPopularBooks
	);

	// either - or anyPass
	const isPopular = R.either(
		isPickOfWeek,
		isPickOfMonth
	);

	const popularBooks = R.filter(
		isPopular,
		books
	);

	console.log('POPULAR BOOKS');
	R.forEach(
		printBookInfo,
		popularBooks
	);

	const isUnpopular = R.complement(isPopular);

	const unpopularBooks = R.filter(
		isUnpopular,
		books
	);

	console.log('UNPOPULAR BOOKS');
	R.forEach(
		printBookInfo,
		unpopularBooks
	);

	const createFilter = filter => books => R.filter(
		filter,
		books
	);

	const filterBooks = (filter, books) => createFilter(filter)(books);

	// pipe
	const filterAvailableBooks = R.pipe(
		filterBooks,
		createFilter(isAvailable)
	);

	const popularAvailableBooks = filterAvailableBooks(isPopular, books);

	console.log('POPULAR AVAILABLE BOOKS');
	R.forEach(
		printBookInfo,
		popularAvailableBooks
	);

	// compose
	const filterPopularBooks = R.compose(
		createFilter(isPopular),
		filterBooks
	);

	const availablePopularBooks = filterPopularBooks(isAvailable, books);

	console.log('AVAILABLE POPULAR BOOKS');
	R.forEach(
		printBookInfo,
		availablePopularBooks
	);

	const extremelyPopularUnavailableBooks = R.pipe(
		filterBooks,
		createFilter(
			R.complement(isAvailable)
		)
	)(isExtremelyPopular, books);

	console.log('EXTREMELY POPULAR UNAVAILABLE BOOKS');
	R.forEach(
		printBookInfo,
		extremelyPopularUnavailableBooks
	);
})();
