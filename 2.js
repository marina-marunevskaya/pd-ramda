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
