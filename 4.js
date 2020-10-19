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
