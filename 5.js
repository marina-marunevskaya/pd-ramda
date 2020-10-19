// Thinking in Ramda: Immutability and Objects
(() => {
	console.log('Thinking in Ramda: Immutability and Objects');

	const ROLE_ADMIN = 'ROLE_ADMIN';
	const ROLE_MANAGER = 'ROLE_MANAGER';
	const ROLE_DEVELOPER = 'ROLE_DEVELOPER';

	// prop
	const isAdmin = R.pipe(
		R.prop('role'),
		R.equals(ROLE_ADMIN)
	);
	const isActive = R.prop('active');
	const isOver5 = R.pipe(
		R.prop('experience'),
		R.gte(
			R.__,
			5
		)
	);

	const users = [
		{
			active: true,
			experience: 3,
			name: 'Steve Miles',
			position: 'System Admin',
			role: ROLE_ADMIN,
			unit: {
				id: 3,
				name: 'Support Unit'
			}
		},
		{
			active: false,
			experience: 10,
			name: 'John Smith',
			position: 'Frontend Developer',
			role: ROLE_DEVELOPER,
			team: {
				id: 1,
				name: 'SkyDive Team'
			},
			unit: {
				id: 1,
				name: 'Development Unit'
			}
		},
		{
			active: true,
			experience: 7,
			name: 'Vicky Leaf',
			position: 'Project Manager',
			role: ROLE_MANAGER,
			team: {
				id: 1,
				name: 'SkyDive Team'
			},
			unit: {
				id: 2,
				name: 'Management Unit'
			}
		},
		{
			active: false,
			experience: 1,
			name: 'Jack Cat',
			position: 'Office Admin',
			role: ROLE_ADMIN,
			unit: {
				id: 4,
				name: 'Office Support Unit'
			}
		}
	];

	console.log('USERS');
	R.forEach(
		user => console.log(user),
		users
	);

	const admins = R.filter(
		isAdmin,
		users
	);

	console.log('ADMINS');
	R.forEach(
		({ name }) => console.log(name),
		admins
	);

	const activeUsers = R.filter(
		isActive,
		users
	);

	console.log('ACTIVE USERS');
	R.forEach(
		({ name }) => console.log(name),
		activeUsers
	);

	const workOver5Years = R.filter(
		isOver5,
		users
	);

	console.log('WORK OVER 5 YEARS');
	R.forEach(
		({ name }) => console.log(name),
		workOver5Years
	);

	// pick
	const getPortalInfo = R.pick(['name', 'position']);

	const portalInfo = R.map(
		getPortalInfo,
		users
	);

	console.log('PORTAL INFO');
	R.forEach(
		({ name, position }) => console.log(`${name} (${position})`),
		portalInfo
	);

	// has
	const isInTeam = R.has('team');

	const teamUsers = R.filter(
		isInTeam,
		users
	);

	console.log('TEAM USERS');
	R.forEach(
		({ name }) => console.log(name),
		teamUsers
	);

	// path
	const getUnitName = R.path(['unit', 'name']);

	const units = R.map(
		getUnitName,
		users
	);

	console.log('UNIT NAMES');
	R.forEach(
		name => console.log(name),
		units
	);

	// pathOr
	const getTeamName = R.pathOr(
		'Not a member of any team',
		['team', 'name']
	);

	const teams = R.map(
		getTeamName,
		users
	);

	console.log('TEAM NAMES');
	R.forEach(
		name => console.log(name),
		teams
	);

	const nextExperience = R.pipe(
		R.prop('experience'),
		R.inc
	);

	// assoc
	const celebrateNewYear = user => R.assoc(
		'newExperience',
		nextExperience(user),
		user
	);

	const usersOneYearLater = R.map(
		celebrateNewYear,
		users
	);

	console.log('USERS ONE YEAR LATER');
	R.forEach(
		({ name, experience, newExperience }) => console.log(`${name} (${experience} => ${newExperience})`),
		usersOneYearLater
	);

	// evolve
	const celebrateAnotherYear = R.evolve({
		experience: R.inc
	});

	const usersTwoYearsLater = R.map(
		celebrateAnotherYear,
		R.map(
			celebrateAnotherYear,
			users
		)
	);

	console.log('USERS TWO YEARS LATER');
	R.forEach(
		({ name, experience }) => console.log(`${name} (${experience})`),
		usersTwoYearsLater
	);
})();
