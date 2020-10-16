// Thinking in Ramda: Getting Started
(() => {
	class User {
		constructor(fullName, position, monthlyIncome) {
			this.fullName = fullName;
			this.position = position;
			this.monthlyIncome = monthlyIncome;
		}

		getFullName() {
			return this.fullName;
		}

		getPosition() {
			return this.position;
		}

		getMonthlyIncome() {
			return this.monthlyIncome;
		}

		printInfo() {
			console.log(`${this.fullName}, ${this.position}`);
			console.log('---');
		}
	}

	const users = [
		new User('Jackie Smith', 'Frontend Developer', 1200),
		new User('Mike Johnson', 'Project Manager', 1500),
		new User('Helen Wolfgang', 'PHP Backend Developer', 900),
		new User('Kate Swan', 'Designer', 2400),
		new User('Jack Cat', 'Business Analyst', 2500),
		new User('Jean Miles', 'React Frontend Developer', 800)
	];

	console.log('Thinking in Ramda: Getting Started');

	const printInfo = user => user.printInfo();

	console.log('USERS');

	// forEach
	R.forEach(
		printInfo,
		users
	);

	// map
	const userFullNames = R.map(
		user => user.getFullName(),
		users
	);

	console.log('USER FULL NAMES');
	console.log(userFullNames);

	const isDeveloper = user => user.getPosition().indexOf('Developer') !== -1;

	// filter
	const developers = R.filter(
		isDeveloper,
		users
	);

	console.log('DEVELOPERS');

	R.forEach(
		printInfo,
		developers
	);

	// reject
	const notDevelopers = R.reject(
		isDeveloper,
		users
	);

	console.log('NOT DEVELOPERS');

	R.forEach(
		printInfo,
		notDevelopers
	);

	// find
	const firstDeveloper = R.find(
		isDeveloper,
		users
	);

	if (firstDeveloper) {
		console.log('FIRST DEVELOPER');
		printInfo(firstDeveloper);
	}

	const add = (accumulator, user) => accumulator + user.getMonthlyIncome();

	// reduce
	const totalMonthlyIncome = R.reduce(
		add,
		0,
		users
	);

	console.log('TOTAL MONTHLY INCOME');
	console.log(totalMonthlyIncome);
})();

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
})();
