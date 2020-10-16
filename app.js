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

// Thinking in Ramda: Partial Application
(() => {
	console.log('Thinking in Ramda: Partial Application');

	const projects = [
		{
			name: 'Light Studio',
			launchYear: 2018,
			active: true,
			stage: 'in production',
			stars: 5,
			customer: 'Light Studio'
		},
		{
			name: 'Coffeemate',
			launchYear: 2020,
			active: true,
			stage: 'in development',
			stars: 4,
			customer: 'Light Studio'
		},
		{
			name: 'Yoga Travel',
			launchYear: 2015,
			active: false,
			stage: 'archived',
			stars: 1,
			customer: 'Yoga Travel Community'
		},
		{
			name: 'Speak & Travel',
			launchYear: 2019,
			active: false,
			stage: 'on hold',
			stars: 4,
			customer: 'Speak & Travel'
		},
		{
			name: 'Bookbuddy',
			launchYear: 2013,
			active: true,
			stage: 'in production',
			stars: 5,
			customer: 'Speak & Travel'
		},
		{
			name: 'Musicmate',
			launchYear: 2018,
			active: true,
			stage: 'in production',
			stars: 4,
			customer: 'Musicmate'
		},
		{
			name: 'Filmmate',
			launchYear: 2016,
			active: false,
			stage: 'archived',
			stars: 2,
			customer:' Musicmate'
		}
	];

	console.log(projects);

	const launchedOnAfterYear = (project, year) => project.launchYear >= year;

	// partialRight
	const namesForYear = (projects, year) => {
		const filteredProjects = R.filter(
			R.partialRight(launchedOnAfterYear, [year]),
			projects
		);

		return R.map(
			project => project.name,
			filteredProjects
		);
	};

	const launchedOnAfter2016 = namesForYear(projects, 2016);

	console.log('PROJECTS LAUNCHED IN OR AFTER 2016');
	console.log(launchedOnAfter2016);

	// curry
	const launchedOnAfterYearWithCurry = R.curry(
		(year, project) => project.launchYear >= year
	);

	const namesForYearWithCurry = (projects, year) => {
		const filteredProjects = R.filter(
			launchedOnAfterYearWithCurry(year),
			projects
		);

		return R.map(
			project => project.name,
			filteredProjects
		);
	};

	const launchedOnAfter2013 = namesForYearWithCurry(projects, 2013);

	console.log('PROJECTS LAUNCHED IN OR AFTER 2013');
	console.log(launchedOnAfter2013);

	const activeMatch = R.curry(
		(project, active) => project.active === active
	);

	// flip
	const namesForActiveStatus = (projects, active) => {
		const filteredProjects = R.filter(
			R.flip(activeMatch)(active),
			projects
		);

		return R.map(
			project => project.name,
			filteredProjects
		);
	};

	const activeProjects = namesForActiveStatus(projects, true);

	console.log('ACTIVE PROJECTS');
	console.log(activeProjects);

	const inactiveProjects = namesForActiveStatus(projects, false);

	console.log('INACTIVE PROJECTS');
	console.log(inactiveProjects);

	const stageMatch = R.curry(
		(project, stage) => project.stage === stage
	);

	const namesForStage = (projects, stage) => {
		const filteredProjects = R.filter(
			stageMatch(R.__, stage),
			projects
		);

		return R.map(
			project => project.name,
			filteredProjects
		);
	};

	const inProductionProjects = namesForStage(projects, 'in production');

	console.log('PROJECTS IN PRODUCTION');
	console.log(inProductionProjects);

	const archivedProjects = namesForStage(projects, 'archived');

	console.log('ARCHIVED PROJECTS');
	console.log(archivedProjects);

	const starsMatch = R.curry(
		(stars, project) => project.stars === stars
	);

	const namesForStars = (projects, stars) => R.pipe(
		R.filter(
			starsMatch(stars)
		),
		R.map(
			project => project.name
		)
	)(projects);

	const bestProjects = namesForStars(projects, 5);

	console.log('BEST PROJECTS');
	console.log(bestProjects);

	const worstProjects = namesForStars(projects, 1);

	console.log('WORST PROJECTS');
	console.log(worstProjects);

	const customerMatch = R.curry(
		(customer, project) => project.customer === customer
	);

	const namesForCustomer = R.curry(
		(customer, projects) => R.pipe(
			R.filter(
				customerMatch(customer)
			),
			R.map(
				project => project.name
			)
		)(projects)
	);

	const lightStudioProjects = namesForCustomer('Light Studio', projects);

	console.log('LIGHT STUDIO PROJECTS');
	console.log(lightStudioProjects);
})();

// Thinking in Ramda: Declarative Programming
(() => {
	console.log('Thinking in Ramda: Declarative Programming');

	// arithmetic
	const square = value => R.multiply(value, value);

	const calculateCost = R.pipe(
		R.multiply,
		R.add(1),
		square
	);

	console.log('COST');
	console.log(calculateCost(14, 2));

	const calculatePrice = R.pipe(
		R.multiply,
		R.inc,
		R.inc,
		square
	);

	console.log('PRICE');
	console.log(calculatePrice(14, 2));

	// comparison

	const ROLE_ADMIN = 'Admin';
	const LEVEL_MANAGER = 2;

	const isAdmin = user => R.equals(user.role, ROLE_ADMIN);

	const isManager = user => R.gte(user.level, LEVEL_MANAGER);

	const printInfo = ({ name }) => console.log(`${name}`);

	const users = [
		{
			name: 'Steve Paulson',
			role: ROLE_ADMIN,
			level: 1
		},
		{
			name: 'Marcy Smith',
			role: 'Project Manager',
			level: LEVEL_MANAGER
		},
		{
			name: 'Vicky Miles',
			role: 'Office Manager',
			level: LEVEL_MANAGER
		}
	];

	console.log(users);

	const admins = R.filter(
		isAdmin,
		users
	);

	console.log('ADMINS');
	R.forEach(
		printInfo,
		admins
	);

	const managers = R.filter(
		isManager,
		users
	);

	console.log('MANAGERS');
	R.forEach(
		printInfo,
		managers
	);

	// logic
	const user = {
		age: 27,
		name: 'Andrew Mathias',
		role: 'Software Developer'
	};

	const accessLevel = R.defaultTo(
		0,
		user.level
	);

	console.log('ACCESS LEVEL');
	console.log(accessLevel);

	// conditionals
	// ifElse
	const forever18 = age => R.ifElse(
		R.gte(
			R.__,
			18
		),
		() => 18,
		R.inc
	)(age);

	const userAge = forever18(user.age);

	console.log('USER AGE');
	console.log(userAge);

	// constants
	const forever5 = age => R.ifElse(
		R.gte(
			R.__,
			5
		),
		R.always(5),
		R.inc
	)(age);

	const note = forever5(10);

	console.log('NOTE');
	console.log(note);

	const alwaysPassingGrade = grade => R.ifElse(
		R.lt(R.__, 3),
		R.always(3),
		R.identity
	)(grade);

	const grade = alwaysPassingGrade(2);

	console.log('GRADE');
	console.log(grade);

	const alwaysCheap = price => R.when(
		R.gte(
			R.__,
			100
		),
		R.multiply(0.8)
	)(price);

	const price = alwaysCheap(120);

	console.log('PRICE');
	console.log(price);

	const alwaysPremium = mode => R.unless(
		R.gte(
			R.__,
			2
		),
		R.always(2)
	)(mode);

	const mode = alwaysPremium(1);

	console.log('MODE');
	console.log(mode);

	// cond
	const ROLE_DEVELOPER = 'developer';

	const ROLE_MANAGER = 'manager';

	const message = role => R.cond([
		[
			R.equals(ROLE_DEVELOPER),
			R.always('Welcome to the dev unit!')
		],
		[
			R.equals(ROLE_MANAGER),
			R.always('Welcome to the manager unit!')
		],
		[
			R.T,
			role => `Role "${role}" is unknown! Please contact your manager if you think it is an error.`
		]
	])(role);

	const devMessage = message(ROLE_DEVELOPER);
	const managerMessage = message(ROLE_MANAGER);
	const errorMessage = message('stranger');

	console.log('MESSAGES');
	console.log(`DEVELOPER: ${devMessage}`);
	console.log(`MANAGER: ${managerMessage}`);
	console.log(`ERROR: ${errorMessage}`);
})();

// Thinking in Ramda: Pointfree Style
(() => {
	console.log('Thinking in Ramda: Pointfree Style');

	const forever21 = R.ifElse(
		R.gte(
			R.__,
			21
		),
		R.always(21),
		R.inc
	);

	const newAge = forever21(36);

	console.log('NEW AGE');
	console.log(newAge);

	// multi-argument functions
	const statusMatch = R.curry(
		(status, project) => project.status === status
	);

	const namesForStatus = status => R.pipe(
		R.filter(
			statusMatch(status)
		),
		R.map(
			project => project.name
		)
	);

	const projects = [
		{
			name: 'SkyDrive',
			status: 'archived'
		},
		{
			name: 'SkyDrive 2.0',
			status: 'in development'
		}
	];

	const archivedProjects = namesForStatus('archived')(projects);
	
	console.log('ARCHIVED PROJECTS');
	console.log(archivedProjects);

	const isAdmin = user => user.isAdmin;
	const isManager = user => user.isManager;

	const hasAccess = R.either(
		isAdmin,
		isManager
	);

	const manager = {
		name: 'Steve Smithson',
		isAdmin: false,
		isManager: true
	};

	const canAccess = hasAccess(manager);

	console.log(`CAN ACCESS: ${canAccess ? 'yes' : 'no'}`)
})();
