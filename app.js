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
