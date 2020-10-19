// Thinking in Ramda: Lenses
(() => {
	console.log('Thinking in Ramda: Lenses');

	// lens, lensProp, lensPath, lensIndex

	const user = {
		email:'user@users.com' ,
		login: 'user',
		password: '123456',
		team: {
			id: 125
		}
	};

	// lensProp
	const loginLens = R.lensProp('login');

	// lensPath
	const teamIDLens = R.lensPath(['team', 'id']);

	// view
	console.log(`Login: ${R.view(loginLens, user)}`);

	// set
	const setUser = R.set(
		loginLens,
		'raccoon-user',
		user
	);

	console.log('setUser:', setUser);

	// over
	const overUser = R.over(
		loginLens,
		login => `${login}@users.com`,
		setUser
	);

	console.log('overUser:', overUser);
})();
